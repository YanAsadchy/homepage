# Claude Code Prompt — Personal Website (GitBook-style)

## Project Overview

Build a personal academic portfolio website for **Yan Asadchy** — a strategic product designer and researcher based in Tallinn, Estonia. The site should closely follow the design language of **GitBook's published documentation sites** (https://gitbook.com/docs), adapted as a personal/portfolio website rather than a documentation platform.

**Tech stack**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, MDX for content pages. Deploy-ready for Vercel.

---

## Design Reference: GitBook Layout Patterns

Replicate these specific GitBook design elements:

### Layout Structure
1. **Fixed sidebar (left, ~280px)** with:
   - Logo/name at top with a small avatar or monogram
   - Collapsible navigation groups (e.g., "About", "Experience", "Research", "Projects", "Education")
   - Each nav item has a small icon (use Lucide icons) and label
   - Nested sub-pages within groups (indented, with chevron toggles)
   - Active page highlighted with accent color background pill
   - Sidebar scrolls independently from content

2. **Top header bar** with:
   - Translucent/blur backdrop effect (`backdrop-filter: blur`)
   - Search bar (can be a `⌘K` command palette style — use a modal)
   - Header links on the right: "LinkedIn", "Email", "CV Download" (as buttons: primary and secondary style)
   - Light/dark mode toggle (sun/moon icons)
   - Mobile: hamburger menu that slides sidebar in as overlay

3. **Main content area** with:
   - Breadcrumbs at the top (e.g., "Experience / Generait AI Solutions")
   - Page title with optional icon/emoji
   - "On this page" floating table of contents on the right (~200px, sticky, shows H2/H3 anchors, highlights current section on scroll)
   - Clean typography: serif or elegant sans-serif for headings, readable sans-serif for body
   - Max content width ~720px, centered within the main area
   - Previous/Next page navigation at the bottom of each page

4. **Footer** with:
   - Multi-column links (Contact, Social, Resources)
   - Small copyright line
   - Social icons (LinkedIn, GitHub, Email)

### Visual Style
- **Theme**: Clean, minimal, professional — similar to GitBook's "Docs" theme
- **Colors**: Use a tint color (suggest a deep blue or teal accent, `#2563EB` or similar) for active states, links, and highlights against a near-white background (`#FAFAFA` light / `#111` dark)
- **Dark mode**: Full dark mode support with automatic detection + manual toggle
- **Typography**: Use `font-display: swap`. Heading font: something distinctive but professional (e.g., "Instrument Serif" from Google Fonts or "Fraunces"). Body: "Source Sans 3" or "IBM Plex Sans". Monospace: "JetBrains Mono" for any code snippets
- **Borders**: Subtle 1px borders (`border-gray-200` / `border-gray-800`) separating sidebar, header, content
- **Corners**: Slightly rounded (6–8px for cards, 4px for buttons)
- **Spacing**: Generous whitespace, 32–48px section gaps
- **Transitions**: Smooth 200ms transitions on hover states, sidebar expand/collapse

---

## Content Structure & Pages

Create the following pages with content from the CV below. Each page should be an MDX file.

### Sidebar Navigation Tree:

```
📄 Welcome                          → /
├── 👤 About
│   ├── Summary                     → /about
│   └── Contact                     → /contact
├── 💼 Experience
│   ├── Generait AI Solutions       → /experience/generait
│   ├── MIT Media Lab               → /experience/mit
│   ├── University of Oulu          → /experience/oulu
│   ├── Affinity OU                 → /experience/affinity
│   └── CUDAN Open Lab              → /experience/cudan
├── 🔬 Research
│   ├── Cultural Data Analytics     → /research/cultural-data
│   ├── Publications                → /research/publications
│   └── Teaching                    → /research/teaching
├── 🛠️ Skills & Tools
│   ├── Design & Research           → /skills/design
│   ├── Data & Analytics            → /skills/data
│   └── Collaboration               → /skills/collaboration
├── 🎓 Education
│   ├── PhD (ABD) — Tallinn Uni     → /education/phd
│   ├── MSc — Tallinn Uni           → /education/msc
│   └── BSc — Belarus State TU      → /education/bsc
└── 📜 Certifications               → /certifications
```

