/*
  Warnings:

  - You are about to drop the column `loginSource` on the `Session` table. All the data in the column will be lost.
  - Added the required column `loginSource` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "loginSource";

-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "loginSource" "LoginSource" NOT NULL;
