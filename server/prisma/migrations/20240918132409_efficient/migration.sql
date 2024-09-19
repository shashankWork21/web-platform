/*
  Warnings:

  - You are about to drop the column `productId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Pricing` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Pricing` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `SubscriptionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `SubscriptionPlan` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contactId,offeringId]` on the table `ServiceRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `offeringId` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OfferingType" AS ENUM ('PRODUCT', 'SERVICE');

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_productId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_productId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Pricing" DROP CONSTRAINT "Pricing_productId_fkey";

-- DropForeignKey
ALTER TABLE "Pricing" DROP CONSTRAINT "Pricing_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_solutionId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_solutionId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_productId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionPlan" DROP CONSTRAINT "SubscriptionPlan_productId_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionPlan" DROP CONSTRAINT "SubscriptionPlan_serviceId_fkey";

-- DropIndex
DROP INDEX "ServiceRequest_contactId_productId_serviceId_key";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "productId",
DROP COLUMN "serviceId",
ADD COLUMN     "offeringId" TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "productId",
DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "Pricing" DROP COLUMN "productId",
DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "ServiceRequest" DROP COLUMN "productId",
DROP COLUMN "serviceId",
ADD COLUMN     "offeringId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionPlan" DROP COLUMN "productId",
DROP COLUMN "serviceId";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Service";

-- CreateTable
CREATE TABLE "Offering" (
    "id" TEXT NOT NULL,
    "offeringType" "OfferingType" NOT NULL,
    "solutionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT[],
    "isDisabled" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Subscription Plan to Offering Mapping" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Subscription Plan to Offering Mapping_AB_unique" ON "_Subscription Plan to Offering Mapping"("A", "B");

-- CreateIndex
CREATE INDEX "_Subscription Plan to Offering Mapping_B_index" ON "_Subscription Plan to Offering Mapping"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceRequest_contactId_offeringId_key" ON "ServiceRequest"("contactId", "offeringId");

-- AddForeignKey
ALTER TABLE "Offering" ADD CONSTRAINT "Offering_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "Offering"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "Offering"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Subscription Plan to Offering Mapping" ADD CONSTRAINT "_Subscription Plan to Offering Mapping_A_fkey" FOREIGN KEY ("A") REFERENCES "Offering"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Subscription Plan to Offering Mapping" ADD CONSTRAINT "_Subscription Plan to Offering Mapping_B_fkey" FOREIGN KEY ("B") REFERENCES "SubscriptionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
