import client from "@/connectors/mongodb";

export async function GET() {
  return Response.json({ hello: "world" });
}
