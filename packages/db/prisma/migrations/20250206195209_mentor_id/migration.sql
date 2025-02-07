/*
  Warnings:

  - A unique constraint covering the columns `[mentorId]` on the table `Mentor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mentorId` to the `Mentor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mentor" ADD COLUMN     "mentorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_mentorId_key" ON "Mentor"("mentorId");
