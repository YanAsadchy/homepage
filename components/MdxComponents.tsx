import { Info, AlertTriangle, CheckCircle } from 'lucide-react';
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

export const mdxComponents = {
  Callout,
  Figure,
  Badge,
  TimelineEntry,
};
