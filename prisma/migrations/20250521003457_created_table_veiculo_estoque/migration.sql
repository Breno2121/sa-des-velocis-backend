/*
  Warnings:

  - Made the column `veiculoId` on table `estoque` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `EstoqueId` to the `veiculos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "estoque" DROP CONSTRAINT "estoque_veiculoId_fkey";

-- AlterTable
ALTER TABLE "estoque" ALTER COLUMN "veiculoId" SET NOT NULL;

-- AlterTable
ALTER TABLE "veiculos" ADD COLUMN     "EstoqueId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "veiculo_estoque" (
    "veiculoId" TEXT NOT NULL,
    "estoqueId" TEXT NOT NULL,

    CONSTRAINT "veiculo_estoque_pkey" PRIMARY KEY ("veiculoId","estoqueId")
);

-- AddForeignKey
ALTER TABLE "veiculo_estoque" ADD CONSTRAINT "veiculo_estoque_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veiculo_estoque" ADD CONSTRAINT "veiculo_estoque_estoqueId_fkey" FOREIGN KEY ("estoqueId") REFERENCES "estoque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
