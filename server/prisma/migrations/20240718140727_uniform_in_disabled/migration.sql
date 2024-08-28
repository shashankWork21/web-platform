/*
  Warnings:

  - You are about to drop the column `inUse` on the `Currency` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "inUse",
ADD COLUMN     "isDisabled" BOOLEAN;
