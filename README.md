# Bug Refinery — Enterprise Monorepo

> **Beyond Theory • Industry-Simulation Platform**  
> Bridge the gap between your degree and your first real job with 26 industry-simulation labs.

---

## 🏗️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | **Next.js (App Router)** + **React 19** + **TypeScript** |
| **Styling** | **Tailwind CSS** + **shadcn/ui** |
| **Animations** | **Motion (Framer Motion)** + **GSAP** |
| **Backend** | **NestJS** + **Node.js 24** + **TypeScript** |
| **API** | **REST API** + **Swagger OpenAPI** (`/api/docs`) |
| **Database** | **Supabase PostgreSQL** |
| **ORM** | **Prisma** |
| **Validation** | **Zod** (frontend), **class-validator** (backend) |
| **Authentication** | **JWT** / **Supabase Auth** |
| **File Storage** | **Supabase Storage** |
| **Testing** | **Vitest** (frontend unit), **Jest** (backend unit/e2e), **Playwright** (browser e2e) |
| **CI/CD** | **GitHub Actions** (`.github/workflows/ci.yml`) |
| **Frontend Deployment** | **Vercel** (`vercel.json`) |
| **Backend Deployment** | **Render** (`render.yaml`, `backend/Dockerfile`) |
| **Package Manager** | **pnpm** (Monorepo workspaces) |

---

## 📁 Repository Structure

```
BugR/
├── frontend/                     # Next.js (App Router) + React + TypeScript
│   ├── app/
│   │   ├── layout.tsx            # Root layout with theme, fonts, Navbar & Footer
│   │   ├── page.tsx              # Liquid Glass Landing with Motion + GSAP
│   │   ├── labs/                 # Labs directory & dynamic [slug] lab routes
│   │   ├── about/                # About Bug Refinery & pedagogy
│   │   ├── companies/            # For Hiring Teams & Corporate Partners
│   │   ├── students/             # For CS Students & Graduates
│   │   ├── contact/              # Support & Inquiry
│   │   ├── signup/               # Cohort 30 Application
│   │   └── globals.css           # Tailwind + shadcn liquid glass styling
│   ├── components/
│   │   ├── ui/                   # Accessible shadcn/ui components
│   │   ├── landing/              # Hero, Terminal Sim, GapComparison, LabsCatalog
│   │   ├── animations/           # GSAP staggered reveal & Motion wrappers
│   │   ├── LeadForm.tsx          # Zod-validated enquiry form
│   │   ├── Navbar.tsx            # Liquid glass responsive navigation
│   │   └── Footer.tsx            # Footer navigation & discipline links
│   ├── data/                     # 26 industry-simulation labs data
│   ├── lib/                      # Zod schemas, cn utility, typed API client
│   ├── tests/                    # Vitest unit tests & Playwright e2e specs
│   ├── next.config.ts            # Next.js configuration & API rewrites
│   ├── tailwind.config.ts        # Tailwind configuration & design tokens
│   └── vitest.config.ts          # Vitest testing configuration
│
├── backend/                      # NestJS + Node.js + TypeScript
│   ├── src/
│   │   ├── main.ts               # Nest bootstrap, validation pipe & Swagger docs
│   │   ├── app.module.ts         # Root module configuration
│   │   ├── prisma/               # PrismaService connection handling
│   │   ├── leads/                # Lead capture, IP rate limiting & Turnstile
│   │   │   ├── dto/              # class-validator DTOs with Swagger annotations
│   │   │   ├── leads.controller.ts
│   │   │   └── leads.service.ts
│   │   ├── auth/                 # JWT authentication & Supabase Auth integration
│   │   ├── storage/              # Supabase Object Storage service
│   │   └── health/               # Health check endpoint (/api/health)
│   ├── prisma/
│   │   └── schema.prisma         # PostgreSQL schema (Leads, RateAttempts, Users, Docs)
│   ├── test/                     # Jest e2e test suite
│   ├── Dockerfile                # Production Docker container for Render
│   └── jest.config.js            # Jest testing configuration
│
├── .github/workflows/ci.yml      # GitHub Actions CI workflow
├── pnpm-workspace.yaml           # pnpm monorepo workspace definition
├── package.json                  # Root monorepo orchestration scripts
├── vercel.json                   # Vercel configuration for frontend
└── render.yaml                   # Render Blueprint configuration for backend
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v24.x or later
- **pnpm**: v12.x or later (`npm install -g pnpm`)

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Generate Prisma Client
```bash
pnpm prisma:generate
```

### 4. Run Development Servers
To run both frontend and backend concurrently:
```bash
pnpm dev
```
Or run each individually:
```bash
# Frontend (Next.js) on http://localhost:3000
pnpm dev:frontend

# Backend (NestJS) on http://localhost:4000 (Swagger at /api/docs)
pnpm dev:backend
```

---

## 🧪 Testing

```bash
# Run all unit tests (Jest for Backend + Vitest for Frontend)
pnpm test

# Run frontend Vitest tests only
pnpm test:frontend

# Run backend Jest tests only
pnpm test:backend

# Run browser end-to-end tests (Playwright)
pnpm test:e2e
```

---

## 📦 Production Build

```bash
# Build both frontend and backend
pnpm build

# Start production backend (Port 4000)
pnpm start:backend

# Start production frontend (Port 3000)
pnpm start
```

---

## 🌐 Endpoints

- **Frontend App:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:4000/api](http://localhost:4000/api)
- **Swagger Documentation:** [http://localhost:4000/api/docs](http://localhost:4000/api/docs)
- **Health Check:** [http://localhost:4000/api/health](http://localhost:4000/api/health)
