import db from "@/connectors/mongodb";
export const dynamic = 'force-dynamic'

export async function GET() {
  if (process.env.BUILD_ENVIRONMENT === "local") return Response.json({})
  await db?.collection("users").deleteMany();
  await db?.collection("campus").deleteMany();

  return Response.json({ status: "SUCCESS" }, { status: 200 });
}
