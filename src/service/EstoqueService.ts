
import { Estoque } from "@prisma/client";
import { prisma } from "../prisma/client";

class EstoqueService {
    public async create({ descricao, marca, quantidade, veiculoId }: CreateEstoqueType): Promise<void> {

        const estoque: Estoque = {
            id: crypto.randomUUID(),
            descricao: descricao,
            marca: marca,
            quantidade: quantidade,
            veiculoId: veiculoId,
            createdAt: new Date(),
            updatedAt: new Date()

        }

        await prisma.estoque.create({ data: estoque })
    }
}

export const estoqueService = new EstoqueService();

