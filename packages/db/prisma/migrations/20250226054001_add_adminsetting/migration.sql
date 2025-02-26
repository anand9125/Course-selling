-- CreateTable
CREATE TABLE "AdminSettings" (
    "id" TEXT NOT NULL,
    "selectedMentorId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminSettings_selectedMentorId_key" ON "AdminSettings"("selectedMentorId");
