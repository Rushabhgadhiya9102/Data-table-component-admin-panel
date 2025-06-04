import jsonServer from "json-server";
import path from "path";
import { createServer } from "http";
import { parse } from "url";

// Create JSON Server router
const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Export a handler compatible with Vercel
export default async function handler(req, res) {
  const parsedUrl = parse(req.url, true);
  server.handle(req, res, parsedUrl);
}
