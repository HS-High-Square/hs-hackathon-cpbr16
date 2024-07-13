import db from "@/connectors/mongodb";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const userEmail = searchParams.get("email");

  const user = await db.collection("users").findOne({ email: userEmail });
  if (!user) {
    return Response.json({ status: "ERROR" }, { status: 404 });
  }

  return Response.json(user.visited || []);
}
