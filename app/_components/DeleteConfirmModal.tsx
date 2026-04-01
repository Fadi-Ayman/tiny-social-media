
interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111118] border border-[#252530] rounded-2xl w-full max-w-sm shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        {/* Content */}
        <div className="px-6 py-8 flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#f06a6a]/10 border border-[#f06a6a]/30 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#f06a6a]"
            >
              <polyline points="3,6 5,6 21,6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-display font-bold text-lg text-[#f0f0f8]">
              Delete Post
            </h2>
            <p className="text-[#8888a4] text-sm">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
          </div>
        </div>

        {/* Footer */}
        <form
          action={onConfirm}
          className="border-t border-[#252530] px-6 py-4 flex items-center gap-3 justify-end"
        >
          <button
            type="button"
            onClick={onClose}
            className="px-4  w-full py-2.5 border border-[#252530] rounded-lg text-[#8888a4] hover:text-[#f0f0f8] hover:bg-[#18181f] text-sm font-medium transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 w-full  py-2.5 bg-[#f06a6a] hover:bg-[#e55555] text-white font-display font-semibold text-sm rounded-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(240,106,106,0.3)] cursor-pointer"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
