import fastify from "fastify";
import cors from "@fastify/cors";
import { userController } from "./controller/UserController";
import authJwt from "./middleware/authJwt";
import fastifySwagger from "@fastify/swagger";
import { swaggerConfig } from "./config/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { veiculoController } from "./controller/VeiculoController";
import { estoqueController } from "./controller/EstoqueController";

const app = fastify();

app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
});


app.register(fastifySwagger, swaggerConfig as any);
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: { docExpansion: "list" },
});

app.register(authJwt);
app.register(userController);
app.register(veiculoController);
app.register(estoqueController);

const PORT = 3333;
app.listen({ port: PORT }).then(() => {
  console.log(`Backend rodando na porta ${PORT}!`);
});
