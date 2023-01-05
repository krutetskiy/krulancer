/*
  Warnings:

  - You are about to drop the column `accessToken` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `idToken` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `sessionState` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `tokenType` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `session_token` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionToken]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionToken` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "session_session_token_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "accessToken",
DROP COLUMN "expiresAt",
DROP COLUMN "idToken",
DROP COLUMN "refreshToken",
DROP COLUMN "sessionState",
DROP COLUMN "tokenType",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "id_token" TEXT,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "session_state" TEXT,
ADD COLUMN     "token_type" TEXT;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "session_token",
ADD COLUMN     "sessionToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "session_sessionToken_key" ON "session"("sessionToken");
