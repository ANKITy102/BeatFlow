import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectDB } from "@/utils/connectDB";
import User from "@/models/User";

export function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return {
    clientId,
    clientSecret,
  };
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectDB();

      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectDB();

          const userExists = await User.findOne({
            email: profile?.email,
          });

          //if not create a user
          if (!userExists) {
            await User.create({
              email: profile?.email,
              name: profile?.name,
              image: profile?.image,
            });
          }

          return true;
        } catch (error) {
          return false;
        }
      } else if (account?.provider === "github") {
        try {
          await connectDB();
          const userExists = await User.findOne({
            email: profile?.email,
          });

          // //if not create a user
          if (!userExists) {
            await User.create({
              email: profile?.email,
              name: profile?.name, 
            });
          }

          return true;
        } catch (error) {
          return false;
        }
      }

      return false;
    },
    redirect() {
      return "/dashboard";
    },
  },
};
