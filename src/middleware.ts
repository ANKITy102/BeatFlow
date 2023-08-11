
import { getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";


export default async function middleware(req: NextRequest) {
    // Call our authentication function to check the request
    // console.log("hi triggered")
    const token = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    if(!token){
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
    
    
  }
export const config = {
    matcher: [ '/dashboard/:path*', "/dashboard"],
  }