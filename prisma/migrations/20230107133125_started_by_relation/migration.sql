/*
  Warnings:

  - You are about to drop the column `started_by` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_userId_fkey";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "started_by",
DROP COLUMN "userId",
ADD COLUMN     "startedById" TEXT;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_startedById_fkey" FOREIGN KEY ("startedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
