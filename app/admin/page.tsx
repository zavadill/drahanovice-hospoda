// app/admin/page.tsx
import { auth } from "@/lib/auth"; // Upravená cesta k auth
import { redirect } from "next/navigation";
import AdminPage from "../components/AdminPage";

export default async function AdminProtectedPage() {
  const session = await auth();

  // Middleware by mělo uživatele přesměrovat, pokud není přihlášen nebo nemá roli 'admin'.
  // Tato kontrola je zde pro jistotu a pro server-side rendering.
  if (!session || (session.user as any)?.role !== 'admin') {
    redirect("/access-denied"); // Přesměrování na stránku "Přístup odepřen"
  }

  return <AdminPage />;
} 