import { Estoque } from "@prisma/client";
import { prisma } from "../prisma/client";

class EstoqueService {
  public async create({
    descricao,
    marca,
    quantidade,
  }: CreateEstoqueType): Promise<void> {
    const estoque: Estoque = {
      id: crypto.randomUUID(),
      descricao,
      marca,
      quantidade,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await prisma.estoque.create({
      data: estoque,
    });
  }

  public async getAll(): Promise<any[]> {
    const produtos = await prisma.estoque.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return produtos;
  }
}

export const estoqueService = new EstoqueService();
