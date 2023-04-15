import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "enter username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        // const res = await fetch("http://localhost:8000/auth/ login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     username: credentials?.username,
        //     password: credentials?.password,
        //   }),
        // });
        // const user = await res.json();
        // if (
        //   credentials.username == "admin" ||
        //   credentials.password == "admin"
        // ) {
        // }
        const userCheck = credentials?.username;
        const passCheck = credentials?.password;
        let user = null;
        if (passCheck == "admin" && userCheck == "admin") {
          user = { name: "admin" };
        }

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
