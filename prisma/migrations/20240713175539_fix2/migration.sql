/*
  Warnings:

  - You are about to drop the column `deleted` on the `breeds` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `breeds` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `prices` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `prices` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `service_categories` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `service_categories` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "breeds" DROP COLUMN "deleted",
DROP COLUMN "used",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "prices" DROP COLUMN "deleted",
DROP COLUMN "used",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "service_categories" DROP COLUMN "deleted",
DROP COLUMN "used",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "deleted",
DROP COLUMN "used",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT true;
