-- AlterTable
ALTER TABLE "Slot" ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "cancelledBy" "Role",
ADD COLUMN     "isCancelled" BOOLEAN;
