-- Add Product subtitle fields for UI display (i18n).
-- Additive migration, safe for production data.

ALTER TABLE "Product" ADD COLUMN "subtitle" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "subtitleEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "subtitleJa" TEXT NOT NULL DEFAULT '';

