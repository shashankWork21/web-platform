/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_sessionId_fkey";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "sessionId";

-- CreateTable
CREATE TABLE "_Token to session mapping" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Token to session mapping_AB_unique" ON "_Token to session mapping"("A", "B");

-- CreateIndex
CREATE INDEX "_Token to session mapping_B_index" ON "_Token to session mapping"("B");

-- AddForeignKey
ALTER TABLE "_Token to session mapping" ADD CONSTRAINT "_Token to session mapping_A_fkey" FOREIGN KEY ("A") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Token to session mapping" ADD CONSTRAINT "_Token to session mapping_B_fkey" FOREIGN KEY ("B") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;
