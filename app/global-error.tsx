"use client";
type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center space-y-6">
          {/* Title */}
          <h1 className="text-2xl font-bold text-red-600">
            🚨 Something went wrong
          </h1>

          {/* Message */}
          <p className="text-gray-600 wrap-break-word">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Try again
            </button>

            <button
              onClick={() => location.reload()}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Reload page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
