import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { userService } from "../service/UserService";
import { loginSchema, registerSchema } from "../config/schema/auth.schema";

export async function userController(app: FastifyInstance) {

    app.post("/user/register",  async (request,  reply) => {
        const body = request.body as CreateUserType;
        console.log(body)
        try {
            await userService.register(body)
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

    app.post("/users/login", async (request, reply) => {
        const body = request.body as LoginType;
        console.log(body)
        try {
            const token = await userService.login(body, app)
            return reply.code(200).send({ access_token: token });
        } catch (error: any) {
            return reply.code(401).send({ erro: error.message })
        }
    })

    
}