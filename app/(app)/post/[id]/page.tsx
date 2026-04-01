
import Image from "next/image";
import Link from "next/link";
import { dummyCurrentUser, dummyPosts } from "@/app/_data/dummyData";

interface PostPageProps {
  params: { id: string };
}

export default function PostPage({ params }: PostPageProps) {
  const postId = Number(params.id);
  const post = dummyPosts.find((p) => p.id === postId);
  

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

  const isOwner = post.author.id === dummyCurrentUser.id;

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

      {/* Post */}
      <article className="bg-[#111118] border border-[#252530] rounded-2xl overflow-hidden mb-8">
        {/* Post image */}
        {post.image && (
          <div className="relative w-full aspect-video overflow-hidden bg-[#18181f]">
            <Image
              src={post.image || "/noPhoto.jpg"}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            {/* Tags overlay */}
            {post.tags.length > 0 && (
              <div className="absolute bottom-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#0a0a0f]/75 backdrop-blur-sm border border-[#7c6af7]/30 text-[#7c6af7] text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-6 flex flex-col gap-4">
          {/* Author row */}
          <div className="flex items-center justify-between">
            <Link
              href={`/profile/${post.author.id}`}
              className="flex items-center gap-3 hover:opacity-75 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={post.author.profile_image || "/noUser.jpg"}
                alt={post.author.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#252530] shrink-0"
              />
              <div className="flex flex-col gap-0">
                <span className="text-[#f0f0f8] text-sm font-semibold">
                  {post.author.name}
                </span>
                <span className="text-[#55556a] text-xs">
                  @{post.author.username}
                </span>
              </div>
            </Link>
            <span className="text-[#55556a] text-sm">{post.created_at}</span>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3">
            <h1 className="font-display font-extrabold text-2xl text-[#f0f0f8] leading-tight">
              {post.title}
            </h1>
            <p className="text-[#8888a4] text-base leading-relaxed">
              {post.body}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#252530]">
            <span className="flex items-center gap-2 text-[#55556a] text-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              {post.comments_count} comments
            </span>
          </div>

          {/* Owner actions */}
          {isOwner && (
            <div className="flex items-center gap-2 pt-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#3a3a4a] rounded-lg text-[#8888a4] hover:text-[#7c6af7] hover:bg-[#7c6af7]/10 hover:border-[#7c6af7] text-xs font-medium transition-all cursor-pointer">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#3a3a4a] rounded-lg text-[#8888a4] hover:text-[#f06a6a] hover:bg-[#f06a6a]/10 hover:border-[#f06a6a] text-xs font-medium transition-all cursor-pointer">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3,6 5,6 21,6" />
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </article>

      {/* Comments section */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-xl text-[#f0f0f8]">
          Comments ({post.comments_count})
        </h2>

        {/* Comment input */}
        <div className="bg-[#111118] border border-[#252530] rounded-2xl p-5 space-y-4">
          <div className="flex items-start gap-3">
            <Image
              src={dummyCurrentUser.profile_image || "/profileImage.jpg"}
              alt={dummyCurrentUser.name}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
            <div className="flex-1">
              <p className="text-[#f0f0f8] text-sm font-semibold mb-1">
                {dummyCurrentUser.name}
              </p>
              <textarea
                // value={newComment}
                // onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                className="w-full bg-[#18181f] border border-[#252530] rounded-lg px-4 py-2.5 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all resize-none"
              />
              <button className="mt-3 px-4 py-2 bg-[#7c6af7] hover:bg-[#6a59e0] text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(124,106,247,0.3)] cursor-pointer">
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {/* Comments list */}
        <div className="space-y-4">
          {/* Sample comments - UI only */}
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-[#111118] border border-[#252530] rounded-2xl p-5"
            >
              <div className="flex items-start gap-3">
                <Image
                  src={"https://api.dicebear.com/7.x/avataaars/svg?seed=comment{i}"}
                  alt="Commenter"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#f0f0f8] text-sm font-semibold">
                      User {i}
                    </p>
                    <span className="text-[#55556a] text-xs">2 days ago</span>
                  </div>
                  <p className="text-[#8888a4] text-sm">
                    This is a sample comment on the post. Comments are displayed
                    here for UI demonstration.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
