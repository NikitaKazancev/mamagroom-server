-- CreateEnum
CREATE TYPE "breed_types" AS ENUM ('cat', 'small_dog', 'medium_dog', 'big_dog');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('fullAccess', 'deleteMarkedForDeletion', 'userGet', 'userPost', 'userPut', 'userDelete', 'breedPost', 'breedPut', 'breedDelete', 'constantPost', 'constantPut', 'constantDelete', 'headerNavbarLinkPost', 'headerNavbarLinkPut', 'headerNavbarLinkDelete', 'mainSliderPost', 'mainSliderPut', 'mainSliderDelete', 'masterPost', 'masterPut', 'masterDelete', 'pricePost', 'pricePut', 'priceDelete', 'procedurePost', 'procedurePut', 'procedureDelete', 'vacancyPost', 'vacancyPut', 'vacancyDelete', 'valuePost', 'valuePut', 'valueDelete', 'filePostPut', 'responseFromAIGet', 'responseFromAIPost', 'responseFromAIPut', 'responseFromAIDelete');

-- CreateTable
CREATE TABLE "breeds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "breed_types" NOT NULL DEFAULT 'small_dog',
    "language" TEXT NOT NULL DEFAULT 'ru',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "breeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "constants" (
    "language" TEXT NOT NULL DEFAULT 'ru',
    "type" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "constants_pkey" PRIMARY KEY ("language","type","name")
);

-- CreateTable
CREATE TABLE "header_navbar_links" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "order" INTEGER NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'ru',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "parent_link_id" TEXT,

    CONSTRAINT "header_navbar_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "main_slider" (
    "id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "main_slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "masters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image_name" TEXT,
    "language" TEXT NOT NULL DEFAULT 'ru',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "masters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "breed_id" TEXT NOT NULL,
    "procedure_id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("breed_id","procedure_id","weight","time")
);

-- CreateTable
CREATE TABLE "procedures" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "language" TEXT NOT NULL DEFAULT 'ru',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responses_from_ai" (
    "id" TEXT NOT NULL,
    "model" TEXT,
    "breed_id" TEXT,
    "user_description" TEXT,
    "imageName" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "responses_from_ai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "roles" "roles"[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacancies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "language" TEXT NOT NULL DEFAULT 'ru',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "vacancies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "values" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'ru',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProcedureToResponseFromAI" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "breeds_id_key" ON "breeds"("id");

-- CreateIndex
CREATE UNIQUE INDEX "breeds_name_key" ON "breeds"("name");

-- CreateIndex
CREATE UNIQUE INDEX "header_navbar_links_id_key" ON "header_navbar_links"("id");

-- CreateIndex
CREATE UNIQUE INDEX "header_navbar_links_name_key" ON "header_navbar_links"("name");

-- CreateIndex
CREATE UNIQUE INDEX "main_slider_id_key" ON "main_slider"("id");

-- CreateIndex
CREATE UNIQUE INDEX "masters_name_key" ON "masters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "procedures_id_key" ON "procedures"("id");

-- CreateIndex
CREATE UNIQUE INDEX "procedures_name_key" ON "procedures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "responses_from_ai_id_key" ON "responses_from_ai"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vacancies_name_key" ON "vacancies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "values_id_key" ON "values"("id");

-- CreateIndex
CREATE UNIQUE INDEX "values_title_key" ON "values"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_ProcedureToResponseFromAI_AB_unique" ON "_ProcedureToResponseFromAI"("A", "B");

-- CreateIndex
CREATE INDEX "_ProcedureToResponseFromAI_B_index" ON "_ProcedureToResponseFromAI"("B");

-- AddForeignKey
ALTER TABLE "header_navbar_links" ADD CONSTRAINT "header_navbar_links_parent_link_id_fkey" FOREIGN KEY ("parent_link_id") REFERENCES "header_navbar_links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "breeds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses_from_ai" ADD CONSTRAINT "responses_from_ai_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "breeds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcedureToResponseFromAI" ADD CONSTRAINT "_ProcedureToResponseFromAI_A_fkey" FOREIGN KEY ("A") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcedureToResponseFromAI" ADD CONSTRAINT "_ProcedureToResponseFromAI_B_fkey" FOREIGN KEY ("B") REFERENCES "responses_from_ai"("id") ON DELETE CASCADE ON UPDATE CASCADE;

