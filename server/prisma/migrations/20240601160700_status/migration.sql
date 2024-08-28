/*
  Warnings:

  - Added the required column `status` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CREATED', 'DISCOVERY', 'ADVANCE_DUE', 'ONGOING', 'FIRST_REVIEW_DUE', 'FIRST_CHANGES_ONGOING', 'SECOND_REVIEW_DUE', 'SECOND_CHANGES_ONGOING', 'BALANCE_DUE', 'COMPLETED');

-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "status" "Status" NOT NULL;
