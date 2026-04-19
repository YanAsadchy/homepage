import { Info, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { ReactNode } from 'react';

// Callout/Hint components matching GitBook style
function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'success';
  children: ReactNode;
}) {
  const icons = {
    info: <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />,
    success: <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />,
  };

  return (
    <div className={`callout callout-${type} flex gap-3 not-prose`}>
      {icons[type]}
      <div className="flex-1">{children}</div>
    </div>
  );
}

// Image with caption
function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-6">
      <img
        src={src}
        alt={alt}
        className="rounded-lg border border-border w-full"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Skill badge
function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-accent-light text-accent mr-2 mb-2">
      {children}
    </span>
  );
}

// Timeline entry for experience
function TimelineEntry({
  date,
  title,
  subtitle,
  children,
}: {
  date: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative pl-6 pb-8 border-l-2 border-border last:border-l-0 last:pb-0">
      <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-accent" />
      <p className="text-xs text-muted-foreground font-medium mb-1">{date}</p>
      <h3 className="text-base font-semibold text-foreground mb-0.5">{title}</h3>
      {subtitle && (
        <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
      )}
      {children && <div className="text-sm text-foreground/80">{children}</div>}
    </div>
  );
}

function CTAButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose inline-flex items-center gap-1.5 px-3 py-3 rounded-md text-sm bg-accent text-black font-medium hover:opacity-90 transition-default no-underline"
    >
      {children}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}

function Tooltip({ term, description }: { term: string; description: string }) {
  return (
    <span className="not-prose relative inline-block group cursor-help">
      <span className="border-b border-dashed" style={{ borderColor: 'var(--accent)' }}>{term}</span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-56 px-3 py-2 rounded-lg border text-xs leading-relaxed font-normal text-left opacity-0 group-hover:opacity-100 pointer-events-none transition-default z-50 whitespace-normal"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border-color)',
          color: 'var(--muted-foreground)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
        {description}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: 'var(--border-color)' }} />
      </span>
    </span>
  );
}

export const mdxComponents = {
  Callout,
  Figure,
  Badge,
  TimelineEntry,
  CTAButton,
  Tooltip,
};
