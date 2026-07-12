import Link from "next/link";
import { Badge, Separator } from "@velora/core";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageMeta {
  title: string;
  href: string;
}

interface DocsPageHeaderProps {
  title: string;
  description: string;
  badges?: string[];
}

interface DocsPageNavProps {
  prev?: PageMeta;
  next?: PageMeta;
}

export function DocsPageHeader({ title, description, badges }: DocsPageHeaderProps) {
  return (
    <div className="mb-8">
      {badges && badges.length > 0 && (
        <div className="mb-3 flex gap-2">
          {badges.map((b) => (
            <Badge key={b} variant="secondary" size="sm">
              {b}
            </Badge>
          ))}
        </div>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-[var(--velora-text-primary)] sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-lg text-[var(--velora-text-tertiary)] leading-relaxed max-w-2xl">
        {description}
      </p>
      <Separator className="mt-8" />
    </div>
  );
}

export function DocsPageNav({ prev, next }: DocsPageNavProps) {
  return (
    <>
      <Separator className="mt-16 mb-8" />
      <nav className="flex items-center justify-between gap-4 pb-12" aria-label="Page navigation">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex items-center gap-2 rounded-[var(--velora-radius-lg)] border border-[var(--velora-border-base)] px-4 py-3 text-sm transition-colors hover:border-[var(--velora-border-brand)] hover:bg-[var(--velora-bg-subtle)]"
          >
            <ChevronLeft className="h-4 w-4 text-[var(--velora-text-tertiary)] transition-transform group-hover:-translate-x-0.5 group-hover:text-[var(--velora-text-brand)]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--velora-text-tertiary)]">
                Previous
              </span>
              <span className="font-medium text-[var(--velora-text-primary)]">
                {prev.title}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={next.href}
            className="group flex items-center gap-2 rounded-[var(--velora-radius-lg)] border border-[var(--velora-border-base)] px-4 py-3 text-right text-sm transition-colors hover:border-[var(--velora-border-brand)] hover:bg-[var(--velora-bg-subtle)]"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--velora-text-tertiary)]">
                Next
              </span>
              <span className="font-medium text-[var(--velora-text-primary)]">
                {next.title}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-[var(--velora-text-tertiary)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--velora-text-brand)]" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </>
  );
}

export function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-[var(--velora-text-primary)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function DocCodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-[var(--velora-radius-lg)] border border-[var(--velora-border-base)]">
      {title && (
        <div className="border-b border-[var(--velora-border-muted)] bg-[var(--velora-bg-subtle)] px-4 py-2">
          <span className="text-xs font-medium text-[var(--velora-text-tertiary)]">{title}</span>
        </div>
      )}
      <pre className="overflow-auto p-4 text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
