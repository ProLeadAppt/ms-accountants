import { authorityItems } from "@/lib/site";

/** Borrowed-authority band: an infinite marquee of mastheads + institutions. */
export function AuthorityMarquee() {
  const loop = [...authorityItems, ...authorityItems];
  return (
    <section className="scheme-cream border-y border-[var(--hairline)]">
      <div className="flex items-stretch">
        <div className="hidden shrink-0 items-center border-r border-[var(--hairline)] px-7 md:flex">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-red">
            As cited in
          </span>
        </div>
        <div className="marquee-mask flex-1 overflow-hidden py-5">
          <div className="animate-marquee flex w-max items-center gap-12">
            {loop.map((item, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item}
                </span>
                <span className="h-1 w-1 rounded-full bg-brand-red" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
