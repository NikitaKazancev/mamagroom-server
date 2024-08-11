/*
  Warnings:

  - You are about to drop the column `text` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "text",
ADD COLUMN     "description" TEXT;
