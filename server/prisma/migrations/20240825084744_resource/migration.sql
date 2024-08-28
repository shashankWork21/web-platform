/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Variant` table. All the data in the column will be lost.
  - Added the required column `resourceId` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_serviceId_fkey";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "serviceId",
ADD COLUMN     "resourceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
