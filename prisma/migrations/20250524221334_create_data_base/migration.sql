/*
  Warnings:

  - Added the required column `veiculoId` to the `estoque` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "estoque" ADD COLUMN     "veiculoId" TEXT NOT NULL;
