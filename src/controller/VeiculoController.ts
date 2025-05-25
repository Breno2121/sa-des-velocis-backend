import { FastifyInstance } from "fastify";
import { veiculoService } from "../service/VeiculoService";

export async function veiculoController(app: FastifyInstance) {
  app.post("/veiculos", async (request, reply) => {
    const body = request.body as CreateVeiculoType;

    try {
      await veiculoService.create(body);
      return reply.code(201).send();
    } catch (error: any) {
      return reply.code(400).send({ erro: error.message });
    }
  });

  app.get("/veiculos", async (request, reply) => {
    try {
      const veiculos = await veiculoService.getAll();
      return reply.code(200).send(veiculos);
    } catch (error: any) {
      return reply.code(400).send({ erro: error.message });
    }
  });
  app.patch("/veiculo/status", async (request, reply) => {
    const { id, status } = request.body as {
      id: string;
      status: true | false;
    };

    try {
      const veiculoAtualizado = await veiculoService.updateStatus(id, status);
      return reply.code(200).send(veiculoAtualizado);
    } catch (error: any) {
      return reply.code(400).send({ erro: error.message });
    }
  });
}
