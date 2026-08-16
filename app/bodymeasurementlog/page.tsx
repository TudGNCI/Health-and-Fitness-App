import Link from "next/link"
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { saveMeasurement, deleteMeasurement } from "../actions/measurement"
import { redirect } from "next/navigation"


export default async function Page() {
    // Checks user identity otherwise redirects them to sign in page
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in")
    }

    // Fetches the latest set of measurements of the logged in user
    const measurements = await prisma.measurement.findMany({
        where: {
            clerkId: user.id
        },
        orderBy: {
            date: "desc"
        },
        take: 2,
    });
    // Makes sure that the user has reached the 2 record limit
    const limit = measurements.length < 2;

    return (
        <main className="flex flex-col items-center w-full min-h-screen">
      <div className="flex justify-center items-center pb-[6vh] pt-[8vh] text-6xl">
        <h1>Body Measurement Log</h1>
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold  mb-4">Add new record</h2>

      {limit ? (
      <form action={saveMeasurement} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium">Chest (cm)</label>
          <input name="chest" type="number" min="0" step="0.1" required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Waist (cm)</label>
          <input name="waist" type="number" min="0" step="0.1" required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Arms (cm)</label>
          <input name="arms" type="number" min="0" step="0.1" required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Hips (cm)</label>
          <input name="hips" type="number" min="0" step="0.1" required className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Save Measurements
        </button>
      </form>
      ) : (
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded border border-yellow-200">
          Only 2 records allowed.
        </div>
      )}
      </div>

      <div className="w-full md:-1/2 px-120 py-20">
        <h2 className="text-xl font-semibold  mb-4">Records</h2>
        {measurements.length === 0 ? (
          <p className="text-gray-500">No records yet.</p>
        ) : (
          <div className="space-y-4">
        {measurements.map((m) => (
          <div key={m.id} className="border p-4 rounded shadow bg-white">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
              Recorded: {new Date(m.date).toLocaleDateString()}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-bold">Chest:</span> {m.chest} cm</div>
              <div><span className="font-bold">Waist:</span> {m.waist} cm</div>
              <div><span className="font-bold">Arms:</span> {m.arms} cm</div>
              <div><span className="font-bold">Hips:</span> {m.hips} cm</div>
              </div>
              <form action={deleteMeasurement.bind(null, m.id)} className="mt-4 pt-4 border-t">
                <button type="submit" className="text-red-600 text-xs hover:underline font-medium">
                  Delete Record
                </button>
              </form>
            </div>
        ))}
        </div>
        )}
        </div>
      <Link
        href="/"
        className="fixed right-4 bottom-4 bg-cyan-600 hover:bg-cyan-700 px-7 py-4 rounded-lg shadow-lg shadow-zinc-500"
      >
        BACK
      </Link>
    </main>
    )
}