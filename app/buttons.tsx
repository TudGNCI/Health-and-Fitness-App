
import Link from 'next/link'
 
export default function MyButtons() {
  return (

       <div className="inline-flex flex-row justify-center items-center gap-4 px-3 py-3 rounded-2xl bg-violet-400 shadow-lg shadow-zinc-500">
  <Link className="px-15 py-8 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-xl shadow-lg shadow-zinc-500" href="journalandcalendar">Journal and Calendar</Link>
  <Link className="px-15 py-8 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-xl shadow-lg shadow-zinc-500" href="bodymeasurementlog">Body Measurement Log</Link>
  </div>
  )
}