/*
  Warnings:

  - Changed the type of `roleTitle` on the `Enrollment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SubjectRole" AS ENUM ('STUDENT', 'PROFESSOR', 'OWNER', 'DEMONSTRATOR', 'ASSISTANT');

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "roleTitle",
ADD COLUMN     "roleTitle" "SubjectRole" NOT NULL;
