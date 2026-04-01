import PostCard from "@/app/_components/PostCard";
import { dummyCurrentUser, dummyPosts } from "@/app/_data/dummyData";

export default function HomePage() {
  const currentUserId = dummyCurrentUser.id;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display font-extrabold text-4xl text-[#f0f0f8] leading-none mb-1.5">
            Feed
          </h1>
          <p className="text-[#8888a4] text-sm">
            What&apos;s happening around you
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {dummyPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isOwner={post.author.id === currentUserId}
          />
        ))}
      </div>
    </div>
  );
}
