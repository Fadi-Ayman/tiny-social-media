"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTransition } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { registerAction } from "@/app/_actions/auth.actions";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
  image: Yup.mixed().nullable(),
});

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      image: null,
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (values.image) formData.append("image", values.image);

      startTransition(async () => {
        try {
          await registerAction(formData);
          toast.success("Account created successfully!");
          router.push("/home");
          formik.resetForm();
        } catch (err: unknown | Error) {
          if (err instanceof Error) {
            console.log(err.message);
            const message = err?.message || "Something went wrong";
            toast.error(message);
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
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="bg-[#18181f] border border-[#252530] rounded-lg px-4 py-3 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all"
              />
              {formik.touched.name && formik.errors.name && (
                <span className="text-red-500 text-xs">
                  {formik.errors.name}
                </span>
              )}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="bg-[#18181f] border border-[#252530] rounded-lg px-4 py-3 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all"
              />
              {formik.touched.username && formik.errors.username && (
                <span className="text-red-500 text-xs">
                  {formik.errors.username}
                </span>
              )}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="bg-[#18181f] border border-[#252530] rounded-lg px-4 py-3 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-xs">
                {formik.errors.email}
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
              autoComplete="new-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="bg-[#18181f] border border-[#252530] rounded-lg px-4 py-3 text-[#f0f0f8] text-sm placeholder-[#55556a] outline-none focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/20 transition-all"
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-500 text-xs">
                {formik.errors.password}
              </span>
            )}
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
                onChange={(event) => {
                  formik.setFieldValue(
                    "image",
                    event.currentTarget.files?.[0] || null,
                  );
                }}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 flex items-center justify-center gap-2 bg-[#7c6af7] hover:bg-[#6a59e0] text-white font-display font-semibold text-sm rounded-lg py-3.5 transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(124,106,247,0.3)] hover:shadow-[0_6px_28px_rgba(124,106,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create account
            <span>→</span>
          </button>
        </form>

        <p className="text-center mt-6 text-[#8888a4] text-sm">
          Already have an account?
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
