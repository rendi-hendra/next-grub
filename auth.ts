import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "username" },
        password: { label: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)

        try {
          const response = await axios.post("/users/login", {
            username: credentials?.username,
            password: credentials?.password,
          });
          user = response.data.data;
        } catch (error) {
          console.log(error);
        }

        // api
        //   .post("/users/login", {
        //     username: credentials?.username,
        //     password: credentials?.password,
        //   })
        //   .then((response) => {
        //     user = response.data.data;
        //   });

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
