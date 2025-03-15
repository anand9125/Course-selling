/*
  Warnings:

  - You are about to drop the column `courseId` on the `Purchase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_courseId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "PurchaseCourse" (
    "purchaseId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "PurchaseCourse_pkey" PRIMARY KEY ("purchaseId","courseId")
);

-- AddForeignKey
ALTER TABLE "PurchaseCourse" ADD CONSTRAINT "PurchaseCourse_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseCourse" ADD CONSTRAINT "PurchaseCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
