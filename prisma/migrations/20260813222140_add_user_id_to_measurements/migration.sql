-- CreateTable
CREATE TABLE "BodyMeasurementLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "chest" REAL NOT NULL,
    "waist" REAL NOT NULL,
    "arms" REAL NOT NULL,
    "hips" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "BodyMeasurementLog_userId_idx" ON "BodyMeasurementLog"("userId");
