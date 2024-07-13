import db from "@/connectors/mongodb";
export const dynamic = 'force-dynamic'
import { User } from "@/dtos/user";

export interface IRegisterData {
  email: string;
  phone: string;
  interests: string[];
}

export async function POST(req: Request) {
  if (process.env.BUILD_ENVIRONMENT === "local") return Response.json({})
  const reqData: IRegisterData = await req.json();

  const user = await db?.collection("users").findOne({ email: reqData.email });
  if (!user) {
    db?.collection("users").insertOne(reqData);
  }

  const res: User = {
    email: reqData.email,
    phone: reqData.phone,
    interests: reqData.interests,
  };

  return Response.json(res);
}
