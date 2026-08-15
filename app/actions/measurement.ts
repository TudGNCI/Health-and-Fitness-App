'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

/**
 * Data is saved for each individual user.
 * Each user can save only 2 records.
 */
export async function saveMeasurement(formData: FormData) {
    // Ensuring that only the logged in user can save data.
    const user = await currentUser()

    if (!user) {
        throw new Error("Unauthorized");
    }

    //Ensuring submitted data is converted into numbers.
    const chest = parseFloat(formData.get("chest") as string);
    const waist = parseFloat(formData.get("waist") as string);
    const arms = parseFloat(formData.get("arms") as string);
    const hips = parseFloat(formData.get("hips") as string);

    //Ensures a maximum limit of only 2 records for the logged in user.
    const existingCount = await prisma.measurement.count({
        where: {
            clerkId: user.id
        },
    });

    if (existingCount >= 2) {
        throw new Error("Only 2 records allowed");
    }

    //Creates the record associated with the user's clerk ID
    await prisma.measurement.create({
        data: {
            clerkId: user.id,
            chest,
            waist,
            arms,
            hips,
        }
    });

    //The UI is updated and the page is refreshed via redirect
    revalidatePath("/bodymeasurementlog");
    redirect("/bodymeasurementlog");
}

/**
 * Allows for the deletion of a record.
 * Only authorized users can delete a record.
 */
export async function deleteMeasurement(id: number) {
    // Ensuring that only logged in users are allowed access.
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    //Ensures only the user's data is deleted.
    await prisma.measurement.delete({
        where: {
            id,
            clerkId: user.id
        },
    });

    //Page is refreshed to ensure deletion.
    revalidatePath("/bodymeasurementlog");
}