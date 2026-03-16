# CLAUDE.md — Project Instructions

## Goal
Build a personal academic portfolio website for Yan Asadchy (product designer & researcher, Tallinn, Estonia). The design must closely replicate **GitBook's published documentation** layout (https://gitbook.com/docs) — adapted as a personal site, not a docs platform.

## Tech Stack
- Next.js 14+ (App Router), TypeScript, Tailwind CSS, MDX content
- `next-themes` for dark/light mode, `next-mdx-remote` for MDX, `lucide-react` for icons, `flexsearch` for search
- Deploy target: Vercel

## Design Specification

### Layout (replicate GitBook exactly)
- **Left sidebar (~280px, fixed)**: collapsible nav groups with Lucide icons, nested pages, active state pill highlight, independent scroll
- **Top header**: translucent blur backdrop, ⌘K search trigger, "LinkedIn" / "Email" / "Download CV" buttons, dark/light toggle
- **Content area**: breadcrumbs, page title with icon, max-width ~720px centered, prev/next navigation at bottom
- **Right TOC (~200px, sticky)**: auto-generated "On this page" from H2/H3, scroll spy with IntersectionObserver
- **Footer**: multi-column links, social icons, copyright

### Visual Style
- Theme: clean, professional, minimal (GitBook "Docs" aesthetic)
- Accent color: deep blue `#2563EB` (configurable via CSS variable)
- Light bg: `#FAFAFA`, Dark bg: `#111`
- Typography: distinctive heading font (e.g. "Instrument Serif"), clean body font (e.g. "Source Sans 3"), mono "JetBrains Mono"
- Subtle 1px borders, 6-8px corner radius, generous whitespace
- Smooth 200ms transitions on all interactive elements
- Full dark mode with system auto-detect + manual toggle

### Responsive
- < 768px: sidebar → hamburger overlay
- < 1024px: right TOC hidden
- Header adapts gracefully

## Navigation Tree

```
📄 Welcome                          → /
├── 👤 About                         → /about
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

## File Structure

```
app/layout.tsx, app/page.tsx, app/[...slug]/page.tsx
components/{Sidebar,Header,TableOfContents,SearchModal,Breadcrumbs,PageNavigation,ThemeToggle,Footer}.tsx
content/{index,about/index,about/contact,experience/*,research/*,skills/*,education/*,certifications}.mdx
lib/{mdx,navigation,search}.ts
styles/globals.css
public/yan-asadchy-cv.pdf
```

## Content Source

All page content comes from the CV of Yan Asadchy. Each MDX file has frontmatter: `title`, `description`, `icon` (Lucide name), `order`.

### Key CV Data

**Summary**: Strategic product designer and researcher, 8+ years experience across tech, healthcare, legal, cultural sectors. Designed legal-tech add-in at Generait (20% workflow improvement, €800/seat/week savings). MIT Media Lab research on post-COVID cultural mobility. Gamified health app for hospitals across Europe. ML + data viz research at CUDAN. Founded Affinity OU.

**Contact**: yan.asadchy@gmail.com | +37256270701 | LinkedIn: /in/yan-asadchy/ | Tallinn, Estonia

**Experience**:
1. Generait AI Solutions (Head of Design, Aug 2023–Sep 2025, Dublin) — Legal-tech suite, design system, ISO 27001:2022
2. MIT Media Lab (Research Intern, Oct 2022–Apr 2023, Cambridge) — Cellphone mobility data, cultural consumption recovery
3. Uni of Oulu (Product Designer, Apr 2022–Jan 2023) — Gamified MS patient health app
4. Affinity OU (Founder, May 2021–present, Tallinn) — Mobile app lifecycle, 4-person team
5. CUDAN Open Lab (Junior Researcher, Sep 2019–Jun 2023, Tallinn) — Data mining, ML, social media research

**Skills**: Figma, Adobe Suite, user testing, A/B testing, Python (Pandas, NumPy, Matplotlib, Seaborn), Jupyter, Agile, Jira, Confluence, Notion, Miro

**Education**: PhD ABD Cultural Data Analytics (Tallinn Uni, 2019–2025), MSc HCI (Tallinn Uni, 2017–2019), BSc M/E Engineering (Belarus State TU, 2008–2013)

**Certifications**: Published author (Springer Nature), Teaching (design systems, Python viz, AI), Google Design Sprint, Deep Learning for NLP summer school, UMA Digital Methods winter school

## Implementation Priorities

1. Project setup (Next.js + Tailwind + MDX pipeline + themes)
2. Layout shell (sidebar + header + content + TOC + footer)
3. Navigation data structure + sidebar component
4. All MDX content pages populated from CV
5. Search (⌘K modal with FlexSearch), dark mode, scroll spy, responsive
6. Polish: animations, SEO meta, Open Graph tags

## Custom MDX Components

Include styled hint/callout blocks (info, warning, success) matching GitBook's style, syntax-highlighted code blocks, and image blocks with captions. Use Tailwind's `@tailwindcss/typography` prose classes customized to match the aesthetic.
