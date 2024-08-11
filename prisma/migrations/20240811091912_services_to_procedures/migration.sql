/*
  Warnings:

  - The primary key for the `prices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `service_id` on the `prices` table. All the data in the column will be lost.
  - You are about to drop the `ServiceCategoriesOnServices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ServiceToServiceCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
-- ALTER TABLE "ServiceCategoriesOnServices" DROP CONSTRAINT "ServiceCategoriesOnServices_categoryId_fkey";

-- -- DropForeignKey
-- ALTER TABLE "ServiceCategoriesOnServices" DROP CONSTRAINT "ServiceCategoriesOnServices_serviceId_fkey";

-- -- DropForeignKey
-- ALTER TABLE "_ServiceToServiceCategory" DROP CONSTRAINT "_ServiceToServiceCategory_A_fkey";

-- -- DropForeignKey
-- ALTER TABLE "_ServiceToServiceCategory" DROP CONSTRAINT "_ServiceToServiceCategory_B_fkey";

-- -- DropForeignKey
-- ALTER TABLE "prices" DROP CONSTRAINT "prices_service_id_fkey";

-- -- AlterTable
-- ALTER TABLE "prices" DROP CONSTRAINT "prices_pkey",
-- DROP COLUMN "service_id",
-- ADD COLUMN     "procedure_id" TEXT NOT NULL DEFAULT 'NULL',
-- ADD CONSTRAINT "prices_pkey" PRIMARY KEY ("procedure_id", "breed_id", "size", "weight");

-- -- DropTable
-- DROP TABLE "ServiceCategoriesOnServices";

-- -- DropTable
-- DROP TABLE "_ServiceToServiceCategory";

-- -- DropTable
-- DROP TABLE "service_categories";

-- -- DropTable
-- DROP TABLE "services";

-- -- CreateTable
-- CREATE TABLE "procedure_categories" (
--     "id" TEXT NOT NULL,
--     "name" TEXT NOT NULL,
--     "order" INTEGER NOT NULL,
--     "created_at" TIMESTAMPTZ(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "updated_at" TIMESTAMPTZ(2) NOT NULL,
--     "isUsed" BOOLEAN NOT NULL DEFAULT true,
--     "isDeleted" BOOLEAN NOT NULL DEFAULT false,

--     CONSTRAINT "procedure_categories_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateTable
-- CREATE TABLE "ProcedureCategoriesOnProcedures" (
--     "procedureId" TEXT NOT NULL,
--     "categoryId" TEXT NOT NULL,

--     CONSTRAINT "ProcedureCategoriesOnProcedures_pkey" PRIMARY KEY ("procedureId","categoryId")
-- );

-- -- CreateTable
-- CREATE TABLE "procedures" (
--     "id" TEXT NOT NULL,
--     "name" TEXT NOT NULL,
--     "description" TEXT,
--     "order" INTEGER NOT NULL,
--     "created_at" TIMESTAMPTZ(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "updated_at" TIMESTAMPTZ(2) NOT NULL,
--     "isUsed" BOOLEAN NOT NULL DEFAULT true,
--     "isDeleted" BOOLEAN NOT NULL DEFAULT false,

--     CONSTRAINT "procedures_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateTable
-- CREATE TABLE "_ProcedureToProcedureCategory" (
--     "A" TEXT NOT NULL,
--     "B" TEXT NOT NULL
-- );

-- -- CreateIndex
-- CREATE UNIQUE INDEX "procedure_categories_id_key" ON "procedure_categories"("id");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "procedure_categories_name_key" ON "procedure_categories"("name");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "procedure_categories_order_key" ON "procedure_categories"("order");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "procedures_id_key" ON "procedures"("id");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "procedures_name_key" ON "procedures"("name");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "procedures_order_key" ON "procedures"("order");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "_ProcedureToProcedureCategory_AB_unique" ON "_ProcedureToProcedureCategory"("A", "B");

-- -- CreateIndex
-- CREATE INDEX "_ProcedureToProcedureCategory_B_index" ON "_ProcedureToProcedureCategory"("B");

-- -- AddForeignKey
-- ALTER TABLE "prices" ADD CONSTRAINT "prices_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "ProcedureCategoriesOnProcedures" ADD CONSTRAINT "ProcedureCategoriesOnProcedures_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "ProcedureCategoriesOnProcedures" ADD CONSTRAINT "ProcedureCategoriesOnProcedures_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "procedure_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "_ProcedureToProcedureCategory" ADD CONSTRAINT "_ProcedureToProcedureCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "_ProcedureToProcedureCategory" ADD CONSTRAINT "_ProcedureToProcedureCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "procedure_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "services" RENAME TO "procedures"; 
ALTER TABLE "procedures" RENAME CONSTRAINT "services_pkey" TO "procedures_pkey";
ALTER INDEX "services_id_key" RENAME TO "procedures_id_key";
ALTER INDEX "services_name_key" RENAME TO "procedures_name_key";
ALTER INDEX "services_order_key" RENAME TO "procedures_order_key";

ALTER TABLE "service_categories" RENAME TO "procedure_categories"; 
ALTER TABLE "procedure_categories" RENAME CONSTRAINT "service_categories_pkey" TO "procedure_categories_pkey";
ALTER INDEX "service_categories_id_key" RENAME TO "procedure_categories_id_key";
ALTER INDEX "service_categories_name_key" RENAME TO "procedure_categories_name_key";
ALTER INDEX "service_categories_order_key" RENAME TO "procedure_categories_order_key";

ALTER TABLE "prices" RENAME CONSTRAINT "prices_service_id_fkey" TO "prices_procedure_id_fkey";

ALTER TABLE "ServiceCategoriesOnServices" RENAME TO "ProcedureCategoriesOnProcedures";
ALTER TABLE "ProcedureCategoriesOnProcedures" RENAME COLUMN "serviceId" TO "procedureId";
ALTER TABLE "ProcedureCategoriesOnProcedures" RENAME CONSTRAINT "ServiceCategoriesOnServices_categoryId_fkey" TO "ProcedureCategoriesOnProcedures_categoryId_fkey";
ALTER TABLE "ProcedureCategoriesOnProcedures" RENAME CONSTRAINT "ServiceCategoriesOnServices_pkey" TO "ProcedureCategoriesOnProcedures_pkey";
ALTER TABLE "ProcedureCategoriesOnProcedures" RENAME CONSTRAINT "ServiceCategoriesOnServices_serviceId_fkey" TO "ProcedureCategoriesOnProcedures_procedureId_fkey";

ALTER TABLE "_ServiceToServiceCategory" RENAME TO "_ProcedureToProcedureCategory";
ALTER TABLE "_ProcedureToProcedureCategory" RENAME CONSTRAINT "_ServiceToServiceCategory_A_fkey" TO "_ProcedureToProcedureCategory_A_fkey";
ALTER TABLE "_ProcedureToProcedureCategory" RENAME CONSTRAINT "_ServiceToServiceCategory_B_fkey" TO "_ProcedureToProcedureCategory_B_fkey";
ALTER INDEX "_ServiceToServiceCategory_AB_unique" RENAME TO "_ProcedureToProcedureCategory_AB_unique";
ALTER INDEX "_ServiceToServiceCategory_B_index" RENAME TO "_ProcedureToProcedureCategory_B_index";