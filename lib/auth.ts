import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Zde je celá vaše konfigurace, ale nyní je v samostatném souboru a je správně exportována
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!credentials || !adminEmail || !adminPassword) {
            console.error("Missing credentials or environment variables for authentication.");
            return null;
        }

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return { id: "1", name: "Admin", email: adminEmail };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};