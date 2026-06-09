import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:py-24">
      <span className="rounded-full bg-everest-100 px-4 py-1 text-sm font-medium text-everest-800">
        Everest Food App
      </span>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Taste the Himalayas, delivered fresh
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Register or sign in to explore curated Nepali and Himalayan cuisine from local kitchens.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/register"
          className="rounded-lg bg-everest-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-everest-700"
        >
          Create account
        </Link>
        <Link
          href="/login"
          className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
