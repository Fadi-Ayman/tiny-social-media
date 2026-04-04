"use client";
import { useEffect, useState, useRef } from "react";
import { getPosts } from "../_services/posts";
import { Post } from "../_types/types";
import NoPostsYet from "./NoPostsYet";
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import { useInfiniteScroll } from "../_hooks/useInfiniteScroll";

type PostsListProps = {
  currentUserId: number;
};

function PostsList({ currentUserId }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const observerTarget = useInfiniteScroll({
    page,
    setPage,
    isLoading,
    hasMore,
    threshold: 500,
    delay: 1000,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setIsLoading(true);
      try {
        const newPosts = await getPosts(page);

        if (signal.aborted) {
          console.log("Request was aborted");
          return;
        }

        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prevPosts) =>
            page === 1 ? newPosts : [...prevPosts, ...newPosts],
          );
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Fetch request cancelled");
          return;
        }
        console.error("Error fetching posts:", error);
        setHasMore(false);
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page]);

  const skeletonCount = 6;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.length === 0 && !isLoading ? (
        <NoPostsYet />
      ) : (
        <>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isOwner={post.author.id === currentUserId}
            />
          ))}

          {/* Loading skeleton loaders */}
          {isLoading &&
            Array.from({ length: skeletonCount }).map((_, index) => (
              <PostCardSkeleton key={`skeleton-${index}`} />
            ))}

          {/* Infinite scroll trigger */}
          <div ref={observerTarget} className="col-span-full h-4" />
        </>
      )}
    </div>
  );
}

export default PostsList;
