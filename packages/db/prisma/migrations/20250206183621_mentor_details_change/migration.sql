/*
  Warnings:

  - You are about to drop the `MentorExpertise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MentorExpertise" DROP CONSTRAINT "MentorExpertise_mentorId_fkey";

-- DropTable
DROP TABLE "MentorExpertise";
