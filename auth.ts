import axios from "axios";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter";
import { api } from "./lib/api";

class InvalidLoginError extends CredentialsSignin {
  constructor(error: string = "Invalid login") {
    super();
    this.code = error;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Github,
    Twitter,
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        try {
          const response = await axios.post(
            "http://localhost:8080/api/users/login",
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );

          user = response.data.data;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const errors = await error?.response?.data?.errors;
          throw new InvalidLoginError(errors);
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLogin = !!auth?.user;
      const protectedRoutes = ["/dashboard"];

      if (!isLogin && protectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLogin && nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (isLogin && nextUrl.pathname.startsWith("/register")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },

    jwt({ token, user, account }) {
      if (user) {
        token.token = user.token;
        token.type = account.type;
        token.exp = account.expires_in;
        user.exp = account.expires_in;
        // console.log({ token });
        // console.log({ user });
        // console.log({ account });
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.sub;
      session.user.token = token.token;
      session.user.type = token.type;

      return session;
    },

    async signIn({ user, account }) {
      if (account.type == "oauth") {
        user.token = account.access_token;
        user.type = account.type;
        console.log({ account });

        try {
          const res = await api.post("/users/oauth/login", {
            user_id: user.id,
            name: user.name,
            image: user.image,
            token: user.token,
            email: user?.email || "null",
          });

          const token = res.data.data.token;
          user.token = token;
          user.type = account.type;

          console.log(res.data.data);
        } catch (error) {
          console.log(error);
        }
      }

      user.type = account.type;

      return true;
    },
  },
});
