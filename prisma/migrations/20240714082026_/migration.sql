-- AlterTable
ALTER TABLE "service_categories" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "service_categories_order_seq";

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "services_order_seq";
