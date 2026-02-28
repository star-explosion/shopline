-- Expand Product model for i18n + specifications/features.
-- This migration is additive and safe for production data.

ALTER TABLE "Product" ADD COLUMN "code" TEXT;
ALTER TABLE "Product" ADD COLUMN "nameEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "nameJa" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "descriptionEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "descriptionJa" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "originalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "Product" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'mattress';
ALTER TABLE "Product" ADD COLUMN "subcategory" TEXT NOT NULL DEFAULT 'hotel';
ALTER TABLE "Product" ADD COLUMN "specifications" TEXT NOT NULL DEFAULT '{}';
ALTER TABLE "Product" ADD COLUMN "features" TEXT NOT NULL DEFAULT '[]';
ALTER TABLE "Product" ADD COLUMN "isFeatured" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Product" ADD COLUMN "isBestSeller" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Product" ADD COLUMN "isNewArrival" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Product" ADD COLUMN "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.8;
ALTER TABLE "Product" ADD COLUMN "reviewCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Product" ADD COLUMN "warranty" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "deliveryTime" TEXT NOT NULL DEFAULT '';

CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");

