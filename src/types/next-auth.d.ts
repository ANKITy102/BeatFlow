import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  interface params {
    account: {
      provider: string;
    };
    // profile: {
    //   email: string;
    //   name: string;
    //   picture: string;
    //   // Add other properties as needed
    // };
  }



  interface Session {
    user: UserType & {
      id: UserId;
    };
  }
}


