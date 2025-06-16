import { nanoid } from "nanoid";
import { prisma } from "../prisma/client";

class VeiculoService {
  public async create({
    modelo,
    cor,
    motorId,
    pneuId,
    cambioId
  }: CreateVeiculoType): Promise<void> {
    const veiculoId = nanoid(10);

    const estoque = await prisma.estoque.findMany({
      where: {
        id: { in: [motorId, pneuId, cambioId] }
      },
    });

    if (estoque.length != 3) {
      throw new Error("Item de estoque não encontrado.");
    }

    estoque.forEach(e => {
      if (e.descricao.includes("pneu") && e.quantidade < 5) {
        throw new Error("Não tem PNEU suficiênte...")
      }

      if (e.descricao.includes("motor") && e.quantidade < 1) {
        throw new Error("Não tem MOTOR suficiênte...")
      }

      if (e.descricao.includes("cambio") && e.quantidade < 1) {
        throw new Error("Não tem CAMBIO suficiênte...")
      }
    });

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

      prisma.veiculo_Estoque.createMany({
        data: [
          { veiculoId: veiculoId, estoqueId: motorId },
          { veiculoId: veiculoId, estoqueId: pneuId },
          { veiculoId: veiculoId, estoqueId: cambioId },
        ]
      }),

      prisma.estoque.update({ where: { id: motorId }, data: { quantidade: { decrement: 1 } } }),
      prisma.estoque.update({ where: { id: pneuId }, data: { quantidade: { decrement: 5 } } }),
      prisma.estoque.update({ where: { id: cambioId }, data: { quantidade: { decrement: 1 } } })
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
