"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { user } from "../_types/types";
import { useRouter } from "next/navigation";
import { logoutAction } from "../_actions/auth.actions";

export default function Navbar({ user }: { user: user | null }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      await logoutAction();
      router.push("/login");
    } catch (err: unknown | Error) {
      if (err instanceof Error) {
        const message = err?.message || "Something went wrong";
        throw new Error(message);
      }
    }
  };

  return (
    <header className="sticky top-0 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#252530] z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center gap-3 sm:gap-6">
        {/* Brand */}
        <Link href="/home" className="flex items-center gap-2 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7c6af7] shadow-[0_0_10px_#7c6af7] block" />
          <span className="font-display font-extrabold text-[#f0f0f8] tracking-widest text-sm uppercase">
            Pulse
          </span>
        </Link>

        {/* User button with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 pl-1 pr-3 py-1 bg-[#18181f] border border-[#252530] rounded-full hover:border-[#7c6af7] transition-all cursor-pointer"
          >
            <div className="relative w-7 h-7 shrink-0">
              <Image
                src={user?.profile_image || "/profileImage.jpg"}
                alt={user?.name || "User Name"}
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#5ce0a8] border-2 border-[#18181f] block" />
            </div>
            <span className=" sm:inline text-[#f0f0f8] text-xs font-medium max-w-22.5 truncate">
              {user?.username}
            </span>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-14 right-0 bg-[#0a0a0f]/95 backdrop-blur-xl border border-[#252530] rounded-lg shadow-lg z-50 w-48">
              <nav className="flex flex-col gap-1 py-2">
                <Link
                  href={`/profile/${user?.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-[#8888a4] hover:text-[#f0f0f8] hover:bg-[#18181f] text-sm font-medium transition-all"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Profile
                </Link>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-[#8888a4] hover:text-[#f06a6a] hover:bg-[#f06a6a]/10 text-sm font-medium transition-all cursor-pointer"
                  onClick={handleLogout}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
