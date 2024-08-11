-- CreateTable
CREATE TABLE "breeds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(2) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "breeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "constants" (
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(2) NOT NULL,

    CONSTRAINT "constants_pkey" PRIMARY KEY ("type","name")
);

-- CreateTable
CREATE TABLE "prices" (
    "procedure_id" TEXT NOT NULL DEFAULT 'NULL',
    "breed_id" TEXT NOT NULL DEFAULT 'NULL',
    "size" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(2) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("procedure_id","breed_id","size","weight")
);

-- CreateTable
CREATE TABLE "procedure_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(2) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "procedure_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcedureCategoriesOnProcedures" (
    "procedureId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ProcedureCategoriesOnProcedures_pkey" PRIMARY KEY ("procedureId","categoryId")
);

-- CreateTable
CREATE TABLE "procedures" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(2) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProcedureToProcedureCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "breeds_id_key" ON "breeds"("id");

-- CreateIndex
CREATE UNIQUE INDEX "breeds_name_key" ON "breeds"("name");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_categories_id_key" ON "procedure_categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_categories_name_key" ON "procedure_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_categories_order_key" ON "procedure_categories"("order");

-- CreateIndex
CREATE UNIQUE INDEX "procedures_id_key" ON "procedures"("id");

-- CreateIndex
CREATE UNIQUE INDEX "procedures_name_key" ON "procedures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "procedures_order_key" ON "procedures"("order");

-- CreateIndex
CREATE UNIQUE INDEX "_ProcedureToProcedureCategory_AB_unique" ON "_ProcedureToProcedureCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ProcedureToProcedureCategory_B_index" ON "_ProcedureToProcedureCategory"("B");

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "breeds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedureCategoriesOnProcedures" ADD CONSTRAINT "ProcedureCategoriesOnProcedures_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedureCategoriesOnProcedures" ADD CONSTRAINT "ProcedureCategoriesOnProcedures_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "procedure_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcedureToProcedureCategory" ADD CONSTRAINT "_ProcedureToProcedureCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcedureToProcedureCategory" ADD CONSTRAINT "_ProcedureToProcedureCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "procedure_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
