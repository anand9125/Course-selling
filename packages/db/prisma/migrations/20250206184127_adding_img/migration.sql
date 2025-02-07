/*
  Warnings:

  - Added the required column `image` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Mentor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Mentor" ADD COLUMN     "image" TEXT NOT NULL;