### CV Content to Populate Pages:

**Summary / About page:**
Strategic product designer and researcher with 8+ years of experience delivering digital solutions across tech, healthcare, legal, and cultural sectors. At Generait, I designed a Microsoft Office legal-tech add-in that streamlined workflows by 20% and enabled €800/seat/week in billable time savings. At MIT Media Lab, I applied big data analysis of cellphone and geospatial data to analyse post-COVID cultural consumption recovery and potentially inform policies for recovery from global shocks. In the health sector, I designed and deployed a gamified health app now used in selected participating hospitals across Europe. In academia, I combined machine learning and data visualisation to research digital behaviour while teaching network science and ethnographic methods. As founder, I managed a cross-functional team and full product lifecycles, from discovery to delivery. I am experienced in stakeholder engagement, systems thinking, and translating complex requirements into user-centric solutions.

**Contact info:**
- Email: yan.asadchy@gmail.com
- Phone: +37256270701
- LinkedIn: https://www.linkedin.com/in/yan-asadchy/
- Location: Tallinn, Estonia

**Experience entries** (create a page for each):

1. **Generait AI Solutions Limited** — Dublin, IE
   - Role: Head of Design (August 2023 – September 2025)
   - Led product design and delivery for a legal-tech suite (Office Add-in + standalone app); coordinated roadmap with PM, Engineers and legal partners. Maintained the design system, assets and documentation in compliance with the secure software development framework ISO 27001:2022.

2. **MIT Media Lab, Human Dynamics Group** — Cambridge, US
   - Role: Research Intern (October 2022 – April 2023)
   - Analysed cellphone mobility data of around 4% of the population of the Greater Boston-Cambridge area. Investigated the recovery of human mobility and consumption of culture affected by the COVID-19 lockdown through visits to cultural venues such as Museums and Art Galleries.

3. **Digital Therapeutics Research Group, University of Oulu** — FI
   - Role: Product Designer (April 2022 – January 2023)
   - Designed a mobile app for patients with multiple sclerosis, focused on using gamification techniques to motivate reporting on daily tasks and energy levels and filling out health assessment forms.

4. **Affinity OU** — Tallinn, EE
   - Role: Founder (May 2021 – Current)
   - Owned product lifecycle for mobile app (discovery and release); recruited and led a 4-person team, published and sustained the mobile app on the App Store and Google Play.

5. **CUDAN Open Lab** — Tallinn, EE
   - Role: Junior Researcher (September 2019 – June 2023)
   - Data mining, analysis, and visualisation for social-media research; investigation of digital culture practices using machine learning and statistical methods.

**Skills:**
- Research & Design: Figma, Adobe Suite, interviews, user testing, A/B testing
- Data Analytics & Visualisation: Python (Pandas, NumPy, Matplotlib, Seaborn), VS Code, Jupyter Notebooks, Google Colab
- Collaboration & PM: Agile, stakeholder management, Jira, Confluence, Notion, Miro, Slack

**Education:**
- PhD (ABD) in Cultural Data Analytics — Tallinn University (2019–2025)
- MSc in Engineering (HCI) — Tallinn University (2017–2019)
- BSc in M/E Engineering — Belarus State Technological University (2008–2013)

**Certifications / Other:**
- Published author (Springer Nature and other academic journals)
- Teaching: design systems, Python visualisation, AI
- Google Design Sprint Course
- Interdisciplinary Methodologies in Linguistic Research
- Summer School on Deep Learning for Language Analysis
- UMA Digital Methods Winter School

---

## Technical Requirements

