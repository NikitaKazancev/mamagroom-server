/*
  Warnings:

  - The primary key for the `constants` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "breeds" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'ru';

-- AlterTable
ALTER TABLE "constants" DROP CONSTRAINT "constants_pkey",
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'ru',
ADD CONSTRAINT "constants_pkey" PRIMARY KEY ("language", "type", "name");

-- AlterTable
ALTER TABLE "procedure_categories" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'ru';

-- AlterTable
ALTER TABLE "procedures" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'ru';
