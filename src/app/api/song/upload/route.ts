import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
export const config = {
    api:{
        bodyParser: false,
    }
}
export async function POST(req: NextApiRequest) {
  try {

    return new Response("pagal");
  } catch (error) {
    console.log(error);
  }
}
