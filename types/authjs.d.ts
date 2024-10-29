import { type DefaultSession } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
    type: string;
  }

  interface User {
    role: string;
    token: string;
    type: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    role: string;
    token: string;
    type: string;
  }
}
