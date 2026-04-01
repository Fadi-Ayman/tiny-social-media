export interface Author {
  id: number;
  profile_image: string;
  username: string;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  author: Author;
  image: string;
  tags: string[];
  created_at: string;
  comments_count: number;
}

export interface user {
  id: number;
  username: string;
  name: string;
  email: string;
  profile_image: string;
  comments_count: number;
  posts_count: number;
}

export interface UserProfileCardProps {
  user: user;
}

export interface SessionData {
  token: string | null;
  user: user | null;
}