/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[index]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_index_key" ON "Category"("index");

-- CreateIndex
CREATE UNIQUE INDEX "Course_index_key" ON "Course"("index");
