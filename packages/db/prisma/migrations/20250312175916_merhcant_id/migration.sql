/*
  Warnings:

  - You are about to drop the column `orderId` on the `Purchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[merchantOrderId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `merchantOrderId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "orderId",
ADD COLUMN     "merchantOrderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_merchantOrderId_key" ON "Purchase"("merchantOrderId");
