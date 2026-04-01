import { redirect } from "next/navigation";
import { getSessionHandler } from "./_libs/sessionHandler";

export default async function RootPage() {
  const { token } = await getSessionHandler();
  if (token) {
    redirect("/home");
  } else {
    redirect("/login");
  }
}
