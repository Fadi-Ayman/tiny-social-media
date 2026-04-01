"use server";

import { cookies } from "next/headers";
import { user } from "../_types/types";
import { redirect } from "next/navigation";

type AuthenticatedSession = {
  token: string;
  currentUser: user;
};

export async function getSessionHandler(): Promise<AuthenticatedSession> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const userCookie = cookieStore.get("user")?.value;

  if (!token || !userCookie) {
    redirect("/login");
  }

  let user: user;

  try {
    user = JSON.parse(userCookie);
  } catch {
    throw new Error("Invalid user session");
  }

  return { token, currentUser: user };
}
