-- DropIndex
DROP INDEX "Course_index_key";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "index" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Mentor" ADD COLUMN     "index" INTEGER NOT NULL DEFAULT 0;
