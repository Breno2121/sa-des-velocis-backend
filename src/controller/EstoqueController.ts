import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { estoqueService } from "../service/EstoqueService";


export async function estoqueController(app: FastifyInstance) {

    app.post("/estoque", async (request, reply) => {
        const body = request.body as CreateEstoqueType;

        try {
            await estoqueService.create(body)
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

}