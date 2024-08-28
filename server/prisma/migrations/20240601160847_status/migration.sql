-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "ServiceRequest" ALTER COLUMN "status" SET DEFAULT 'CREATED';
