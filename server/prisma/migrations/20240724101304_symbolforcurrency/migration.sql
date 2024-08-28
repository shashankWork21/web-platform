/*
  Warnings:

  - Made the column `symbol` on table `Currency` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `pricingModel` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PricingModel" AS ENUM ('ONE_TIME', 'HOURLY', 'WEEKLY', 'DAILY', 'MONTHLY', 'PER_UNIT', 'HYBRID');

-- AlterTable
ALTER TABLE "Currency" ALTER COLUMN "symbol" SET NOT NULL;

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "overages" DOUBLE PRECISION,
ADD COLUMN     "pricingModel" "PricingModel" NOT NULL,
ADD COLUMN     "unitCount" INTEGER;
