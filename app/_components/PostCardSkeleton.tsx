"use client";

export default function PostCardSkeleton() {
  return (
    <div className="bg-[#111118] border border-[#252530] rounded-2xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#18181f]"></div>

      <div className="p-3 flex flex-col gap-3">
        {/* Author row skeleton */}
        <div className="flex items-center justify-between px-3 py-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8.5 h-8.5 rounded-full bg-[#252530] shrink-0"></div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-[#252530] rounded"></div>
              <div className="h-3 w-16 bg-[#252530] rounded"></div>
            </div>
          </div>
          <div className="h-3 w-12 bg-[#252530] rounded"></div>
        </div>

        {/* Content skeleton */}
        <div className="flex flex-col gap-1.5">
          <div className="h-5 w-full bg-[#252530] rounded"></div>
          <div className="h-4 w-5/6 bg-[#252530] rounded"></div>
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-[#252530] mt-1">
          <div className="h-4 w-24 bg-[#252530] rounded"></div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-16 bg-[#252530] rounded-lg"></div>
            <div className="h-8 w-16 bg-[#252530] rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
