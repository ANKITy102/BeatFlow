import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";

type message = {
  message: string;
};
export async function GET(req: Request, res: Response) {
  await connectDB();
  const user = await User.create({
    email: "ankit@gmail.com",
    username: "ankit",
    gender: "male",
    password: "ankitsdfsdf",
  });
  return user;
}
