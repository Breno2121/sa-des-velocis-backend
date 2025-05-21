
import { Veiculo } from "@prisma/client";
import { prisma } from "../prisma/client";

class VeiculoService {
    public async create({ modelo, cor, pneu, cambio, motor, motorId }: CreateVeiculoType): Promise<void> {

        const veiculo: Veiculo = {
            id: crypto.randomUUID(),
            modelo: modelo,
            cor: cor,
            pneu: pneu,
            cambio: cambio,
            motor: motor,
            createdAt: new Date(),
            updatedAt: new Date(),
            aprovado: false
        }

        await prisma.veiculo.create({ data: veiculo })
        await prisma.veiculo.createMany({ data: [
            {veiculoId: veiculo.id, EstoqueId: motorId}
        ] })
    }
}

export const veiculoService = new VeiculoService();

