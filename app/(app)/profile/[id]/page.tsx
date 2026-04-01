import NoPostsYet from "@/app/_components/NoPostsYet";
import PostCard from "@/app/_components/PostCard";
import UserProfileCard from "@/app/_components/UserProfileCard";
import { getSessionHandler } from "@/app/_libs/sessionHandler";
import { Post } from "@/app/_types/types";

interface ProfilePageProps {
  params: { id: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { currentUser } = await getSessionHandler();
  const Params = await params;
  const profileId = Number(Params.id);
  const dummyPosts: Post[] = [];

  const isOwnProfile = profileId === currentUser?.id;

  const userPosts = dummyPosts.filter((p) => p.author.id === profileId);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-8">
      {/* Profile card */}
      <UserProfileCard user={currentUser} />

      {/* Posts section */}
      <div className="flex flex-col gap-5">
        {/* Section header */}
        <div className="flex items-center gap-3">
          <h2 className="font-display font-bold text-xl text-[#f0f0f8]">
            Posts
          </h2>
          <span className="bg-[#7c6af7]/10 border border-[#7c6af7]/20 text-[#7c6af7] text-xs font-bold font-display px-2.5 py-0.5 rounded-full">
            {userPosts.length}
          </span>
        </div>

        {/* Posts or empty state */}
        {userPosts.length > 0 ? (
          <div className="flex flex-col gap-5">
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} isOwner={isOwnProfile} />
            ))}
          </div>
        ) : (
          <NoPostsYet/>
        )}
      </div>
    </div>
  );
}
