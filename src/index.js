import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { calculateSoftenerIndex } from "./softenerIndex.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/calculate", (req, res) => {
    try {
      const result = calculateSoftenerIndex(req.body ?? {});
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.use(express.static(path.join(__dirname, "..", "public")));

  return app;
}

const isMain = process.argv[1] === __filename;
if (isMain) {
  const app = createApp();
  app.listen(PORT, HOST, () => {
    console.log(`softenerindex listening on http://${HOST}:${PORT}`);
  });
}
