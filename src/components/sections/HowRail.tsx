import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { LineDraw } from "@/components/motion/LineDraw";
import { howItWorksSteps } from "@/lib/site";

/**
 * Act VI — How. Three steps on one hairline rail; a ten-second read.
 * The homepage-compressed sibling of HowItWorks (which inner pages keep).
 * Step copy is the shared `howItWorksSteps` export (single source of truth).
 */

export function HowRail() {
  return (
    <section className="scheme-paper section">
      <Container>
        <Reveal>
          <EyebrowTag>How it works</EyebrowTag>
          <h2 className="mt-7 max-w-[22ch] font-serif text-4xl leading-[1.06] sm:text-5xl">
            One principal. On your file, start to finish.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-10 border-t border-[var(--hairline)] pt-10 sm:grid-cols-3">
          {howItWorksSteps.map((s, i) => (
            <div key={s.title}>
              <LineDraw className="h-10 w-px bg-brand-red" />
              <div className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-brand-red">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-serif text-xl leading-snug">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--muted)]">
                {s.body}
              </p>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
