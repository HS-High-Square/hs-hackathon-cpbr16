import db from "@/connectors/mongodb";

export async function GET() {
  const stands = await db.collection("campus").find({});

  const o: any = {};
  (await stands.toArray()).forEach((s) => {
    o[s.id] = {
      name: s.name,
      categories: s.categories,
      image: s.image,
      visitors: s.visitors,
    };
  });

  return Response.json(o);
}
