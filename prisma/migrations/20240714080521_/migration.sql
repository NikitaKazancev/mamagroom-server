-- AlterTable
ALTER TABLE "service_categories" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
