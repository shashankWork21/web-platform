/*
  Warnings:

  - You are about to drop the column `currency` on the `Variant` table. All the data in the column will be lost.
  - Added the required column `currencyId` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "currency",
ADD COLUMN     "currencyId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Currency";

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortform" TEXT NOT NULL,
    "inrConversion" INTEGER NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
