'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

export async function saveMeasurement(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Login to record your body measurements');
  }

  const count = await prisma.measurement.count({
    where: { userId },
  });

  if (count >= 2) {
    throw new Error('Only two records allowed');
  }

  const chest = parseFloat(formData.get('chest') as string);
  const waist = parseFloat(formData.get('waist') as string);
  const arms = parseFloat(formData.get('arms') as string);
  const hips = parseFloat(formData.get('arms') as string);

  if (isNaN(chest) || isNaN(waist) || isNaN(arms) || isNaN(hips)) {
    throw new Error('Invalid value');
  }

  await prisma.measurement.create({
    data: { chest, waist, arms, hips, userId },
  });

  revalidatePath('/bodymeasurementlog');
}

export async function deleteMeasurement(id: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await prisma.measurement.delete({
    where: { id, userId },
  });

  revalidatePath('/bodymeasurementlog');
}
