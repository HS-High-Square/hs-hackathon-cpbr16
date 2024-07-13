import db from "@/connectors/mongodb";
export const dynamic = 'force-dynamic'
import { stands } from "./stands";

export async function GET() {
  if (process.env.BUILD_ENVIRONMENT === "local") return Response.json({})
  await db?.collection("users").insertOne({
    email: "lucas@highsquare.com.br",
    phone: "+5543988279958",
    interests: ["ai"],
    visited: [],
  });

  await db?.collection("campus").insertMany(stands);

  return Response.json({ status: "SUCCESS" }, { status: 200 });
}
