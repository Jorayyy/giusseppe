"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="mb-2 text-lg font-bold">Something went wrong</h2>
        <p className="mb-4 text-sm text-stone-500">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        {error.digest && (
          <p className="mb-4 text-xs text-stone-400">Error ID: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
