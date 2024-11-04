import axios from "axios";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { api } from "./lib/api";
// import { api } from "./lib/api";

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
        // user.token = account.access_token;
        // user.type = account.type;
        // console.log({ account });

        try {
          const res = await api.post("/users/oauth/login", {
            user_id: user.id,
            name: user.name,
            image: user.image,
            token: user.token,
            email: user.email,
          });

          const csrfToken = await axios.get(
            "http://localhost:3000/api/auth/csrf"
          );

          const signin = await axios.post(
            "https://github.com/login/oauth/access_token",
            {},
            {
              params: {
                client_id: process.env.AUTH_GITHUB_ID,
                client_secret: process.env.AUTH_GITHUB_SECRET,
                code: "123",
              },
            }
          );

          const token = res.data.data.token;

          user.token = token;
          user.type = account.type;

          console.log(signin.data);
          console.log(csrfToken.data);
        } catch (error) {
          console.log(error);
        }
      }

      user.type = account.type;

      return true;
    },
  },
});
