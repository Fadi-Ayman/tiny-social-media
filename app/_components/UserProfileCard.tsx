import Image from "next/image";
import { UserProfileCardProps } from "../_types/types";

export default function UserProfileCard({
  user,
  isOwnProfile = false,
}: UserProfileCardProps) {
  return (
    <div className="bg-[#111118] border border-[#252530] rounded-2xl overflow-hidden">
      {/* Cover */}
      <div className="h-28 relative overflow-hidden bg-linear-to-br from-[#2d1f6e] via-[#1a1a35] to-[#0f1a30]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(124,106,247,0.25)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(92,224,168,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="px-6 pb-6">
        {/* Avatar + action row */}
        <div className="flex items-end justify-between -mt-11 mb-4 ">
          <div className="border-[3px] border-[#111118] rounded-full bg-[#111118] z-99">
            <Image
              src={user.profile_image || "/profileImage.jpg"}
              alt={user.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover block"
            />
          </div>

          {isOwnProfile ? (
            <button className="flex items-center gap-1.5 px-4 py-2 border border-[#3a3a4a] rounded-full text-[#8888a4] hover:text-[#7c6af7] hover:bg-[#7c6af7]/10 hover:border-[#7c6af7] text-xs font-semibold font-display transition-all mb-1">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Profile
            </button>
          ) : (
            <button className="px-5 py-2 bg-[#7c6af7] hover:bg-[#6a59e0] text-white text-xs font-bold font-display rounded-full shadow-[0_4px_16px_rgba(124,106,247,0.3)] hover:-translate-y-0.5 transition-all mb-1">
              Follow
            </button>
          )}
        </div>

        {/* User info */}
        <div className="flex flex-col gap-0.5 mb-5">
          <h2 className="font-display font-extrabold text-xl text-[#f0f0f8]">
            {user.name}
          </h2>
          <p className="text-[#8888a4] text-sm">@{user.username}</p>
          {user.email && (
            <p className="text-[#55556a] text-xs mt-1">{user.email}</p>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-stretch bg-[#18181f] border border-[#252530] rounded-xl overflow-hidden">
          <div className="flex-1 flex flex-col items-center py-3 px-2">
            <span className="font-display font-bold text-lg text-[#f0f0f8] leading-tight">
              {user.posts_count}
            </span>
            <span className="text-[#55556a] text-[10px] uppercase tracking-widest font-semibold mt-0.5">
              Posts
            </span>
          </div>
          <div className="w-px bg-[#252530]" />
          <div className="flex-1 flex flex-col items-center py-3 px-2">
            <span className="font-display font-bold text-lg text-[#f0f0f8] leading-tight">
              {user.comments_count}
            </span>
            <span className="text-[#55556a] text-[10px] uppercase tracking-widest font-semibold mt-0.5">
              Comments
            </span>
          </div>
          <div className="w-px bg-[#252530]" />
          <div className="flex-1 flex flex-col items-center py-3 px-2">
            <span className="font-display font-bold text-lg text-[#f0f0f8] leading-tight">
              #{user.id}
            </span>
            <span className="text-[#55556a] text-[10px] uppercase tracking-widest font-semibold mt-0.5">
              Member
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
