import db from "@/connectors/mongodb";

export async function GET() {
  await db.collection("users").deleteMany();
  await db.collection("campus").deleteMany();

  return Response.json({ status: "SUCCESS" }, { status: 200 });
}
