"use client";

export function ShowcaseFallback({ dimmed = false }: { dimmed?: boolean }) {
  return (
    <div
      className={`showcase-fallback${dimmed ? " showcase-fallback--dimmed" : ""}`}
      aria-hidden="true"
    >
      <div className="showcase-fallback__halo" />
      <div className="showcase-fallback__island">
        <div className="showcase-fallback__island-ring" />
        <div className="showcase-fallback__monitor">
          <div className="showcase-fallback__screen">
            <div className="showcase-fallback__screen-nav"><b>SS</b><i /><i /><i /></div>
            <small>BUILDING</small>
            <strong>Digital<br />experiences.</strong>
            <span />
          </div>
          <div className="showcase-fallback__stand" />
          <div className="showcase-fallback__foot" />
        </div>
        <div className="showcase-fallback__phone"><i /><b>01</b><strong>PRODUCT<br />SYSTEM</strong><span /><span /><span /></div>
        <div className="showcase-fallback__server">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index}><i /><i /></div>
          ))}
        </div>
        <div className="showcase-fallback__panel showcase-fallback__panel--left"><small>UI / SYSTEM</small><i /><i /><i /></div>
        <div className="showcase-fallback__panel showcase-fallback__panel--right"><small>API / STATUS</small><i /><i /><i /></div>
      </div>
      <div className="showcase-fallback__grid" />
    </div>
  );
}
