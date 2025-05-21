-- AlterTable
ALTER TABLE "estoque" ALTER COLUMN "veiculoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "veiculos" ALTER COLUMN "EstoqueId" DROP NOT NULL;
