'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

// journal entry is either created or updated for the logged in user
export async function saveJournalEntry(date: string, content: string) {
    // authenticates user and returns their user ID
    const {
        userId
    } = await auth();
    // error message shown in server if user ID is invalid or user is logged out
    if (!userId) throw new Error('Unauthorized');

    // Journal entry is deleted if content is empty
    if (!content.trim()) {
        await prisma.journalEntry
            .delete({
                where: {
                    userId_date: {
                        userId,
                        date,
                    },
                },
            })
            .catch(() => {});
    } else {

        //Either updates or creates a new journal entry
        await prisma.journalEntry.upsert({
            where: {
                userId_date: {
                    userId,
                    date,
                },
            },
            update: {
                content,
            },
            create: {
                userId,
                date,
                content,
            },
        });
    }

    // freshes data cache to reflect new changes
    revalidatePath('/journalandcalendar');
    return {
        success: true,
        isEmpty: !content.trim(),
    };
}

//fetches logged in user a journal entry at a time
export async function getJournalEntry(date: string) {
    const {
        userId
    } = await auth();

    if (!userId) return null;

    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_date: {
                userId,
                date,
            },
        },
        select: {
            content: true,
        },
    });

    return entry?.content ?? null;
}

//All dates that have saved journal entries are fetched for logged in user
export async function getEntriesWithContent() {
    const {
        userId
    } = await auth();

    if (!userId) return null;

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId,
        },
        select: {
            date: true,
        },
    });

    // returns the array of strings that show the dates highlighted
    return entries.map((e) => e.date);
}