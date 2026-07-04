import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { LineDraw } from "@/components/motion/LineDraw";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { howItWorksSteps } from "@/lib/site";

/**
 * Makes the boutique, principal-led promise concrete: three steps describing how
 * an engagement actually runs, then a restrained big-firm-vs-here contrast.
 * Every line paraphrases claims already on the site (no new claims). Cells use
 * --fg-derived tints so the section reads cleanly on any scheme.
 */

const contrast = [
  { firm: "Your file is passed down to juniors and across account managers.", here: "A supervised, credentialled team does the work. The principal reviews all of it." },
  { firm: "Big-firm overhead and handoffs, billed back to you.", here: "Boutique scale, senior time, direct access to the principal." },
  { firm: "Generalists applying the rules as written.", here: "Doctoral-level depth on the questions that cost the most." },
];

export function HowItWorks({
  scheme = "sand",
}: {
  scheme?: "cream" | "sand" | "espresso" | "espresso-deep";
}) {
  return (
    <section className={`scheme-${scheme} py-24 lg:py-32`}>
      <Container>
        <Reveal className="max-w-2xl">
          <EyebrowTag>How it works</EyebrowTag>
          <SplitHeadline
            as="h2"
            className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl"
            segments={[{ text: "One principal. On your file, start to finish." }]}
          />
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            No handoffs, no rotating account managers. Here is what working with
            the firm actually looks like.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] sm:grid-cols-3">
          {howItWorksSteps.map((s, i) => (
            <div
              key={s.title}
              className="bg-[color-mix(in_srgb,var(--fg)_4%,transparent)] p-8 lg:p-10"
            >
              <LineDraw className="h-10 w-px bg-brand-red" />
              <div className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-brand-red">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-serif text-2xl leading-snug">{s.title}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-[var(--muted)]">
                {s.body}
              </p>
            </div>
          ))}
        </Stagger>

        {/* Restrained contrast: paired columns, no checkmark/SaaS table. */}
        <Reveal className="mt-14">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] sm:grid-cols-2">
            <div className="bg-[color-mix(in_srgb,var(--fg)_3%,transparent)] p-8 lg:p-10">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--muted)]">
                A global firm
              </div>
              <ul className="mt-6 space-y-4">
                {contrast.map((c) => (
                  <li
                    key={c.firm}
                    className="text-[0.97rem] leading-relaxed text-[var(--muted)]"
                  >
                    {c.firm}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[color-mix(in_srgb,var(--color-brand-red)_7%,transparent)] p-8 lg:p-10">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-red">
                MS Accountants
              </div>
              <ul className="mt-6 space-y-4">
                {contrast.map((c) => (
                  <li
                    key={c.here}
                    className="text-[0.97rem] font-medium leading-relaxed text-[var(--fg)]"
                  >
                    {c.here}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
