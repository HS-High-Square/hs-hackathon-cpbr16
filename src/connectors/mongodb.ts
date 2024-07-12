import config from "@/config";

import { MongoClient, ServerApiVersion } from "mongodb";
const uri = config.MONGODB_URL;

if (!uri) throw new Error("MongoDB URI not found.");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client.connect();

const db = client.db(config.MONGODB_DB);

export default db;
