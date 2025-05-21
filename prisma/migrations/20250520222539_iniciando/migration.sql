-- CreateTable
CREATE TABLE "veiculos" (
    "id" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "pneu" TEXT NOT NULL,
    "cambio" TEXT NOT NULL,
    "motor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "aprovado" BOOLEAN NOT NULL,

    CONSTRAINT "veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "veiculoId" TEXT NOT NULL,

    CONSTRAINT "estoque_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "estoque" ADD CONSTRAINT "estoque_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
