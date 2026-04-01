import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-40 -right-20 w-125 h-125 rounded-full bg-[#7c6af7]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-100 h-100 rounded-full bg-[#5ce0a8]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-120 bg-[#111118] border border-[#252530] rounded-2xl p-10 shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7c6af7] shadow-[0_0_10px_#7c6af7] block" />
          <span className="font-display font-bold text-[#f0f0f8] tracking-widest text-sm uppercase">
            Pulse
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-3xl text-[#f0f0f8] leading-tight mb-1">
            Join Pulse
          </h1>
          <p className="text-[#8888a4] text-sm">
            Create your account and start sharing
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">
          {/* Name + Username row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-[10px] font-semibold text-[#8888a4] uppercase tracking-widest"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="bg-[#18181f] border border-[#252530] rounded-lg px-4 py-3 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="username"
                className="text-[10px] font-semibold text-[#8888a4] uppercase tracking-widest"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="john_doe"
                className="bg-[#18181f] border border-[#252530] rounded-lg px-4 py-3 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[10px] font-semibold text-[#8888a4] uppercase tracking-widest"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              className="bg-[#18181f] border border-[#252530] rounded-lg px-4 py-3 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-[10px] font-semibold text-[#8888a4] uppercase tracking-widest"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className="bg-[#18181f] border border-[#252530] rounded-lg px-4 py-3 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all"
            />
          </div>

          {/* Profile image upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-[#8888a4] uppercase tracking-widest">
              Profile Image <span className="normal-case">(optional)</span>
            </label>
            <label
              htmlFor="image"
              className="flex items-center gap-3 bg-[#18181f] border border-dashed border-[#3a3a4a] rounded-lg px-4 py-3 text-[#8888a4] text-sm cursor-pointer hover:border-[#7c6af7] hover:text-[#f0f0f8] transition-all"
            >
              <span className="text-base">📷</span>
              <span>Choose a photo</span>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 bg-[#7c6af7] hover:bg-[#6a59e0] text-white font-display font-semibold text-sm rounded-lg py-3.5 transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(124,106,247,0.3)] hover:shadow-[0_6px_28px_rgba(124,106,247,0.4)]"
          >
            Create account
            <span>→</span>
          </button>
        </form>

        {/* Switch */}
        <p className="text-center mt-6 text-[#8888a4] text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#7c6af7] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
