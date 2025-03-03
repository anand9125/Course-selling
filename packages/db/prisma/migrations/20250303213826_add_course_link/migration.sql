-- CreateTable
CREATE TABLE "CourseLink" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "CourseLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseLink_courseId_key" ON "CourseLink"("courseId");

-- AddForeignKey
ALTER TABLE "CourseLink" ADD CONSTRAINT "CourseLink_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
