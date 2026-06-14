import React from "react";
import Link from "next/link";
import {
  ArrowRight, Search, Star, FileText, Users, ScrollText, Lock,
  Scale, Handshake, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

interface HeroSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryButtonText?: string;
  primaryButtonIcon?: React.ReactNode;
  primaryHref?: string;
  secondaryButtonText?: string;
  secondaryHref?: string;
  showMockups?: boolean;
  logoComponent?: React.ReactNode;
  brandName?: string;
}

const FEATURES = [
  { name: "Contracts", color: "bg-indigo-500", Icon: Users },
  { name: "Policies", color: "bg-emerald-500", Icon: ScrollText },
  { name: "NDA", color: "bg-violet-500", Icon: Lock },
  { name: "POSH", color: "bg-rose-500", Icon: Scale },
  { name: "Consultant", color: "bg-amber-500", Icon: Handshake },
  { name: "Vendor", color: "bg-sky-500", Icon: Globe },
];

export function HeroSection({
  eyebrow = "Built for first-time Indian founders",
  title = (
    <>
      Every paperwork you need to{" "}
      <span className="bg-gradient-to-b from-foreground via-foreground to-foreground/40 bg-clip-text text-transparent">

        start your business.
      </span>
    </>
  ),
  description = "Are you starting a new business? Hyroo helps you get started by taking the irrelevant things off your plate. It generates a complete kit of editable, India-ready documents like offer letters, NDAs, the POSH policy and more. One flat price of ₹499.",
  primaryButtonText = "Build my kit · ₹499",
  primaryButtonIcon = <ArrowRight size={20} />,
  primaryHref = "/generate",
  secondaryButtonText = "See what's inside",
  secondaryHref = "#documents",
  showMockups = true,
  logoComponent,
  brandName = "Hyroo",
}: HeroSectionProps) {
  return (
    <div className="relative flex min-h-screen flex-col place-items-center gap-12 overflow-hidden bg-gradient-to-br from-background to-muted/20 px-4 pb-20 pt-28 md:px-8 md:pt-36 lg:flex-row lg:gap-20 lg:px-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-warm" />

      {/* Left - copy */}
      <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center lg:mx-0 lg:text-left">
        <Reveal delay={0}>
          {eyebrow ? (
            <span className="chip mx-auto lg:mx-0">
              <Star className="h-3.5 w-3.5 text-primary" /> {eyebrow}
            </span>
          ) : null}
        </Reveal>
        <Reveal delay={90}>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto max-w-lg text-lg font-light leading-relaxed text-muted-foreground sm:text-xl lg:mx-0">
            {description}
          </p>
        </Reveal>
        <Reveal delay={270}>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full px-8 text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <Link href={primaryHref}>
                {primaryButtonText}
                {primaryButtonIcon}
              </Link>
            </Button>
            {secondaryButtonText ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-border bg-foreground/[0.04] px-8 text-base font-semibold text-foreground hover:bg-foreground/[0.08] hover:text-foreground"
              >
                <Link href={secondaryHref}>{secondaryButtonText}</Link>
              </Button>
            ) : null}
          </div>
        </Reveal>
      </div>

      {/* Right - product mockups */}
      {showMockups && (
        <Reveal delay={200} className="relative z-10 mx-auto mt-8 w-full max-w-md lg:mt-0">
          {/* Application window (in-flow on mobile, tilted on desktop) */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-transform duration-300 lg:rotate-2 lg:hover:rotate-1">
            {/* Window header */}
            <div className="border-b border-border bg-muted/40 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="mx-6 flex-1">
                  <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
                    <Search className="h-3.5 w-3.5" /> Search documents
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <Star className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Window content */}
            <div className="min-h-[320px] bg-card p-8">
              <div className="mb-8 flex items-center space-x-3">
                {logoComponent || (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg">
                    <FileText className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
                <span className="text-lg font-semibold text-foreground">{brandName}</span>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="font-medium text-muted-foreground">Your document kit</h3>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-3/4 rounded-full bg-primary" />
                  </div>
                </div>

                {/* Document category grid */}
                <div className="grid grid-cols-3 gap-4">
                  {FEATURES.map(({ name, color, Icon }) => (
                    <div key={name} className="group flex cursor-pointer flex-col items-center space-y-2">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} shadow-md transition-transform duration-200 group-hover:scale-110`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-center text-xs font-medium text-muted-foreground">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stacked windows behind - large screens only */}
          <div className="absolute -left-4 -top-4 -z-10 hidden h-full w-full rotate-6 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-xl lg:block" />
          <div className="absolute -left-8 -top-8 -z-20 hidden h-full w-full rotate-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-xl lg:block" />

          {/* Phone mockup - large screens only */}
          <div className="absolute hidden h-80 w-44 -rotate-12 rounded-[2.5rem] bg-slate-900 p-2 shadow-2xl transition-transform duration-300 hover:-rotate-6 lg:-bottom-12 lg:-right-10 lg:block">
            <div className="h-full w-full overflow-hidden rounded-[2rem] border border-border bg-card">
              {/* Phone status bar */}
              <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-3 text-xs">
                <span className="font-semibold text-foreground">9:41</span>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-4 rounded-sm bg-green-500" />
                  <span className="font-medium text-muted-foreground">100%</span>
                </div>
              </div>

              {/* Phone content */}
              <div className="space-y-6 p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary shadow-md">
                    <FileText className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{brandName}</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-xl ${i % 4 === 0 ? "bg-primary/30" : "bg-muted"} transition-colors hover:bg-muted/70`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
