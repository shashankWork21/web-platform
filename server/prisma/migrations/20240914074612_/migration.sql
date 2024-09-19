/*
  Warnings:

  - You are about to drop the column `adminCredentials` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_accessTokenSessionId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_refreshTokenSessionId_fkey";

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "accessTokenSessionId" DROP NOT NULL,
ALTER COLUMN "refreshTokenSessionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "adminCredentials";

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_accessTokenSessionId_fkey" FOREIGN KEY ("accessTokenSessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_refreshTokenSessionId_fkey" FOREIGN KEY ("refreshTokenSessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
