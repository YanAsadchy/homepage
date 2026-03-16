import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PageMeta {
  title: string;
  description: string;
  icon?: string;
  order?: number;
  slug: string;
}

export interface PageData extends PageMeta {
  content: string;
  headings: { level: number; text: string; id: string }[];
}

function slugToFilePath(slug: string): string {
  if (slug === '' || slug === '/') {
    return path.join(contentDirectory, 'index.mdx');
  }

  const cleanSlug = slug.startsWith('/') ? slug.slice(1) : slug;

  // Try direct file first
  const directPath = path.join(contentDirectory, `${cleanSlug}.mdx`);
  if (fs.existsSync(directPath)) {
    return directPath;
  }

  // Try index file in directory
  const indexPath = path.join(contentDirectory, cleanSlug, 'index.mdx');
  if (fs.existsSync(indexPath)) {
    return indexPath;
  }

  return directPath; // fallback
}

export function getPageBySlug(slug: string): PageData | null {
  const filePath = slugToFilePath(slug);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Extract headings from markdown
  const headings = extractHeadings(content);

  return {
    title: data.title || '',
    description: data.description || '',
    icon: data.icon || undefined,
    order: data.order || 0,
    slug,
    content,
    headings,
  };
}

function extractHeadings(content: string): { level: number; text: string; id: string }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ level, text, id });
  }

  return headings;
}

export function getAllPages(): PageMeta[] {
  const pages: PageMeta[] = [];

  function walkDir(dir: string, basePath: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        walkDir(path.join(dir, entry.name), `${basePath}/${entry.name}`);
      } else if (entry.name.endsWith('.mdx')) {
        const filePath = path.join(dir, entry.name);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);

        let slug: string;
        if (entry.name === 'index.mdx') {
          slug = basePath || '/';
        } else {
          slug = `${basePath}/${entry.name.replace('.mdx', '')}`;
        }

        pages.push({
          title: data.title || '',
          description: data.description || '',
          icon: data.icon,
          order: data.order || 0,
          slug,
        });
      }
    }
  }

  walkDir(contentDirectory);
  return pages;
}
