import db from "@/connectors/mongodb";
import { Stand } from "@/dtos/stand";
import { User } from "@/dtos/user";

export interface IScanRequest extends User {}

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const standID = searchParams.get("id");

  console.log("aaa");

  if (!standID) {
    return Response.json(
      { status: "ERROR", message: "Stand ID is required as searchParam." },
      { status: 400 }
    );
  }

  return Response.redirect(
    `http://localhost:3000/auth/register?from=scan&id=${standID}`
  );
}

export async function POST(req: Request) {
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
    reqData = JSON.parse(await req.json());
    if (!reqData) throw new Error("No request data.");
  } catch (e) {
    return Response.redirect(
      `http://localhost:3000/auth/register?from=scan&id=${standID}`
    );
  }

  // If user already visited dont visit again
  const user = await db.collection("users").findOne({ email: reqData.email });
  if (!user) return Response.json({ status: "UNAUTHORIZED" }, { status: 403 });

  if (user.visited.includes(`${standID}`)) {
    return Response.json({ status: "NO_CHANGE" }, { status: 408 });
  }

  const stand = await db.collection("campus").findOne({ id: standID });
  if (!stand) {
    return Response.json({}, { status: 404 });
  }

  db.collection("users").updateOne(
    { email: reqData.email },
    {
      $set: {
        visited: user.visited ? [...user.visited, standID] : [standID],
      },
    },
    { upsert: true }
  );

  db.collection("campus").updateOne(
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
  };

  return Response.json(res);
}
