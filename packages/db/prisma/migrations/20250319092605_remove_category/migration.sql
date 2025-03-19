/*
  Warnings:

  - You are about to drop the `UserCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCategory" DROP CONSTRAINT "UserCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserCategory" DROP CONSTRAINT "UserCategory_userId_fkey";

-- DropTable
DROP TABLE "UserCategory";
