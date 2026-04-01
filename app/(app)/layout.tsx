import Navbar from "../_components/Navbar";
import AddPostButton from "../_components/AddPostButton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <AddPostButton />
    </div>
  );
}
