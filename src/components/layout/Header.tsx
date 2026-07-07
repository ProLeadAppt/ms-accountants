"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site, nav } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled((window.scrollY || 0) > 80);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[9999] transition-colors duration-300",
        scrolled
          ? "border-b border-lines bg-cream/95 text-espresso backdrop-blur-md"
          : "text-cream",
      )}
    >
      <Container className="flex items-center justify-between py-5">
        <Link
          href="/"
          aria-label="MS Accountants — home"
          className={cn("transition-colors", scrolled && "text-brand-red")}
        >
          <Logo className="text-xl" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline font-sans text-base font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            href={site.contact.mobileHref}
            variant={scrolled ? "primary" : "secondary"}
            arrow={false}
            className="px-5 py-3 text-base"
          >
            Call {site.contact.mobile}
          </Button>
        </div>

        <button
          type="button"
          className="relative z-[10000] inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Icon name="menu" />
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="scheme-espresso fixed inset-0 z-[10000] md:hidden">
          <Container className="flex items-center justify-between py-5">
            <Logo className="text-xl text-cream" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <Icon name="close" />
            </button>
          </Container>
          <nav className="flex flex-col gap-7 px-8 pt-14">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-4xl"
              >
                {item.label}
              </Link>
            ))}
            <Button
              href={site.contact.mobileHref}
              arrow={false}
              className="mt-6 self-start"
              onClick={() => setOpen(false)}
            >
              Call {site.contact.mobile}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
