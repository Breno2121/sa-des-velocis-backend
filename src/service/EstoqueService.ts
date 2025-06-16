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
      quantidade: Number(quantidade),
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
  public async getByDescricao(descricao: string): Promise<Estoque[]> {
    const produtos = await prisma.estoque.findMany({
      where: {
        descricao: {
          equals: descricao,
          mode: "insensitive", // Para Ignorar maiúsculas/minúsculas
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return produtos;
  }

  public async getAllVeiculos() {
    const veiculos = await prisma.veiculo.findMany({
      include: {
        Veiculo_Estoque: {
          include: {
            estoque: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Formata os dados para incluir motor, pneu e cambio separados
    return veiculos.map((veiculo) => {
      const motor = veiculo.Veiculo_Estoque.find((e) =>
        e.estoque.descricao.toLowerCase().includes("motor")
      )?.estoque;

      const pneu = veiculo.Veiculo_Estoque.find((e) =>
        e.estoque.descricao.toLowerCase().includes("pneu")
      )?.estoque;

      const cambio = veiculo.Veiculo_Estoque.find((e) =>
        e.estoque.descricao.toLowerCase().includes("cambio")
      )?.estoque;

      return {
        id: veiculo.id,
        modelo: veiculo.modelo,
        cor: veiculo.cor,
        aprovado: veiculo.aprovado,
        createdAt: veiculo.createdAt,
        updatedAt: veiculo.updatedAt,
        motor,
        pneu,
        cambio,
      };
    });
  }
}

export const estoqueService = new EstoqueService();
