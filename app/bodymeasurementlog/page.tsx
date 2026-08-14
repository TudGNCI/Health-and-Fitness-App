import Link from "next/link"
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { saveMeasurement, deleteMeasurement } from "../actions/measurement"
import { redirect } from "next/navigation"

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const localUser = await prisma.user.findUnique({
    where: { clerkId },
  })

  if(!localUser) {
    throw Error("User profile not found")
  }

  const records = await prisma.measurement.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });

  return (
    <main>
      <div className="flex justify-center items-center pb-[6vh] pt-[8vh] text-6xl">
        <h1>Body Measurement Log</h1>
      </div>
      <Link
        href="/"
        className="fixed right-4 bottom-4 bg-cyan-600 hover:bg-cyan-700 px-7 py-4 rounded-lg shadow-lg shadow-zinc-500"
      >
        {" "}
        BACK
      </Link>
    </main>
  );
}