### Core Features
1. **MDX-based content** — Each page is an `.mdx` file in a `/content` directory. Parse frontmatter for title, description, icon, order.
2. **Search** — Client-side fuzzy search across all pages (use FlexSearch or similar). Triggered with `⌘K` / `Ctrl+K`. Modal with results showing page title + breadcrumb path.
3. **Dark/Light mode** — Use `next-themes`. Persist preference in localStorage. Auto-detect system preference on first visit.
4. **Responsive** — Sidebar collapses to hamburger on mobile (<768px). "On this page" TOC hides on tablet and below (<1024px).
5. **Scroll spy** — Highlight current section in the right-side TOC as user scrolls.
6. **Smooth transitions** — Page transitions, sidebar hover effects, theme toggle animation.
7. **SEO** — Proper `<head>` metadata, Open Graph tags, sitemap generation.
8. **CV Download** — A button in the header that downloads the CV as PDF (place a static PDF in `/public`).

### File Structure
```
├── app/
│   ├── layout.tsx          (root layout with sidebar + header + theme provider)
│   ├── page.tsx            (welcome/landing)
│   └── [...slug]/
│       └── page.tsx        (dynamic MDX page renderer)
├── components/
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── TableOfContents.tsx
│   ├── SearchModal.tsx
│   ├── Breadcrumbs.tsx
│   ├── PageNavigation.tsx  (prev/next)
│   ├── ThemeToggle.tsx
│   └── Footer.tsx
├── content/                (MDX files mirroring nav tree)
│   ├── index.mdx
│   ├── about/
│   │   ├── index.mdx
│   │   └── contact.mdx
│   ├── experience/
│   │   ├── generait.mdx
│   │   ├── mit.mdx
│   │   ├── oulu.mdx
│   │   ├── affinity.mdx
│   │   └── cudan.mdx
│   ├── research/
│   │   ├── cultural-data.mdx
│   │   ├── publications.mdx
│   │   └── teaching.mdx
│   ├── skills/
│   │   ├── design.mdx
│   │   ├── data.mdx
│   │   └── collaboration.mdx
│   ├── education/
│   │   ├── phd.mdx
│   │   ├── msc.mdx
│   │   └── bsc.mdx
│   └── certifications.mdx
├── lib/
│   ├── mdx.ts              (MDX parsing utilities)
│   ├── navigation.ts       (sidebar nav tree definition)
│   └── search.ts           (search index builder)
├── styles/
│   └── globals.css          (Tailwind + custom properties)
├── public/
│   └── yan-asadchy-cv.pdf
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

### Dependencies
```json
{
  "dependencies": {
    "next": "^14",
    "react": "^18",
    "next-themes": "latest",
    "next-mdx-remote": "latest",
    "gray-matter": "latest",
    "lucide-react": "latest",
    "flexsearch": "latest",
    "tailwindcss": "latest",
    "@tailwindcss/typography": "latest"
  }
}
```

---

## Implementation Notes

- The sidebar navigation tree should be defined as a TypeScript data structure in `lib/navigation.ts`, not auto-generated from the file system (to control ordering and icons).
- Use Tailwind's `prose` class (from `@tailwindcss/typography`) for MDX content styling, customized to match the GitBook aesthetic.
- The "On this page" TOC should be auto-generated from MDX headings at build time and use IntersectionObserver for scroll spy.
- All pages should have consistent frontmatter: `title`, `description`, `icon` (Lucide icon name), `order` (for sidebar sorting).
- Implement a custom MDX component set that includes styled callout/hint blocks (info, warning, success — like GitBook's hint blocks), code blocks with syntax highlighting, and image blocks with captions.

---

## What to Build First

1. Set up Next.js project with Tailwind, next-themes, and MDX pipeline
2. Build the layout shell: sidebar + header + content area + TOC + footer
3. Implement the navigation data structure and sidebar component
4. Create all MDX content pages with the CV data above
5. Add search, dark mode, scroll spy, and responsive behavior
6. Polish: animations, hover states, transitions, SEO metadata
