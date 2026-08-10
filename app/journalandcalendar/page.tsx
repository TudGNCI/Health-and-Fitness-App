import Link from "next/link"

export default function Page() {
  return (
    <main>
      <div className="flex justify-center items-center pb-[6vh] pt-[8vh] text-5xl">
        <h1>Journal and Calendar</h1>
      </div>
        <Link href='/'
        className="fixed right-4 bottom-4 bg-cyan-600 hover:bg-cyan-700 px-7 py-4 rounded-lg"> BACK
        </Link>
    </main>
  )
}