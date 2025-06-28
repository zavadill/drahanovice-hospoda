import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminPage from "../components/AdminPage";
import { redirect } from "next/navigation";

export default async function AdminProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <AdminPage />;
}