// Redis client

import { configDotenv } from "dotenv";
configDotenv();
const URL = process.env.URL_REDIS;

import { createClient } from "redis";
const client = createClient({ url: URL });

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

class RedisClient {
  async saveContent(id, data) {
    // Salva o content no Redis
    await client.set(id, data, { EX: 3600 });
  }

  async getContent(id) {
    return await client.get(id);
  }
}

export const redisClient = new RedisClient();
