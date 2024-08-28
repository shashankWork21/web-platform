/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Variant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "isDeleted",
ADD COLUMN     "isDisabled" BOOLEAN;

-- AlterTable
ALTER TABLE "ServiceRequest" DROP COLUMN "isDeleted",
ADD COLUMN     "isDisabled" BOOLEAN;

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "isDeleted",
ADD COLUMN     "isDisabled" BOOLEAN;
