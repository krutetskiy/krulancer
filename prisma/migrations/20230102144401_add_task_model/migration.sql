/*
  Warnings:

  - Made the column `description` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `started_by` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "task_priority" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('ToDo', 'InProgress', 'Clodes', 'Frozen');

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "started_by" SET NOT NULL;

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "priority" "task_priority" NOT NULL,
    "status" "task_status" NOT NULL,
    "assigned" TEXT NOT NULL,
    "estimated" INTEGER NOT NULL,
    "project_id" INTEGER,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
