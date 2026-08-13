'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'
 
export async function saveJournalEntry(date: string, content: string) {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    if(!content.trim()) {
        await prisma.journalEntry.delete({
            where: { userId_date: { userId, date } },
        }).catch(() => {})
    } else {
        await prisma.journalEntry.upsert({
            where: { userId_date: { userId, date } },
            update: { content },
            create: { userId, date, content },
        })
    }
    revalidatePath('/journalandcalendar')
    return {success: true, isEmpty: !content.trim()}
}

export async function getJournalEntry(date: string) {
    const { userId } = await auth()
    if (!userId) return null

        const entry = await prisma.journalEntry.findUnique({
            where: { userId_date: { userId, date} },
            select: { content: true },
        })
        return entry?.content ?? null
    }

export async function getEntriesWithContent() {
    const { userId } = await auth()
    if (!userId) return null

        const entries = await prisma.journalEntry.findMany({
            where: { userId },
            select: {date: true },
        })
        return entries.map((e) => e.date)
    }
