import fastify from "fastify";
import { text } from "./hello";

// Get all environment variables that start with RAILWAY_
const railwayVars: Record<string, string> = {};
Object.entries(process.env)
  .filter(
    ([key, value]) =>
      key.startsWith("RAILWAY_") && value != null && value.trim() !== ""
  )
  .forEach(([key, value]) => {
    railwayVars[key] = value ?? "";
  });

if (Object.keys(railwayVars).length > 0) {
  console.log(JSON.stringify(railwayVars, null, 2));
}

const server = fastify();

server.get("/", async (request, reply) => {
  reply.code(200).send({ message: text, ...railwayVars });
});

const start = async () => {
  try {
    const port = parseInt(process.env.PORT ?? "9999");
    const host = "0.0.0.0";

    await server.listen({ port, host });

    console.log(`Server started at http://${host}:${port}`);
  } catch (err) {
    console.log("Fastify failed to start");
    console.error(err);
    process.exit(1);
  }
};

start();
