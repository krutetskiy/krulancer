/*
  Warnings:

  - The values [Clodes] on the enum `task_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "task_status_new" AS ENUM ('ToDo', 'InProgress', 'Closed', 'Frozen');
ALTER TABLE "task" ALTER COLUMN "status" TYPE "task_status_new" USING ("status"::text::"task_status_new");
ALTER TYPE "task_status" RENAME TO "task_status_old";
ALTER TYPE "task_status_new" RENAME TO "task_status";
DROP TYPE "task_status_old";
COMMIT;
