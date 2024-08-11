-- AlterTable
CREATE SEQUENCE service_categories_order_seq;
ALTER TABLE "service_categories" ALTER COLUMN "order" SET DEFAULT nextval('service_categories_order_seq');
ALTER SEQUENCE service_categories_order_seq OWNED BY "service_categories"."order";

-- AlterTable
CREATE SEQUENCE services_order_seq;
ALTER TABLE "services" ALTER COLUMN "order" SET DEFAULT nextval('services_order_seq');
ALTER SEQUENCE services_order_seq OWNED BY "services"."order";
