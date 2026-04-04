import Image from "next/image";

interface Comment {
  id: number;
  author: {
    name: string;
    profile_image: string;
  };
  body: string;
  created_at: string;
}

interface CommentSectionProps {
  comments?: Comment[];
  currentUserImage: string;
  currentUserName: string;
  onCommentSubmit?: (formData: FormData) => Promise<void>;
}

export default function CommentSection({
  comments = [],
  currentUserImage,
  currentUserName,
  onCommentSubmit,
}: CommentSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-xl text-[#f0f0f8]">
        Comments ({comments.length})
      </h2>

      {/* Comment input */}
      <form
        action={onCommentSubmit}
        className="bg-[#111118] border border-[#252530] rounded-2xl p-5 space-y-4"
      >
        <div className="flex items-start gap-3">
          <Image
            src={currentUserImage || "/profileImage.jpg"}
            alt={currentUserName}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover shrink-0"
            loading="eager"
          />
          <div className="flex-1">
            <p className="text-[#f0f0f8] text-sm font-semibold mb-1">
              {currentUserName}
            </p>
            <textarea
              name="body"
              placeholder="Write a comment..."
              rows={3}
              className="w-full bg-[#18181f] border border-[#252530] rounded-lg px-4 py-2.5 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all resize-none"
            />
            <button
              type="submit"
              className="mt-3 px-4 py-2 bg-[#7c6af7] hover:bg-[#6a59e0] text-white text-xs font-semibold rounded-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(124,106,247,0.3)] cursor-pointer"
            >
              Post Comment
            </button>
          </div>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[#111118] border border-[#252530] rounded-2xl p-5"
            >
              <div className="flex items-start gap-3">
                <Image
                  src={comment.author.profile_image || "/noUser.jpg"}
                  alt={comment.author.name}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                  loading="eager"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#f0f0f8] text-sm font-semibold">
                      {comment.author.name}
                    </p>
                    <span className="text-[#55556a] text-xs">
                      {comment.created_at}
                    </span>
                  </div>
                  <p className="text-[#8888a4] text-sm">{comment.body}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-[#55556a] text-sm">
              No comments yet. Be the first to comment!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
