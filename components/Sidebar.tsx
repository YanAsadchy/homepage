'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { navigation, NavItem, NavGroup } from '@/lib/navigation';
import * as LucideIcons from 'lucide-react';

function getIcon(name: string, className: string = 'w-4 h-4') {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`
        flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-default
        ${depth > 0 ? 'ml-4' : ''}
        ${
          isActive
            ? 'bg-accent-light text-accent font-medium'
            : 'text-sidebar-foreground hover:bg-muted hover:text-foreground'
        }
      `}
    >
      {item.icon && (
        <span className={`flex-shrink-0 ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
          {getIcon(item.icon, 'w-4 h-4')}
        </span>
      )}
      <span className="truncate">{item.title}</span>
    </Link>
  );
}

function NavGroupComponent({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  const isChildActive = group.children.some((child) => pathname === child.href);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 w-full px-3 py-1.5 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-muted transition-default"
      >
        <span className="flex-shrink-0 text-muted-foreground">
          {group.icon && getIcon(group.icon, 'w-4 h-4')}
        </span>
        <span className="truncate flex-1 text-left">{group.title}</span>
        <ChevronRight
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-0.5 space-y-0.5">
          {group.children.map((child) => (
            <NavLink key={child.href} item={child} depth={1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[280px] bg-sidebar border-r border-border
          flex flex-col
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo / Name */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-black font-bold text-sm">
            YA
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground leading-tight">Yan Asadchy</h1>
            <p className="text-xs text-muted-foreground">Designer & Researcher</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 py-4 space-y-1">
          {navigation.map((item, index) => {
            if ('children' in item && item.children) {
              return <NavGroupComponent key={index} group={item as NavGroup} />;
            }
            return <NavLink key={index} item={item as NavItem} />;
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-5 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Yan Asadchy
          </p>
        </div>
      </aside>
    </>
  );
}
