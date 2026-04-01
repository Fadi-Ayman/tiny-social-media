import PostCard from "@/app/_components/PostCard";
import UserProfileCard from "@/app/_components/UserProfileCard";
import { dummyCurrentUser, dummyPosts, dummyProfileUser } from "@/app/_data/dummyData";

interface ProfilePageProps {
  params: { id: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const profileId = Number(params.id);
  const isOwnProfile = profileId === dummyCurrentUser.id;

  const profileUser = isOwnProfile ? dummyCurrentUser : dummyProfileUser;
  const userPosts = dummyPosts.filter((p) => p.author.id === profileId);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-8">

      {/* Profile card */}
      <UserProfileCard user={profileUser} isOwnProfile={isOwnProfile} />

      {/* Posts section */}
      <div className="flex flex-col gap-5">
        {/* Section header */}
        <div className="flex items-center gap-3">
          <h2 className="font-display font-bold text-xl text-[#f0f0f8]">Posts</h2>
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
          <div className="flex flex-col items-center justify-center py-16 bg-[#111118] border border-dashed border-[#3a3a4a] rounded-2xl gap-3 text-center">
            <span className="text-4xl">📭</span>
            <p className="text-[#55556a] text-sm">No posts yet</p>
            {isOwnProfile && (
              <button className="mt-1 px-5 py-2 bg-[#7c6af7] hover:bg-[#6a59e0] text-white text-xs font-bold font-display rounded-full shadow-[0_4px_16px_rgba(124,106,247,0.3)] hover:-translate-y-0.5 transition-all">
                Create your first post
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}