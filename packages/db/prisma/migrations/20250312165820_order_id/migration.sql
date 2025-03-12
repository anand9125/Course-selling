/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "transactionId",
ADD COLUMN     "orderId" TEXT NOT NULL;
