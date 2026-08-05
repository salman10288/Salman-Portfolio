import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#06080b] px-5 text-white">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/70">404 / Signal lost</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">This route drifted out of orbit.</h1>
        <p className="mt-6 text-base leading-7 text-white/50">The page does not exist, but the main experience is still online.</p>
        <Link href="/" className="mt-9 inline-flex h-12 items-center justify-center rounded-full border border-cyan-200/35 bg-cyan-300 px-6 text-sm font-semibold text-[#051014] transition hover:bg-white">
          Return home
        </Link>
      </div>
    </main>
  );
}
