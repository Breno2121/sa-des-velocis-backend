-- DropForeignKey
ALTER TABLE "estoque" DROP CONSTRAINT "estoque_veiculoId_fkey";

-- AlterTable
ALTER TABLE "estoque" ALTER COLUMN "veiculoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "estoque" ADD CONSTRAINT "estoque_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
