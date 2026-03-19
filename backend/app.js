// Servidor HTTP
import express from "express";
const app = express();

// Redis client
import { createClient } from "redis";
const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

// Usar variáveis de ambiente - contêm configurações e/ou passwords
import { configDotenv } from "dotenv";
configDotenv();
const PORT = process.env.PORT || 3000;

// Utilização do Helmet para algumas medidas de segurança
import helmet from "helmet";
app.use(helmet());

// Aceitar texto para a rota /copy
app.use(express.text());

const clean = (raw) => {
  // Step 1: Strip wrapping quotes
  let cleaned = raw.trim().replace(/^"|"$/g, "");

  // Step 2: Unescape the escaped quotes
  cleaned = cleaned.replace(/\\"/g, '"');

  // Step 3: Remove literal \n and extra whitespace
  cleaned = cleaned.replace(/\\n/g, " ").replace(/\s+/g, " ").trim();

  return cleaned;
};

app.get("/", (req, res) => {
  res.send("Página Home.");
});

app.get("/get-all-contents", (req, res) => {
  res.json(content);
});

app.post("/copy", async (req, res) => {
  // Se o jwt existir e houver body, substituir o content
  if (!req.body) {
    res.status(400).send("No content in body.");
  } else {
    const newId = crypto.randomUUID();

    const value = {
      createdAt: new Date(),
      value: req.body,
    };

    await client.set(newId, JSON.stringify(value));

    res.send(newId);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;

  const content = await client.get(id);

  if (!content) {
    res.status(404).send("404");
  } else {
    const contentDict = JSON.parse(content);
    const result = clean(contentDict.value);
    res.send(result);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
