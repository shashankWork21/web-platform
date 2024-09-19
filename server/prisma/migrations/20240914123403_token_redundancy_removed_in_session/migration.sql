/*
  Warnings:

  - You are about to drop the column `accessTokenSessionId` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenSessionId` on the `Token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_accessTokenSessionId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_refreshTokenSessionId_fkey";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "accessTokenSessionId",
DROP COLUMN "refreshTokenSessionId",
ADD COLUMN     "sessionId" TEXT;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
