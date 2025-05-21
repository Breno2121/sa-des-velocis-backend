/*
  Warnings:

  - Changed the type of `quantidade` on the `estoque` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "estoque" DROP COLUMN "quantidade",
ADD COLUMN     "quantidade" INTEGER NOT NULL;
