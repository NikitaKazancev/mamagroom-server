-- AlterTable
ALTER TABLE "constants" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT true;
