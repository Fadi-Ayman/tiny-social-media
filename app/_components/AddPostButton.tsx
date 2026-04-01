"use client";

import { useState } from "react";
import CreatePostModal from "./CreatePostModal";

export default function AddPostButton() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <>
      {/* Fixed Add Post Button */}
      <button
        onClick={() => setIsCreatePostOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#7c6af7] hover:bg-[#6a59e0] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(124,106,247,0.4)] hover:shadow-[0_10px_40px_rgba(124,106,247,0.5)] hover:-translate-y-1 transition-all cursor-pointer"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={() => setIsCreatePostOpen(false)}
      />
    </>
  );
}
