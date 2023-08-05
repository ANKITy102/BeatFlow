import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";

type message = {
  message: string;
};
export async function GET(req: Request, res: Response) {
  await connectDB();
  return new Response("Welcome to beatFlow");
}
