import { user } from "../_types/types";
import { baseUrl } from "./baseUrl";

export async function getUserDetails(userId: number): Promise<user> {
  try {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user details: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("getUserDetails error:", error);
    throw error;
  }
}
