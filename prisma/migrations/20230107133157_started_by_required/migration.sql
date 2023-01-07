/*
  Warnings:

  - Made the column `startedById` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_startedById_fkey";

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "startedById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_startedById_fkey" FOREIGN KEY ("startedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
