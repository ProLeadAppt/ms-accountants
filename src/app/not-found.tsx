import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { SplitHeadline } from "@/components/motion/SplitHeadline";

export default function NotFound() {
  return (
    <section className="scheme-espresso flex min-h-[80vh] items-center py-32">
      <Container>
        <EyebrowTag>Error 404</EyebrowTag>
        <SplitHeadline
          as="h1"
          reveal="hero"
          className="mt-7 max-w-[18ch] font-serif text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-7xl"
          segments={[{ text: "This page took a position we can’t defend." }]}
        />
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
          The page you are after has moved or never existed. Let us point you
          back to firmer ground.
        </p>
        <div className="mt-11 flex flex-wrap gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="secondary">
            View services
          </Button>
        </div>
      </Container>
    </section>
  );
}
