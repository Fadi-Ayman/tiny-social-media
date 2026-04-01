// "use server";

// import { cookies } from "next/headers";

// export async function registerAction(formData: FormData) {
//   const name = formData.get("name")?.toString().trim();
//   const email = formData.get("email")?.toString().trim();
//   const password = formData.get("password")?.toString().trim();
//   const username = formData.get("username")?.toString().trim();
//   const image = formData.get("image") as File | null;

//   if (!name || !email || !password || !username || !image) {
//     throw new Error("All fields are required");
//   }

//   const headers = {
//     "Content-Type": "multipart/form-data",
//     Accept: "multipart/form-data",
//   };

//   try {
//     const backendFormData = new FormData();
//     backendFormData.append("name", name);
//     backendFormData.append("email", email);
//     backendFormData.append("password", password);
//     backendFormData.append("username", username);
//     backendFormData.append("image", image);

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/register`,
//       {
//         method: "POST",
//         headers,
//         body: backendFormData,
//       },
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Registration failed");
//     }

//     const cookieStore = await cookies();
//     cookieStore.set("token", data.token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24 * 7,
//     });
//     cookieStore.set("userInfo", JSON.stringify(data.userInfo), {
//       httpOnly: true,
//       secure: true,
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24 * 7,
//     });

//     return;
//   } catch (err: unknown) {
//     if (err instanceof Error)
//       throw new Error(
//         err?.message || "Something went wrong. Please try again.",
//       );
//   }
// }
