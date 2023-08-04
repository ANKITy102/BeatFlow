import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default NextAuth(authOptions);
