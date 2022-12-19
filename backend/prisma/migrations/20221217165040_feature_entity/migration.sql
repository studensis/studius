-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DEFAULT', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('WINTER', 'SUMMER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LinkedEntity" AS ENUM ('USER', 'SUBJECT', 'SEMINAR', 'POST');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "jmbag" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userRole" "Role" NOT NULL,
    "mentorID" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ectsBod" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "status" "Status" NOT NULL,
    "contentId" TEXT[],

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "markdownText" TEXT NOT NULL,
    "plainText" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "linkedEntity" "LinkedEntity" NOT NULL,
    "linkedEntityId" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "linkedEntity" "LinkedEntity" NOT NULL,
    "linkedEntityId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "enrollmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleTitle" "Role" NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("userId","subjectId")
);

-- CreateTable
CREATE TABLE "Seminar" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Seminar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "linkedEntity" TEXT NOT NULL,
    "linkedEntityId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeminarSuggestion" (
    "id" TEXT NOT NULL,
    "seminarId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "SeminarSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomTimeEvent" (
    "id" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "RoomTimeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventUserPresence" (
    "id" TEXT NOT NULL,
    "presenceStatus" BOOLEAN NOT NULL,
    "roomTimeEventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EventUserPresence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_jmbag_key" ON "User"("jmbag");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mentorID_key" ON "User"("mentorID");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_contentId_key" ON "Subject"("contentId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_mentorID_fkey" FOREIGN KEY ("mentorID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUserPresence" ADD CONSTRAINT "EventUserPresence_roomTimeEventId_fkey" FOREIGN KEY ("roomTimeEventId") REFERENCES "RoomTimeEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUserPresence" ADD CONSTRAINT "EventUserPresence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
