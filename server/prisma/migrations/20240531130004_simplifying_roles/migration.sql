/*
  Warnings:

  - You are about to drop the `_Lead to solopreneur mapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Lead to solopreneur mapping" DROP CONSTRAINT "_Lead to solopreneur mapping_A_fkey";

-- DropForeignKey
ALTER TABLE "_Lead to solopreneur mapping" DROP CONSTRAINT "_Lead to solopreneur mapping_B_fkey";

-- DropTable
DROP TABLE "_Lead to solopreneur mapping";
