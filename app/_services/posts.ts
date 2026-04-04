import { Post } from "../_types/types";
import { baseUrl } from "./baseUrl";

export async function getPosts(page = 1): Promise<Post[]> {
  try {
    const response = await fetch(`${baseUrl}/posts?page=${page}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("getPosts error:", error);
    return [];
  }
}

export async function getPost(postId: number): Promise<Post | null> {
  try {
    const response = await fetch(`${baseUrl}/posts/${postId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("getPost error:", error);
    return null;
  }
}

export async function getUserPosts(userId: number): Promise<Post[]> {
  try {
    const response = await fetch(`${baseUrl}/users/${userId}/posts`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user posts: ${response.status}`);
    }

    const data = await response.json();
    return data.data?.reverse() || [];
  } catch (error) {
    console.error("getUserPosts error:", error);
    return [];
  }
}
