import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
if (!uri) throw new Error("MONGODB_URI is not set");

const globalForMongo = globalThis as unknown as { _mongo?: MongoClient };
const client = globalForMongo._mongo ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") globalForMongo._mongo = client;

export const db = client.db();
