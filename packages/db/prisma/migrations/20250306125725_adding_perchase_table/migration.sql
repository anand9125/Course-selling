/*
  Warnings:

  - You are about to drop the `CourseLink` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED', 'FAILED');

-- DropForeignKey
ALTER TABLE "CourseLink" DROP CONSTRAINT "CourseLink_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "CourseLink" TEXT;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "transactionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CourseLink";
