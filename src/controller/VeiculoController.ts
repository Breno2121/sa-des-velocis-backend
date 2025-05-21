import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { veiculoService } from "../service/VeiculoService";

export async function veiculoController(app: FastifyInstance) {

    app.post("/veiculo", async (request, reply) => {
        const body = request.body as CreateVeiculoType;

        try {
            await veiculoService.create(body)
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

}