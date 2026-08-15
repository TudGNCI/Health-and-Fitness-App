/*
  Warnings:

  - You are about to drop the `BodyMeasurementLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BodyMeasurementLog";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Measurement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clerkId" TEXT NOT NULL,
    "chest" REAL NOT NULL,
    "waist" REAL NOT NULL,
    "arms" REAL NOT NULL,
    "hips" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Measurement_clerkId_idx" ON "Measurement"("clerkId");
