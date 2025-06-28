// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Přihlášení pro admina",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Heslo", type: "password" },
      },
      async authorize(credentials) {
        const validEmail = process.env.ADMIN_EMAIL;
        const validPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials?.email === validEmail &&
          credentials?.password === validPassword
        ) {
          return { id: "admin", name: "Admin", email: validEmail };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
