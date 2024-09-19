/*
  Warnings:

  - You are about to drop the column `resourceType` on the `Solution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "resourceType";

-- DropEnum
DROP TYPE "ResourceType";
