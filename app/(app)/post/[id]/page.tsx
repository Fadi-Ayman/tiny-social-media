import Link from "next/link";
import { getSessionHandler } from "@/app/_libs/sessionHandler";
import { getPost } from "@/app/_services/posts";
import PostCard from "@/app/_components/PostCard";

interface PostPageProps {
  params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const { currentUser } = await getSessionHandler();
  const Params = await params;
  const postId = Number(Params.id);

  const post = await getPost(postId);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-[#8888a4] text-lg">Post not found</p>
          <Link
            href="/home"
            className="text-[#7c6af7] hover:underline mt-4 inline-block"
          >
            Back to feed
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = post.author.id === currentUser.id;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Back button */}
      <Link
        href="/home"
        className="inline-flex items-center gap-2 text-[#8888a4] hover:text-[#f0f0f8] text-sm font-medium mb-8 transition-colors cursor-pointer"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to feed
      </Link>

      {/* Post Card Component */}
      <PostCard
        post={post}
        isOwner={isOwner}
        currentUser={currentUser}
        showComments={true}
      />
    </div>
  );
}
