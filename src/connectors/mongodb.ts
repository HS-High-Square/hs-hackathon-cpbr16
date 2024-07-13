import config from "@/config";

import { Db, MongoClient, ServerApiVersion } from "mongodb";
const uri = config.MONGODB_URL;

let db: Db | null = null;

if (process.env.BUILD_ENVIRONMENT !== "local") {
  if (!uri) throw new Error("MongoDB URI not found.");
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  client.connect();

  db = client.db(config.MONGODB_DB);
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export default db;
