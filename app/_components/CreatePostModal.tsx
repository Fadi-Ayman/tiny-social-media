
export interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePostModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111118] border border-[#252530] rounded-2xl w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        {/* Header */}
        <div className="border-b border-[#252530] px-6 py-4 flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-[#f0f0f8]">
            Create New Post
          </h2>
          <button
            onClick={onClose}
            className="text-[#8888a4] hover:text-[#f0f0f8] transition-colors cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form action={onSubmit} className="px-6 py-5 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="title"
              className="text-[10px] font-semibold text-[#8888a4] uppercase tracking-widest"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Post title"
              className="bg-[#18181f] border border-[#252530] rounded-lg px-4 py-2.5 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="body"
              className="text-[10px] font-semibold text-[#8888a4] uppercase tracking-widest"
            >
              Body
            </label>
            <textarea
              id="body"
              name="body"
              placeholder="Write your post content here..."
              rows={4}
              className="bg-[#18181f] border border-[#252530] rounded-lg px-4 py-2.5 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="image"
              className="text-[10px] font-semibold text-[#8888a4] uppercase tracking-widest"
            >
              Image
            </label>
            <label
              htmlFor="image"
              className="flex items-center justify-center gap-2 bg-[#18181f] border border-dashed border-[#3a3a4a] rounded-lg px-4 py-3 text-[#8888a4] text-sm cursor-pointer hover:border-[#7c6af7] hover:text-[#f0f0f8] transition-all"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>Upload Image</span>
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-[#252530] px-6 py-4 flex items-center gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 border border-[#252530] rounded-lg text-[#8888a4] hover:text-[#f0f0f8] hover:bg-[#18181f] text-sm font-medium transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#7c6af7] hover:bg-[#6a59e0] text-white font-display font-semibold text-sm rounded-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(124,106,247,0.3)] cursor-pointer"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}
