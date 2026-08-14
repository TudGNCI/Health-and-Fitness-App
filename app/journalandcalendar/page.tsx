'use client'
import Link from "next/link"
import { useState, useEffect, useCallback } from "react";
import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import { format } from 'date-fns';
import { saveJournalEntry, getJournalEntry, getEntriesWithContent } from "../actions/journal";


export default function Page() {
    const [selectedDay, setSelectedDay] = useState < Date | undefined > (new Date());
    const [journalEntry, setJournalEntry] = useState < string > ('');
    const [entryDate, setEntryDate] = useState < Set < string >> (new Set())
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        getEntriesWithContent().then((dates) =>
            setEntryDate(new Set(dates)))
    }, [])

    useEffect(() => {
        console.log('Entry Dates:', Array.from(entryDate))
    }, [entryDate])

    const handleDateSelect = useCallback(async (date: Date | undefined) => {
        setSelectedDay(date)
        if (date) {
            const dateStr = format(date, 'yyyy-MM-dd')
            const entry = await getJournalEntry(dateStr)
            setJournalEntry(entry || '')
        } else {
            setJournalEntry('')
        }
    }, [])

    useEffect(() => {
        if (!selectedDay) return;

        const timer = setTimeout(async () => {
            setIsSaving(true)
            const dateStr = format(selectedDay, 'yyyy-MM-dd')

            try {
                await saveJournalEntry(dateStr, journalEntry)

                setEntryDate((prev) => {
                    const newSet = new Set(prev);
                    if (journalEntry.trim() === '') {
                        newSet.delete(dateStr);
                    } else {
                        newSet.add(dateStr);
                    }
                    return newSet;
                })

            } catch (error) {
                console.error('Save failed:', error)
            } finally {
                setIsSaving(false)
            }
        }, 200)

        return () => clearTimeout(timer)
    }, [journalEntry, selectedDay])

    const handleChange = (e: React.ChangeEvent < HTMLTextAreaElement > ) => setJournalEntry(e.target.value)

    const footer = selectedDay ? (
        <p>You selected {format(selectedDay, 'PPP')}.</p>
    ) : (
        <p>Please pick a day.</p>
    );

    return (
        <main>
      <div className="flex justify-center items-center pb-[6vh] pt-[8vh] text-6xl">
        <h1>Journal and Calendar</h1>
        </div>
      <div className="h-[50vh] pt-[10vh] flex items-center justify-center">
        <DayPicker className="scale-140 bg-white p-4 shadow-lg rounded-lg shadow-zinc-500" mode="single" selected={selectedDay} onSelect={handleDateSelect}
        modifiers={{
          Entry: (date) => {const dateStr = format(date, 'yyyy-MM-dd')
            return entryDate.has(dateStr)
          }
        }} 
        footer={footer}
        modifiersStyles={{
          Entry: {
            backgroundColor: 'red !important',
            color: 'red',
            fontWeight: 'bold'
          }
        }}
         />
      </div>
      <div className="pt-[20vh] pb-[6vh] flex justify-center items-center">
          <textarea className="placeholder:text-black w-100 min-h-[50px] w-[500px] bg-white"
          value={journalEntry}
          onChange={handleChange}
          placeholder="Write your thoughts...">
          </textarea>
        <p className="text-blue-500">
          {isSaving}
        </p>
      </div>
        <Link href='/'
        className="fixed right-4 bottom-4 bg-cyan-600 hover:bg-cyan-700 px-7 py-4 rounded-lg shadow-lg shadow-zinc-500"> BACK
        </Link>
    </main>
    )
}