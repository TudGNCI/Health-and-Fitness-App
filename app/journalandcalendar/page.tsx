'use client'
import Link from "next/link"
import { useState } from "react";
import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";

export default function Page() {
    const [selected, setSelected] = useState<Date | undefined>();

  return (
    <main>
      <div className="flex justify-center items-center pb-[6vh] pt-[8vh] text-6xl">
        <h1>Journal and Calendar</h1>
        </div>
      <div className="h-[50vh] pt-[10vh] flex items-center justify-center">
        <DayPicker className="scale-140 bg-white p-4 shadow-lg rounded-lg shadow-zinc-500" mode="single" selected={selected} onSelect={setSelected} 
         />
      </div>
        <Link href='/'
        className="fixed right-4 bottom-4 bg-cyan-600 hover:bg-cyan-700 px-7 py-4 rounded-lg shadow-lg shadow-zinc-500"> BACK
        </Link>
    </main>
  )
}