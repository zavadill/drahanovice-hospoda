// app/admin/page.tsx
import { getServerSession } from "next-auth";
import AdminPage from "../components/AdminPage"; // Ujistěte se, že cesta je správná
import { redirect } from "next/navigation";

export default async function AdminProtectedPage() {
  const session = await getServerSession();

  // Pokud není relace, přesměruj na přihlašovací stránku
  if (!session) {
    redirect("/login");
  }

  return <AdminPage />;
}