'use client';

import { Menu, Search, Linkedin, Mail, Download } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export default function Header({ onMenuClick, onSearchClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-14 border-b border-border bg-header backdrop-blur-md">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md hover:bg-muted transition-default md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Search trigger */}
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card hover:bg-muted transition-default text-sm text-muted-foreground"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-muted border border-border font-mono">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/yan-asadchy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-default"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:yan.asadchy@gmail.com"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-default"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>

          <a
            href="/yan-asadchy-cv.pdf"
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-accent text-black font-medium hover:opacity-90 transition-default"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download CV</span>
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
