'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
 
export async function saveEntry(date: string, content: string) {
    try {
     await prisma.journalEntry.upsert({
        where: { date },
        update: { content },
        create: { date, content },
})

 revalidatePath('/journalandcalendar')
 return { success: true }
} catch (error) {

