/*
  Warnings:

  - Added the required column `value` to the `constants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "constants" ADD COLUMN     "value" TEXT NOT NULL;
