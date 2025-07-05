// lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Importujte authConfig pro nastavení stránek
import { authConfig } from "./auth.config";

// Pro rozšíření typů relace a tokenu
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Přidáno pro RBAC
    };
  }

  interface JWT {
    id?: string;
    role?: string; // Přidáno pro RBAC
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // Použijte authConfig pro nastavení stránek
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!credentials || !adminEmail || !adminPassword) {
          console.error("Missing credentials or environment variables for authentication.");
          return null;
        }

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          // Přiřaďte roli 'admin' pro tento specifický účet
          return { id: "1", name: "Admin", email: adminEmail, role: "admin" };
        } else {
          // Předpokládejme, že ostatní uživatelé mají roli 'user'
          // V reálné aplikaci byste zde ověřovali uživatele z databáze a načítali jejich roli
          return null; // Pro jednoduchost, pokud se neshoduje s adminem, nepovolujeme přihlášení
        }
      },
    }),
    // Zde můžete přidat další poskytovatele jako GoogleProvider, GitHubProvider atd.
    // Příklad s GoogleProvider (vyžaduje GOOGLE_CLIENT_ID a GOOGLE_CLIENT_SECRET v .env.local)
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "user"; // Nastavte výchozí roli, pokud není specifikována
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).id = token.id;
      (session.user as any).role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dní
  },
  secret: process.env.NEXTAUTH_SECRET, // Použijeme NEXTAUTH_SECRET místo AUTH_SECRET, jelikož je to v Next.js obecnější
}); 