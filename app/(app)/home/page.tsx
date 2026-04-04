import PostsList from "@/app/_components/PostsList";
import { getSessionHandler } from "@/app/_libs/sessionHandler";

export default async function HomePage() {
  const { currentUser } = await getSessionHandler();
  const currentUserId = currentUser?.id;
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
      <PostsList currentUserId={currentUserId} />
    </div>
  );
}
