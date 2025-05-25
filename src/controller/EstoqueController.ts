import { FastifyInstance } from "fastify";
import { estoqueService } from "../service/EstoqueService";

export async function estoqueController(app: FastifyInstance) {
  app.post("/estoque", async (request, reply) => {
    const body = request.body as CreateEstoqueType;

    try {
      await estoqueService.create(body);
      return reply.code(201).send();
    } catch (error: any) {
      return reply.code(400).send({ erro: error.message });
    }
  });

  app.get("/estoques", async (request, reply) => {
    try {
      const estoques = await estoqueService.getAll();
      return reply.code(200).send(estoques);
    } catch (error: any) {
      return reply.code(400).send({ erro: error.message });
    }
  });
}
