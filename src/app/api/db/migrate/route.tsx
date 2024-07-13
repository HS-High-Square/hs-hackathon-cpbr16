import db from "@/connectors/mongodb";
import { Stand, StandUnity } from "@/dtos/stand";
export const dynamic = "force-dynamic";
// import { stands } from "./stands";

export async function GET() {
  if (process.env.BUILD_ENVIRONMENT === "local") return Response.json({});

  const stands = await fetch(
    "https://storage.googleapis.com/hs-cpbr16-hackathon-data/json/stands.json"
  );
  const standsJson = await stands.json();

  const output: Stand[] = [];
  standsJson.mapBases.map((k: StandUnity, i: number) =>
    output.push({
      id: String(i + 1).padStart(2, "0"),
      name: k.baseName,
      categories: [k.baseFilter.toLocaleLowerCase()],
      image:
        k.baseImageURL ||
        "https://placehold.jp/000000/ffffff/192x108.png?text=%3F",
      percent: k.basePercent,
      visitors: 0,
    })
  );

  await db?.collection("campus").insertMany(output);

  return Response.json({ status: "SUCCESS" }, { status: 200 });
}
