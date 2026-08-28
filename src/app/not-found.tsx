import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFBF5] p-6">
      <div className="max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100">
          <span className="text-2xl font-bold text-stone-400">404</span>
        </div>
        <h2 className="mb-2 text-lg font-bold">Page not found</h2>
        <p className="mb-6 text-sm text-stone-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700"
        >
          Back to Giuseppe&apos;s
        </Link>
      </div>
    </div>
  );
}
