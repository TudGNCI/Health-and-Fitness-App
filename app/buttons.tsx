import Link from 'next/link'
 
export default function MyButtons() {
  return (
    <div className="flex gap-2 items-center justify-center min-h-screen">
  <Link className="px-4 py-8 rounded bg-purple-800 hover:bg-purple-900 text-xl" href="journalandcalendar">Journal and Calendar</Link>
  <Link className="px-4 py-8 rounded bg-purple-800 hover:bg-purple-900 text-xl" href="bodymeasurementlog">Body Measurement Log</Link>
  </div>
  )
}