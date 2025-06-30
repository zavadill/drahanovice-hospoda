import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Zde probíhá samotné ověření uživatele
      async authorize(credentials, req) {
        // !! DŮLEŽITÉ !!
        // V reálné aplikaci byste zde měli hashovat hesla a porovnávat je s hashem v databázi.
        // Pro jednoduchost zde použijeme statické přihlašovací údaje uložené v environmentních proměnných.
        // NIKDY nepoužívejte v produkci plain-text hesla.
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!credentials || !adminEmail || !adminPassword) {
            console.error("Missing credentials or environment variables for authentication.");
            return null;
        }

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          // Pokud je ověření úspěšné, vrátíme objekt uživatele.
          // Tento objekt se uloží do JWT a bude dostupný v session.
          return { id: "1", name: "Admin", email: adminEmail };
        } else {
          // Pokud ověření selže, vrátíme null.
          return null;
        }
      },
    }),
  ],
  // Nastavení session strategie na JWT (JSON Web Tokens)
  session: {
    strategy: "jwt",
  },
  // Určení stránek pro přihlášení a chyby
  pages: {
    signIn: "/login",
  },
  // Tajný klíč pro podepisování JWT. Je naprosto klíčový pro bezpečnost.
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };