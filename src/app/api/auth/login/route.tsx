import db from "@/connectors/mongodb";
import { User } from "@/dtos/user";

export interface ILoginData {
  email: string;
}

export async function POST(req: Request) {
  const reqData: ILoginData = await req.json();

  const user = await db.collection("users").findOne({ email: reqData.email });
  if (!user) {
    return Response.json({}, { status: 403 });
  }

  const res: User = {
    email: user.email,
    phone: user.phone,
    interests: user.interests,
  };

  return Response.json(res, { status: 200 });
}