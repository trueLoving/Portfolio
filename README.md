# Profiliuli

<div align="center">

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)
![pnpm](https://img.shields.io/badge/pnpm-10.18.3-orange.svg)
![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)

[中文文档](./README.zh-CN.md) | [English](#about)

</div>

---

## About

**Profiliuli** is a modern, interactive portfolio website with a macOS-inspired interface, featuring dynamic video backgrounds and bilingual language support.

This project is based on [macos-terminal-portfolio](https://github.com/aabdoo23/portfolio), built with Astro, React, and Tailwind CSS.

### 📛 Project Name: Profiliuli

**Name Origin**: The name "Profiliuli" is derived from **Profile** + **uli**, following the naming convention of other projects in the portfolio (Pixuli, Stationuli). The "uli" suffix creates a consistent brand identity across projects.

**Meaning**: 
- **Profile** represents a personal profile or professional portfolio, emphasizing the project's core purpose of showcasing personal competitiveness, skills, and achievements.
- The "uli" suffix maintains consistency with the existing project naming pattern, creating a cohesive brand identity.

**Pronunciation**: /ˈproʊfɪljuːli/

### 🎯 Core Features

- **macOS-style Interface**: Dock, toolbar, draggable windows, Notes app, GitHub project viewer
- **Dynamic Video Backgrounds**: Support for MP4 video wallpapers with automatic playback, loop, and mute
- **Bilingual Support**: Full English/Chinese language switching with i18n support
- **Spotlight Search**: Global search with fuzzy matching (Fuse.js), grouped results, and deep-linking
- **AI Terminal**: Chat endpoint powered by Groq
- **Contact Form**: In-app contact form modal that saves messages to Supabase Postgres
- **Admin Dashboard**: Dedicated `/admin` route with username/password login

### ✨ Enhancements

Based on the original project, this version adds the following features:

**1. Dynamic Video Background Support**

- Support for MP4 video files as wallpapers
- Automatic playback, loop, and mute
- Smooth transitions between backgrounds
- Fallback to static images if video fails to load
- Video files should be placed in `public/background/video/`

**2. Complete Internationalization**

- English/Chinese (Simplified) language switching (default: English)
- Language preference saved in localStorage
- All UI elements and content support both languages
- Configuration files organized by language: `src/config/en/` and `src/config/zh/`
- Easy to extend to additional languages

**3. Multi-language Configuration System**

- Configuration files organized by language directory (`src/config/en/` and `src/config/zh/`)
- Supports localization of personal info, education, experience, skills, etc.
- Unified configuration loader and React hooks

**4. Server-side Locale Inference (SEO follows language)**

- Server infers locale via: query (`?lang=` / `?locale=`) → cookie (`locale=`) → `Accept-Language`
- SEO/OG meta tags are generated from `getUserConfig(locale)` on the server

**5. Localized Resume PDFs**

- English: `/resume/resume-en.pdf`
- Chinese: `/resume/resume-zh.pdf`

## 🛠️ Tech Stack

- [Astro](https://astro.build/) — Content-focused web framework
- [React](https://reactjs.org/) — UI interactivity
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Vercel](https://vercel.com/) — Hosting and analytics
- [Supabase](https://supabase.com/) — Database and contact form storage
- [Groq](https://groq.com/) — AI terminal chat service

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/your-username/portfolio
cd portfolio
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in (see `.env.example` for detailed comments):

```env
# AI Terminal
GROQ_API_KEY=your_groq_api_key_here

# Site
PUBLIC_SITE_URL=https://your-domain.tld

# Supabase (server-only; do NOT expose in PUBLIC_ vars)
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin dashboard credentials (server-only)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change_me
```

### 4. Create Database Table

Run this SQL in the Supabase SQL editor:

```sql
create table if not exists public.contact_messages (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    name text not null,
    email text not null,
    message text not null,
    time_on_page int,
    ip text,
    user_agent text
);

-- Enable RLS and do NOT add anon policies (server-only access via service_role)
alter table public.contact_messages enable row level security;
```

### 5. Configure Personal Information

Configuration files are located in `src/config/` directory, organized by language:

**English Configuration** (`src/config/en/`):

- `personal.ts` — Personal information (name, role, location, website)
- `education.ts` — Education background
- `experience.ts` — Work experience
- `skills.ts` — Skills list
- `site.ts` — SEO and theme configuration
- `social.ts` — Social media links
- `contact.ts` — Contact information
- `projects.ts` — Project configuration
- `apps.ts` — Resume and Spotify configuration

**Chinese Configuration** (`src/config/zh/`):

- Same structure as English configuration, with Chinese translations

### 6. Add Background Resources

- **Static Images**: Place in `public/background/images/` directory
- **Video Files**: Place in `public/background/video/` directory (MP4 format)
- **Background config**: Manage available backgrounds in `src/config/background.ts` (no hardcoding in pages)

## 💻 Development

### Start Development Server

```bash
pnpm run dev
```

The development server will start at `http://localhost:4321`.

### Build for Production

```bash
pnpm run build
```

### Preview Production Build

```bash
pnpm run preview
```

## 🚀 Deployment

### Deploy to Vercel

#### Method 1: Using Vercel CLI (Recommended)

1. **Build the project**

```bash
pnpm run build
```

2. **Deploy to production**

```bash
npx vercel deploy --prod
```

Or deploy to preview first:

```bash
npx vercel deploy
```

Then select the deployment from the Vercel dashboard.

#### Method 2: Automatic Deployment via GitHub

1. Push code to GitHub
2. Connect the repository in Vercel
3. Configure environment variables (see below)
4. Vercel will deploy automatically

> **Note**: If GitHub auto-deployment has issues, use Method 1 (CLI deployment).

### Environment Variables

Configure in Vercel Project Settings → Environment Variables:

**Required Variables**:

- `PUBLIC_SITE_URL` — Production URL (e.g., `https://your-domain.tld`)
- `GROQ_API_KEY` — Groq API key (for AI Terminal)

**Optional Variables** (for contact form and admin dashboard):

- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key
- `ADMIN_USERNAME` — Admin dashboard username
- `ADMIN_PASSWORD` — Admin dashboard password

### Deployment Tips

- Ensure all environment variables are properly configured
- Check that `PUBLIC_SITE_URL` is correct, as this affects SEO and Open Graph links
- If using a custom domain, configure DNS records in Vercel

## 📁 Project Structure

```
├── src/
│   ├── components/      # React components
│   │   └── global/      # Global components (Dock, Toolbar, Spotlight, etc.)
│   ├── layouts/         # Astro/React layouts
│   ├── pages/           # Astro pages (includes API routes)
│   ├── config/          # Configuration files
│   │   ├── en/          # English configuration
│   │   ├── zh/          # Chinese configuration
│   │   ├── loader.ts    # Configuration loader
│   │   └── hooks.tsx    # React hooks
│   ├── i18n/            # Internationalization
│   │   ├── locales/     # Language files (en.json, zh-CN.json)
│   │   └── context.tsx   # i18n Context
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles
├── public/              # Public assets
│   └── background/      # Background resources (images and videos)
├── util/                # Utility scripts
└── astro.config.mjs     # Astro configuration
```

## ⌨️ Keyboard Shortcuts

- `Cmd/Ctrl + K` — Open Spotlight search
- `?` — Show shortcuts overlay
- `Ctrl/Cmd + ↑` or `F3` — Open Mission Control
- `Cmd/Ctrl + C` — Open Contact form

## 🔧 Configuration

### Multi-language Configuration

Configuration files are organized by language in `src/config/en/` and `src/config/zh/`:

- **Localized Content**: `personal.ts`, `education.ts`, `experience.ts`, `skills.ts`, `site.ts`, `apps.ts` (resume)
- **Non-localized Content**: `social.ts`, `contact.ts`, `projects.ts`, `spotify` (loaded from `src/config/en/` only)

### Using Configuration

**In React Components**:

```typescript
import { useUserConfig } from '../../config/hooks';

function MyComponent() {
  const userConfig = useUserConfig(); // Automatically loads config based on current language
  // ...
}
```

**In Astro Pages** (server-side, locale-aware):

```typescript
import { getUserConfig } from '../config/loader';
import { inferServerLocale } from '../i18n/server';

const url = new URL(Astro.request.url);
const locale = inferServerLocale({ request: Astro.request, url });
const config = getUserConfig(locale); // 'en' | 'zh-CN'
```

## 📝 Features

- ✅ macOS-style interface (Dock, toolbar, draggable windows)
- ✅ Dynamic video background support
- ✅ English/Chinese bilingual switching
- ✅ Spotlight global search
- ✅ Mission Control window management
- ✅ AI Terminal chat
- ✅ Contact form (Supabase storage)
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Accessibility support

## 📜 Acknowledgments

- **Original Project**: [macos-terminal-portfolio](https://github.com/aabdoo23/portfolio)
- **Original Author**: Johnny Culbreth (Austin, TX)
- **Modified by**: aabdoo23 (Giza, Egypt)
- **Enhanced by**: trueLoving - Added dynamic video backgrounds and bilingual language support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

[中文文档](README.zh-CN.md) | [English](#about)
