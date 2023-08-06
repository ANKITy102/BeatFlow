import { connectDB } from "@/utils/connectDB";

export async function POST(req:Request, res:Response) {
    try {
        const body =await req.json();
        const {name, email, password, gender} = body;
        if(!name || !email || password || gender){
            
        }
        await connectDB();
    } catch (error) {
        
    }
}