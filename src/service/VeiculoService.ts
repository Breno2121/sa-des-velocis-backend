import { prisma } from "../prisma/client";

class VeiculoService {
  public async create({
    modelo,
    cor,
    estoqueId,
  }: CreateVeiculoType): Promise<void> {
    const veiculoId = crypto.randomUUID();

    const estoque = await prisma.estoque.findUnique({
      where: { id: estoqueId },
    });

    if (!estoque) {
      throw new Error("Item de estoque não encontrado.");
    }

    let quantidadeRetirar = 1;
    const descricaoLower = estoque.descricao.toLowerCase();

    if (descricaoLower.includes("pneu")) {
      quantidadeRetirar = 5;
    } else if (descricaoLower.includes("motor")) {
      quantidadeRetirar = 1;
    } else if (descricaoLower.includes("cambio")) {
      quantidadeRetirar = 1;
    }

    if (estoque.quantidade < quantidadeRetirar) {
      throw new Error("Quantidade insuficiente no estoque.");
    }

    await prisma.$transaction([
      prisma.veiculo.create({
        data: {
          id: veiculoId,
          modelo,
          cor,
          aprovado: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }),
      prisma.estoque.update({
        where: { id: estoqueId },
        data: {
          quantidade: estoque.quantidade - quantidadeRetirar,
          updatedAt: new Date(),
        },
      }),
      prisma.veiculo_Estoque.create({
        data: {
          veiculoId,
          estoqueId,
        },
      }),
    ]);
  }

  public async getAll(): Promise<any[]> {
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
    return veiculos;
  }
  public async updateStatus(id: string, aprovado: true | false) {
    return await prisma.veiculo.update({
      where: { id },
      data: { aprovado: aprovado },
    });
  }
}

export const veiculoService = new VeiculoService();
