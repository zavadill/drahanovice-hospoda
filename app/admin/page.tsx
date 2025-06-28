import { getServerSession } from "next-auth";
import AdminPage from "../components/AdminPage";
import { redirect } from "next/navigation";

export default async function AdminProtectedPage() {

const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <AdminPage />;
}