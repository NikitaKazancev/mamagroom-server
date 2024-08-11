/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `service_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order]` on the table `services` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "service_categories" ALTER COLUMN "order" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "order" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "service_categories_order_key" ON "service_categories"("order");

-- CreateIndex
CREATE UNIQUE INDEX "services_order_key" ON "services"("order");
