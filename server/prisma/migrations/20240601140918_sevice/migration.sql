/*
  Warnings:

  - You are about to drop the column `isDeprecated` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "isDeprecated",
ADD COLUMN     "isDeleted" BOOLEAN;
