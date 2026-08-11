'use client'
import Link from "next/link"
import { useState, useEffect } from "react";
import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import { format } from 'date-fns';

export default function Page() {
    const [selectedDay, setSelectedDay] = useState<Date>();
    const [journalEntry, setJournalEntry] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setJournalEntry (e.target.value)

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
        <DayPicker className="scale-140 bg-white p-4 shadow-lg rounded-lg shadow-zinc-500" mode="single" selected={selectedDay} onSelect={setSelectedDay} 
        footer={footer}
         />
      </div>
      <div className="pt-[20vh] pb-[6vh] flex justify-center items-center">
        <form>
          <textarea className="placeholder:text-black w-100 min-h-[50px] w-[500px] bg-white"
          value={journalEntry}
          onChange={handleChange}
          placeholder="Write your thoughts...">
          </textarea>
        </form>
      </div>
        <Link href='/'
        className="fixed right-4 bottom-4 bg-cyan-600 hover:bg-cyan-700 px-7 py-4 rounded-lg shadow-lg shadow-zinc-500"> BACK
        </Link>
    </main>
  )
}