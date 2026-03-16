import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <FileQuestion className="w-16 h-16 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-heading text-foreground mb-3">Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-black hover:opacity-90 transition-default text-sm font-medium"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
