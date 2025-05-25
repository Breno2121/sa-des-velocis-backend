import { FastifyInstance } from "fastify";
import { estoqueService } from "../service/EstoqueService";

export async function estoqueController(app: FastifyInstance) {
  app.post("/estoque", async (request, reply) => {
    const body = request.body as {
      descricao: string;
      marca: string;
      quantidade: number;
    };

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

  app.get("/estoque/search", async (request, reply) => {
    const { descricao } = request.query as { descricao: string };

    if (!descricao) {
      return reply.code(400).send({ erro: "Descrição é obrigatória na query" });
    }

    try {
      const produtos = await estoqueService.getByDescricao(descricao);
      return reply.code(200).send(produtos);
    } catch (error: any) {
      return reply.code(400).send({ erro: error.message });
    }
  });
}
