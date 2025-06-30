import NextAuth from "next-auth";
// Importujeme naši konfiguraci z nového souboru
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// Nyní exportujeme pouze povolené HTTP handlery
export { handler as GET, handler as POST };