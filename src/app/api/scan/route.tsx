import db from "@/connectors/mongodb";
export const dynamic = "force-dynamic";
import { Stand } from "@/dtos/stand";
import { User } from "@/dtos/user";

export interface IScanRequest extends User {}

export async function GET(req: Request) {
  if (process.env.BUILD_ENVIRONMENT === "local") return Response.json({});
  const searchParams = new URL(req.url).searchParams;
  const standID = searchParams.get("id");

  console.log("aaa");

  if (!standID) {
    return Response.json(
      { status: "ERROR", message: "Stand ID is required as searchParam." },
      { status: 400 }
    );
  }

  let ourURL = new URL(req.url);
  ourURL.pathname = `/auth/register`;
  ourURL.search = `from=scan&id=${standID}`;
  return Response.redirect(ourURL);
}

export async function POST(req: Request) {
  if (process.env.BUILD_ENVIRONMENT === "local") return Response.json({});
  const searchParams = new URL(req.url).searchParams;
  const standID = searchParams.get("id");

  if (!standID) {
    return Response.json(
      { status: "ERROR", message: "Stand ID is required as searchParam." },
      { status: 400 }
    );
  }

  let reqData: IScanRequest | null = null;
  try {
    reqData = await req.json();
    if (!reqData) throw new Error("No request data.");
  } catch (e) {
    console.warn("Redirecting...");

    let ourURL = new URL(req.url);
    ourURL.pathname = `/auth/register`;
    ourURL.search = `from=scan&id=${standID}`;
    return Response.redirect(ourURL);
  }

  // If user already visited dont visit again
  const user = await db?.collection("users").findOne({ email: reqData.email });
  if (!user) return Response.json({ status: "UNAUTHORIZED" }, { status: 403 });
  console.log("User exists. Proceeding.");

  if (user.visited.includes(`${standID}`)) {
    console.warn("User already scanned QR code.");
    return Response.json({ status: "NO_CHANGE" }, { status: 408 });
  }

  const stand = await db?.collection("campus").findOne({ id: standID });
  if (!stand) {
    console.error("Stand not found.");
    return Response.json({}, { status: 404 });
  }

  db?.collection("users").updateOne(
    { email: reqData.email },
    {
      $set: {
        visited: user.visited ? [...user.visited, standID] : [standID],
      },
    },
    { upsert: true }
  );

  db?.collection("campus").updateOne(
    { id: standID },
    {
      $set: {
        visitors: stand.visitors + 1,
      },
    },
    { upsert: true }
  );

  const res: Stand = {
    id: stand.id,
    name: stand.name,
    categories: stand.categories,
    image: stand.image,
    visitors: stand.visitors + 1,
    percent: stand.percent,
  };

  return Response.json(res);
}
