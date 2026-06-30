import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { LineDraw } from "@/components/motion/LineDraw";
import { CountUp } from "@/components/motion/CountUp";
import { valueStats } from "@/lib/site";

export function CredentialGrid() {
  return (
    <section className="scheme-espresso py-24 lg:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <EyebrowTag>04 / Why it matters</EyebrowTag>
          <h2 className="mt-7 font-serif text-4xl leading-[1.06] text-cream sm:text-5xl">
            Credentials only matter if they change your outcome.
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {valueStats.map((stat) => (
            <div key={stat.figure + stat.unit} className="relative flex gap-5 py-6 pr-6">
              <LineDraw className="w-px shrink-0 bg-brand-red" />
              <div>
                <div className="font-serif text-5xl leading-none text-cream sm:text-6xl">
                  <CountUp figure={stat.figure} />
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-red-bright">
                  {stat.unit}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
