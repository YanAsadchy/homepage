export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface NavGroup {
  title: string;
  icon: string;
  href?: string;
  children: NavItem[];
}

export const navigation: (NavItem | NavGroup)[] = [
  {
    title: 'Welcome',
    href: '/',
    icon: 'FileText',
  },
  {
    title: 'About',
    icon: 'User',
    children: [
      { title: 'Summary', href: '/about', icon: 'User' },
      { title: 'Cultural Data Analytics', href: '/about/cultural-data', icon: 'Database' },
      { title: 'Publications', href: '/about/publications', icon: 'BookOpen' },
    ],
  },
  {
    title: 'Teaching',
    icon: 'FlaskConical',
    children: [
      { title: 'Data Visualisation', href: '/teaching/data-visualisation', icon: 'ChartBar' },
      { title: 'Design Systems', href: '/teaching/design-systems', icon: 'Paintbrush' },
    ],
  },
  {
    title: 'Contact',
    href: '/contacts',
    icon: 'ScrollText',
  },
];

// Flatten all nav items for search and prev/next navigation
export function flattenNav(items: (NavItem | NavGroup)[]): NavItem[] {
  const result: NavItem[] = [];
  for (const item of items) {
    if ('href' in item && item.href) {
      result.push(item as NavItem);
    }
    if ('children' in item && item.children) {
      result.push(...flattenNav(item.children));
    }
  }
  return result;
}

// Get previous and next pages for navigation
export function getPrevNext(currentPath: string): { prev: NavItem | null; next: NavItem | null } {
  const flat = flattenNav(navigation);
  const index = flat.findIndex((item) => item.href === currentPath);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

// Get breadcrumb trail for a given path
export function getBreadcrumbs(path: string): { title: string; href: string }[] {
  const crumbs: { title: string; href: string }[] = [];

  for (const item of navigation) {
    if ('href' in item && item.href === path) {
      crumbs.push({ title: item.title, href: item.href });
      return crumbs;
    }
    if ('children' in item && item.children) {
      for (const child of item.children) {
        if (child.href === path) {
          crumbs.push({ title: item.title, href: child.href });
          crumbs.push({ title: child.title, href: child.href });
          return crumbs;
        }
      }
    }
  }

  return crumbs;
}
