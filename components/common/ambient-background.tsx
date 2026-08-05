export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[#06080b]" />
      <div className="absolute -left-[18rem] -top-[22rem] size-[52rem] rounded-full bg-cyan-500/[0.075] blur-[150px]" />
      <div className="absolute -right-[20rem] top-[28%] size-[48rem] rounded-full bg-emerald-400/[0.055] blur-[160px]" />
      <div className="absolute bottom-[-26rem] left-[25%] size-[50rem] rounded-full bg-indigo-500/[0.045] blur-[170px]" />
      <div className="site-grid absolute inset-0 opacity-40" />
      <div className="noise absolute inset-0 opacity-[0.045]" />
    </div>
  );
}
