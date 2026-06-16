import mongoose from "mongoose";
import dns from "node:dns";
import { env } from "./env";

// Cache the connection across hot reloads (dev) and serverless invocations so
// we don't open a new pool on every request.
type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

const globalForMongoose = globalThis as unknown as { _mongoose?: MongooseCache };
const cache: MongooseCache = globalForMongoose._mongoose || { conn: null, promise: null };
globalForMongoose._mongoose = cache;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    mongoose.set("strictQuery", true);
    if (env.mongoUri.startsWith("mongodb+srv://") && env.mongodbDnsServers.length) {
      dns.setServers(env.mongodbDnsServers);
    }
    cache.promise = mongoose
      .connect(env.mongoUri, {
        dbName: env.mongoDbName,
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 8000,
      })
      .then((conn) => {
        console.log(`✓ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
        return conn;
      });
  }

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null; // allow a retry on the next request
    throw err;
  }
  return cache.conn;
}

export function isDBConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
