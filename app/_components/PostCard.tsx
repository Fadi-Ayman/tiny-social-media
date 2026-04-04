"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EditPostModal from "./EditPostModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { Post, user } from "../_types/types";

interface PostCardProps {
  post: Post;
  isOwner?: boolean;
  currentUser?: user;
  showComments?: boolean;
}

export default function PostCard({
  post,
  isOwner = false,
  currentUser,
  showComments = false,
}: PostCardProps) {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleArticleClick = () => {
    router.push(`/post/${post.id}`);
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const postImage =
    post.image && typeof post.image === "string" ? post.image : "/noPhoto.jpg";
  const authorImage =
    post.author.profile_image && typeof post.author.profile_image === "string"
      ? post.author.profile_image
      : "/noUser.jpg";


  return (
    <>
      <article
        onClick={handleArticleClick}
        className="bg-[#111118] border border-[#252530] rounded-2xl overflow-hidden hover:border-[#3a3a4a] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-200 group cursor-pointer"
      >
        {/* Post image */}
        {post.image && (
          <div className="relative w-full aspect-video overflow-hidden bg-[#18181f]">
            <Image
              src={postImage}
              alt={post.title || post.id.toString()}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 600px"
              loading="eager"
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

        <div className="p-3 flex flex-col gap-3">
          {/* Author row */}
          <Link
            className="flex items-center justify-between px-3 py-1.5 hover:border  rounded-lg text-[#8888a4] hover:text-[#7c6af7] hover:bg-[#7c6af7]/10 hover:border-[#7c6af7] transition-all cursor-pointer"
            href={`/profile/${post.author.id}`}
            onClick={handleAuthorClick}
          >
            <div className="flex items-center gap-2.5 hover:opacity-75 transition-opacity cursor-pointer">
              <Image
                src={authorImage}
                alt={post.author.name || post.title || post.id.toString()}
                width={34}
                height={34}
                loading="eager"
                className="w-8.5 h-8.5 rounded-full object-cover border-2 border-[#252530] shrink-0"
              />
              <div className="flex flex-col gap-0">
                <span className="text-[#f0f0f8] text-sm font-semibold leading-tight">
                  {post.author.name}
                </span>
                <span className="text-[#55556a] text-xs">
                  @{post.author.username}
                </span>
              </div>
            </div>
            <span className="text-[#55556a] text-xs shrink-0">
              {post.created_at}
            </span>
          </Link>

          {/* Content - entire article is now clickable */}
          <div className="flex flex-col gap-1.5">
            <h2 className="font-display font-bold text-base text-white leading-snug transition-colors">
              {post.title}
            </h2>
            <p className="text-white text-sm leading-relaxed line-clamp-2  transition-colors">
              {post.body}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[#252530] mt-1">
            {/* Comments section with toggle arrow */}
            {showComments && currentUser ? (
              <button
                onClick={(e) => {
                  handleButtonClick(e);
                  setIsCommentsOpen(!isCommentsOpen);
                }}
                className="flex items-center gap-1.5 text-[#55556a] hover:text-[#f0f0f8] text-xs transition-colors cursor-pointer pe-10"
              >
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
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                {post.comments_count} comments
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform duration-300 ${
                    isCommentsOpen ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            ) : (
              <span className="flex items-center gap-1.5 text-[#55556a] text-xs">
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
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                {post.comments_count} comments
              </span>
            )}

            {/* Owner actions */}
            {isOwner && (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    handleButtonClick(e);
                    setIsEditOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#3a3a4a] rounded-lg text-[#8888a4] hover:text-[#7c6af7] hover:bg-[#7c6af7]/10 hover:border-[#7c6af7] text-xs font-medium transition-all cursor-pointer"
                >
                  <svg
                    width="12"
                    height="12"
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
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    handleButtonClick(e);
                    setIsDeleteOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#3a3a4a] rounded-lg text-[#8888a4] hover:text-[#f06a6a] hover:bg-[#f06a6a]/10 hover:border-[#f06a6a] text-xs font-medium transition-all cursor-pointer"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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

          {/* Collapsible comments section */}
          {showComments && currentUser && isCommentsOpen && (
            <div className="mt-4 pt-4 border-t border-[#252530] space-y-4">
              {/* Comment input */}
              <div className="flex items-start gap-3">
                <Image
                  src={currentUser.profile_image && typeof currentUser.profile_image === "string" ? currentUser.profile_image : "/profileImage.jpg"}
                  alt={currentUser.name}
                  width={34}
                  height={34}
                  className="w-8.5 h-8.5 rounded-full object-cover shrink-0"
                  loading="eager"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="Write a comment..."
                    rows={2}
                    className="w-full bg-[#18181f] border border-[#252530] rounded-lg px-3 py-2 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all resize-none"
                    onClick={(e) => handleButtonClick(e)}
                  />
                  <div className="mt-2 flex justify-end">
                    <button className="px-3 py-1.5 bg-[#7c6af7] hover:bg-[#6a59e0] text-white text-xs font-semibold rounded-lg transition-all cursor-pointer">
                      Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments list */}
              <div className="space-y-3 mt-4">
                {post.comments?.map((comment, i) => (
                  <div key={comment.id || i} className="flex items-start gap-2">
                    <Image
                      src={
                        comment.author.profile_image &&
                        typeof comment.author.profile_image === "string"
                          ? comment.author.profile_image
                          : "/profileImage.jpg"
                      }
                      alt={comment.author.name || comment.id.toString()}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                      loading="eager"
                    />
                    <div className="flex-1 bg-[#18181f] rounded-lg p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[#f0f0f8] text-xs font-semibold">
                          {comment.author.name}
                        </p>
                        <span className="text-[#55556a] text-xs">2d ago</span>
                      </div>
                      <p className="text-[#8888a4] text-xs mt-1 leading-relaxed">
                        {comment.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Modals */}
      <EditPostModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={() => setIsEditOpen(false)}
        post={{
          title: post.title,
          body: post.body,
          image: post.image,
        }}
      />
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => setIsDeleteOpen(false)}
      />
    </>
  );
}
