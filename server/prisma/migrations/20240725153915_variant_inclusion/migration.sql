-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "includedVariantId" TEXT;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_includedVariantId_fkey" FOREIGN KEY ("includedVariantId") REFERENCES "Variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
