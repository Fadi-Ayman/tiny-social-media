"use server";
import { cookies } from "next/headers";

export async function registerAction(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();
  const username = formData.get("username")?.toString().trim();
  const image = formData.get("image") as File | null;

  if (!name || !email || !password || !username) {
    throw new Error("Name, email, username, and password are required.");
  }

  try {
    const backendFormData = new FormData();
    backendFormData.append("name", name);
    backendFormData.append("email", email);
    backendFormData.append("password", password);
    backendFormData.append("username", username);

    if (image) {
      backendFormData.append("image", image);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        method: "POST",
        body: backendFormData,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    // Set cookies for authentication
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    cookieStore.set("user", JSON.stringify(data.user), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong. Please try again.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

export async function loginAction(formData: FormData) {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString().trim();
  const backendFormData = {
    username,
    password,
  };

  if (!username || !password) {
    throw new Error("username and password are required.");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(backendFormData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Set cookies for authentication
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    cookieStore.set("user", JSON.stringify(data.user), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong. Please try again.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

export async function logoutAction(): Promise<boolean> {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  cookieStore.delete("user");

  return true;
}
