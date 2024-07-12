import db from "@/connectors/mongodb";
import { stands } from "./stands";

export async function GET() {
  await db.collection("users").insertOne({
    email: "lucas@highsquare.com.br",
    phone: "+5543988279958",
    interests: ["ai"],
    visited: [
      {
        standID: "01",
      },
    ],
  });

  await db.collection("campus").insertMany(stands);

  return Response.json({ status: "SUCCESS" }, { status: 200 });
}
