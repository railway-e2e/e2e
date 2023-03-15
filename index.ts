import fastify from "fastify";
import { text } from "./hello";

// Get all environment variables that start with RAILWAY_
const railwayVars: Record<string, string> = {};
Object.entries(process.env)
  .filter(([key]) => key.startsWith("RAILWAY_"))
  .forEach(([key, value]) => {
    railwayVars[key] = value ?? "";
  });

if (Object.keys(railwayVars).length > 0) {
  console.log(JSON.stringify(railwayVars, null, 2));
}

const server = fastify();

server.get("/", async (request, reply) => {
  reply.code(200).send({ message: text });
});

server.listen(process.env.PORT || 8080, "0.0.0.0", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  console.log(`Text: ${text}`);
});
