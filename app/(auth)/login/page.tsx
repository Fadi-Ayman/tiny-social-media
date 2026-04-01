"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTransition } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { loginAction } from "@/app/_actions/auth.actions";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);

      startTransition(async () => {
        try {
          await loginAction(formData);
          toast.success("Account signed in successfully!");
          router.push("/home");
          formik.resetForm();
        } catch (err: unknown) {
          if (err instanceof Error) {
            toast.error(err.message || "Something went wrong");
          }
        }
      });
    },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-40 -right-20 w-125 h-125 rounded-full bg-[#7c6af7]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-100 h-100 rounded-full bg-[#5ce0a8]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-110 bg-[#111118] border border-[#252530] rounded-2xl p-10 shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
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
            Welcome back
          </h1>
          <p className="text-[#8888a4] text-sm">
            Sign in to continue to your feed
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
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
              placeholder="your_username"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`bg-[#18181f] border rounded-lg px-4 py-3 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-[#252530]"
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.username}
              </span>
            )}
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
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`bg-[#18181f] border rounded-lg px-4 py-3 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-[#252530]"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 flex items-center justify-center gap-2 bg-[#7c6af7] hover:bg-[#6a59e0] text-white font-display font-semibold text-sm rounded-lg py-3.5 transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(124,106,247,0.3)] hover:shadow-[0_6px_28px_rgba(124,106,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            Sign in
            <span>→</span>
          </button>
        </form>

        {/* Switch */}
        <p className="text-center mt-6 text-[#8888a4] text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#7c6af7] font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
