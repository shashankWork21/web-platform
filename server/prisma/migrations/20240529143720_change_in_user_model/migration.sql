/*
  Warnings:

  - The values [FREELANCER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `loginSource` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LoginSource" AS ENUM ('PASSWORD', 'GOOGLE');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SOLOPRENEUR', 'LEAD', 'CLIENT', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'SOLOPRENEUR';
COMMIT;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "loginSource" "LoginSource" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "solopreneurId" TEXT,
ALTER COLUMN "role" SET DEFAULT 'SOLOPRENEUR';

-- CreateTable
CREATE TABLE "_Lead to solopreneur mapping" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Lead to solopreneur mapping_AB_unique" ON "_Lead to solopreneur mapping"("A", "B");

-- CreateIndex
CREATE INDEX "_Lead to solopreneur mapping_B_index" ON "_Lead to solopreneur mapping"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_solopreneurId_fkey" FOREIGN KEY ("solopreneurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Lead to solopreneur mapping" ADD CONSTRAINT "_Lead to solopreneur mapping_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Lead to solopreneur mapping" ADD CONSTRAINT "_Lead to solopreneur mapping_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
