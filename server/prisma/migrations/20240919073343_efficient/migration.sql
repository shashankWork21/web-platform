/*
  Warnings:

  - Made the column `subscriptionPlanId` on table `Pricing` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Pricing" DROP CONSTRAINT "Pricing_subscriptionPlanId_fkey";

-- AlterTable
ALTER TABLE "Pricing" ALTER COLUMN "subscriptionPlanId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionPlan" ALTER COLUMN "pricingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
