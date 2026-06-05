import Link from "next/link";

export function Logo({ className = "" }: { className?: string; onBoard?: boolean }) {
  return (
    <Link href="/" className={`group inline-flex items-center ${className}`}>
      <span className="text-xl font-bold tracking-tight text-foreground">
        hyroo<span className="text-primary transition-colors group-hover:text-primary/80">.</span>
      </span>
    </Link>
  );
}
