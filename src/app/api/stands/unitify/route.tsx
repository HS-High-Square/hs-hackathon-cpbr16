import { User } from "@/dtos/user";

export async function POST(req: Request) {
  let ourURL = new URL(req.url);
  ourURL.pathname = `/api/stands`;

  const standsReq = await fetch(ourURL);
  const standsJson = await standsReq.json();

  const user: User = await req.json();

  const mapBases = Object.keys(standsJson).map((k) => ({
    baseName: standsJson[k].name,
    baseFilter: standsJson[k].categories[0],
    peopleAmount: standsJson[k].visitors,
    baseID: parseInt(k),
    basePercent: 0,
    completed: user.visited.find((e) => e == k) === undefined ? false : true,
  }));

  const unityJson = {
    mapBases: mapBases,
  };

  console.log(unityJson);

  return Response.json(unityJson, { status: 200 });
}
