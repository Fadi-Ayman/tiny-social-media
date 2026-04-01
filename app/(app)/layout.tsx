import Navbar from "../_components/Navbar";
import AddPostButton from "../_components/AddPostButton";
import { getSessionHandler } from "../_libs/sessionHandler";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, currentUser } = await getSessionHandler();
  if (!token) redirect("/login");
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <Navbar user={currentUser} />
      <main className="flex-1">{children}</main>
      <AddPostButton />
    </div>
  );
}
