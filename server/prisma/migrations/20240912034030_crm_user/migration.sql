/*
  Warnings:

  - Changed the column `scope` on the `Token` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamMemberOrganisationId_fkey";

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "scope" SET DATA TYPE "Scope"[] USING ARRAY[scope]::"Scope"[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "teamMemberOrganisationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamMemberOrganisationId_fkey" FOREIGN KEY ("teamMemberOrganisationId") REFERENCES "Organisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
