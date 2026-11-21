export interface ServiceCapability {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  valueProposition: string;
  businessOutcomes: string[];
  capabilities: ServiceCapability[];
  problemSolved: string;
  solutionApproach: string;
  deliverables: string[];
  techStack: string[];
  faqs: ServiceFAQ[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'custom-software',
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    category: 'Engineering',
    shortDesc: 'Scalable, fault-tolerant enterprise software, distributed architectures, and bespoke business systems tailored to your workflows.',
    valueProposition: 'Eliminate operational bottlenecks and legacy technical debt with purpose-built software architectures engineered for 99.99% reliability and multi-million user scale.',
    businessOutcomes: [
      'Accelerate business process velocity by up to 65%',
      'Eliminate recurring licensing overhead of rigid off-the-shelf software',
      'Unified data exchange across distributed legacy platforms and third-party APIs',
      'Future-proof architectural foundation prepared for horizontal cloud scaling',
    ],
    capabilities: [
      {
        title: 'Enterprise Business Applications',
        description: 'End-to-end ERP, CRM, inventory logistics, and operational execution systems engineered for high transaction volume.',
      },
      {
        title: 'Microservices & Event-Driven Systems',
        description: 'Decoupled, resilient microservice ecosystems leveraging Apache Kafka, RabbitMQ, and gRPC for sub-millisecond inter-service communication.',
      },
      {
        title: 'SaaS Multi-Tenant Platforms',
        description: 'Multi-tenant cloud architecture with row-level security, isolated schema partitioning, usage-based billing, and self-service administration.',
      },
      {
        title: 'High-Throughput API Gateways',
        description: 'RESTful, GraphQL, and WebSocket APIs designed with granular rate limiting, OAuth2/OIDC token verification, and automated OpenAPI documentation.',
      },
    ],
    problemSolved: 'Growing companies frequently hit wall-sized limits with disjointed commercial SaaS tools, fragile spreadsheets, or legacy monoliths that crash under peak transaction loads and cannot integrate with modern cloud services.',
    solutionApproach: 'We analyze your underlying domain models, document data flows, and architect modular domain-driven services (DDD). We write clean, test-driven code (TDD) backed by automated CI/CD pipelines, containerization, and comprehensive telemetry.',
    deliverables: [
      'Production-ready codebase with >85% automated test coverage',
      'Fully documented OpenAPI/Swagger specifications and SDKs',
      'Infrastructure as Code (Terraform/Docker/Kubernetes manifests)',
      'Automated deployment pipelines and zero-downtime rolling release configuration',
      'Architectural blueprint, ER diagrams, and comprehensive runbooks',
    ],
    techStack: ['Node.js', 'TypeScript', 'Python', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'Kafka', 'GraphQL'],
    faqs: [
      {
        question: 'How do you handle IP ownership and source code licensing?',
        answer: 'You own 100% of the intellectual property, source code, repositories, and deployment configurations from Day 1 upon invoice milestone settlement.',
      },
      {
        question: 'Can you integrate with our existing legacy database or internal APIs?',
        answer: 'Yes. We specialize in zero-downtime brownfield modernization, creating resilient abstraction layers, strangler-fig pattern migrations, and bi-directional synchronizers.',
      },
      {
        question: 'What is the typical team structure for a custom development project?',
        answer: 'A dedicated cross-functional squad comprising a Lead Solutions Architect, Senior Full-Stack Engineers, QA Automation Engineer, and a Technical Project Manager.',
      },
    ],
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Website & Web Application Development',
    category: 'Digital Experience',
    shortDesc: 'High-performance, secure, responsive web applications and corporate digital platforms engineered with modern frontend frameworks.',
    valueProposition: 'Turn web visitors into enterprise pipeline with blazing fast Core Web Vitals, accessible UX, and headless content architecture.',
    businessOutcomes: [
      'Sub-second page load speeds delivering higher search engine rankings and lower bounce rates',
      'Flawless cross-device responsiveness from mobile screens to ultra-wide displays',
      'Enterprise-grade security preventing XSS, CSRF, and injection vulnerabilities',
      'Empowered marketing and content teams via headless CMS workflows',
    ],
    capabilities: [
      {
        title: 'Next.js & React Applications',
        description: 'Modern server-side rendered (SSR) and statically generated (SSG) web applications with instant client transitions and Edge runtime delivery.',
      },
      {
        title: 'Corporate & Brand Flagships',
        description: 'Bespoke corporate digital experiences with subtle technical animations, liquid glass aesthetics, and accessible WCAG 2.1 AA compliance.',
      },
      {
        title: 'Headless E-Commerce Solutions',
        description: 'Custom commerce store fronts integrated with Shopify Plus, Medusa, or Stripe with sub-second checkout latency.',
      },
      {
        title: 'Progressive Web Apps (PWA)',
        description: 'Offline-capable, installable web experiences with service workers, background sync, and push notification triggers.',
      },
    ],
    problemSolved: 'Websites built on bloated monolithic themes or outdated frameworks suffer from sluggish performance, poor mobile UX, high bounce rates, and vulnerability to automated exploits.',
    solutionApproach: 'We build with modern component-driven architectures (Next.js, Tailwind CSS, TypeScript), implementing automated Lighthouse performance audits, image optimization CDNs, and structured semantic HTML.',
    deliverables: [
      'Full Next.js / TypeScript web application source code',
      'Lighthouse score benchmarks (90+ on Performance, Accessibility, SEO, Best Practices)',
      'CMS schema integration (Sanity, Strapi, or headless Supabase)',
      'Global edge deployment configuration on Vercel or AWS CloudFront',
      'Automated accessibility and visual regression test suites',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Vercel', 'PostgreSQL'],
    faqs: [
      {
        question: 'Do you ensure accessibility (WCAG) compliance?',
        answer: 'Yes. All interactive elements, forms, and contrast ratios meet or exceed WCAG 2.1 AA accessibility guidelines, with full keyboard navigation support.',
      },
      {
        question: 'How do you handle SEO and structured schema markup?',
        answer: 'We implement semantic HTML5, dynamic Open Graph and Twitter metadata, JSON-LD structured schema for organizations and services, canonical tags, and dynamic sitemaps.',
      },
    ],
  },
  {
    id: 'mobile-app',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    category: 'Mobile',
    shortDesc: 'Native and high-performance cross-platform mobile apps for iOS and Android with offline-first architectures.',
    valueProposition: 'Deliver frictionless native mobile experiences that engage users on the go with real-time biometric security, hardware sensor integration, and push notifications.',
    businessOutcomes: [
      'Single cross-platform codebase cutting development and maintenance costs by 40%',
      'High app store ratings through 60fps smooth UI rendering and offline resilience',
      'Direct customer re-engagement via segmented push notification infrastructure',
      'Compliant app store submission and continuous OTA (over-the-air) update release cycles',
    ],
    capabilities: [
      {
        title: 'Cross-Platform React Native & Flutter',
        description: 'Near-native performance on both iOS and Android with maximum code reuse and native bridge modules.',
      },
      {
        title: 'Offline-First Data Sync',
        description: 'Local SQLite/WatermelonDB storage with conflict-free replicated data types (CRDTs) for offline workflow completion.',
      },
      {
        title: 'Device Hardware & Biometric Integration',
        description: 'Secure FaceID/Fingerprint authentication, GPS geofencing, camera capture, BLE peripheral connection, and accelerometer sensors.',
      },
      {
        title: 'App Store Optimization & Deployment',
        description: 'Apple App Store and Google Play Console release management, TestFlight distribution, and automated Fastlane pipelines.',
      },
    ],
    problemSolved: 'Poorly constructed mobile apps crash under intermittent mobile network coverage, drain device battery, and get rejected during strict App Store review guidelines.',
    solutionApproach: 'We build using audited cross-platform and native toolchains, strict type safety, memory leak profiling, background task scheduling, and automated end-to-end device testing.',
    deliverables: [
      'iOS (.ipa) and Android (.aab) release bundles',
      'Fastlane automated continuous deployment scripts',
      'Push notification server integration (Firebase FCM / APNs)',
      'App Store and Play Store review compliance documentation',
    ],
    techStack: ['React Native', 'Flutter', 'TypeScript', 'iOS Swift', 'Android Kotlin', 'SQLite', 'Firebase', 'Fastlane'],
    faqs: [
      {
        question: 'Should we build cross-platform or separate native apps?',
        answer: 'For 90% of business and consumer applications, modern React Native or Flutter provides identical 60fps native feel with half the maintenance overhead. We advise native Swift/Kotlin when deep low-level OS kernel or specialized hardware compute is mandatory.',
      },
    ],
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    title: 'Cloud & DevOps Engineering',
    category: 'Infrastructure',
    shortDesc: 'Reliable cloud infrastructure, automated CI/CD pipelines, container orchestration, and multi-region high availability on AWS, Azure, and GCP.',
    valueProposition: 'Transform deployment from a stressful quarterly fire drill into an automated non-event that happens multiple times a day with zero downtime.',
    businessOutcomes: [
      'Reduce cloud infrastructure spend by 25–40% via rightsizing and serverless architectures',
      'Zero-downtime blue/green or canary rolling software releases',
      'Instant automated disaster recovery and point-in-time database backups',
      'Real-time observability across distributed traces, metrics, and logs',
    ],
    capabilities: [
      {
        title: 'Infrastructure as Code (IaC)',
        description: 'Declarative, version-controlled cloud environments provisioned via Terraform, OpenTofu, and AWS CDK.',
      },
      {
        title: 'Kubernetes & Container Orchestration',
        description: 'Production-hardened EKS/GKE cluster architecture with horizontal pod autoscaling, service meshes, and ingress controllers.',
      },
      {
        title: 'CI/CD Pipeline Automation',
        description: 'High-speed GitHub Actions, GitLab CI, and ArgoCD GitOps pipelines executing security scans, automated tests, and container builds.',
      },
      {
        title: 'Observability & Incident Management',
        description: 'Prometheus, Grafana, Datadog, and OpenTelemetry instrumentation with actionable alert thresholds and automated runbook triggers.',
      },
    ],
    problemSolved: 'Teams hindered by manual server configuration, snowflake environments, opaque AWS bills, unmonitored production outages, and fear of deploying new code.',
    solutionApproach: 'We audit existing architecture, codify infrastructure in Terraform, configure immutable container registries, and set up continuous automated testing and deployment gates.',
    deliverables: [
      'Terraform repository with modular staging/production environments',
      'Multi-stage CI/CD pipeline definitions with vulnerability gating',
      'Grafana dashboards for latency, error rates, saturation, and traffic (Google SRE Golden Signals)',
      'Backup verification runbooks and incident response playbooks',
    ],
    techStack: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Docker', 'GitHub Actions', 'Prometheus', 'Grafana'],
    faqs: [
      {
        question: 'Can you help us migrate our on-premise servers to AWS or Azure?',
        answer: 'Yes. We plan phased lift-and-shift or containerized migrations with direct database replication, ensuring continuous business operations during cutover.',
      },
    ],
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI & Workflow Automation',
    category: 'Intelligent Systems',
    shortDesc: 'Agentic AI workflows, LLM application integration, automated document processing, and proprietary Retrieval-Augmented Generation (RAG) pipelines.',
    valueProposition: 'Automate repetitive cognitive work, extract structured value from unstructured enterprise documents, and give your software real contextual intelligence.',
    businessOutcomes: [
      'Cut document processing and invoice reconciliation time by up to 80%',
      '24/7 intelligent customer inquiry resolution with verified domain grounding',
      'Zero hallucination risk through strict deterministic RAG guardrails',
      'Private deployment protecting sensitive enterprise IP and client confidentiality',
    ],
    capabilities: [
      {
        title: 'Retrieval-Augmented Generation (RAG)',
        description: 'Vector database search (Pinecone, pgvector) with hybrid lexical-semantic indexing and reranking over internal knowledge bases.',
      },
      {
        title: 'Autonomous AI Agents',
        description: 'Multi-step reasoning agents that execute structured tool calls, query internal databases, and trigger business workflow actions.',
      },
      {
        title: 'Document & OCR Intelligence',
        description: 'Automated data extraction from PDFs, contracts, invoices, and hand-filled forms into structured JSON payloads.',
      },
      {
        title: 'Private LLM Fine-Tuning & Self-Hosting',
        description: 'On-premise or VPC deployment of open-weights models (Llama 3, Mistral, DeepSeek) ensuring zero data leakage.',
      },
    ],
    problemSolved: 'Enterprises drown in repetitive manual text processing, customer support queues, and unstructured PDFs, while generic public AI models pose severe privacy and hallucination liabilities.',
    solutionApproach: 'We build deterministic AI pipelines with strict input validation, semantic guardrails, vector embeddings, and evaluation benchmarks that verify accuracy before production rollout.',
    deliverables: [
      'Production-ready RAG application with vector search and caching',
      'Evaluations harness measuring hallucination rate, retrieval recall, and latency',
      'Enterprise role-based access control (RBAC) over AI outputs',
      'Comprehensive data privacy and anonymization middleware',
    ],
    techStack: ['Python', 'LangChain', 'LlamaIndex', 'pgvector', 'OpenAI', 'Gemini API', 'FastAPI', 'Hugging Face'],
    faqs: [
      {
        question: 'Will our proprietary company data be used to train public AI models?',
        answer: 'Never. We deploy zero-data-retention enterprise API endpoints or self-hosted models in your private cloud, ensuring your proprietary data never leaves your perimeter.',
      },
    ],
  },
  {
    id: 'cybersecurity-qa',
    slug: 'cybersecurity-qa',
    title: 'Cybersecurity & Quality Assurance',
    category: 'Security & Quality',
    shortDesc: 'Rigorous penetration testing, secure code review, vulnerability assessment, and automated software test frameworks.',
    valueProposition: 'Harden your digital assets against ransomware, unauthorized breaches, and expensive production downtime before malicious actors find vulnerabilities.',
    businessOutcomes: [
      'Comprehensive OWASP Top 10 vulnerability remediation',
      'Confidently pass vendor risk assessments, SOC 2, and ISO 27001 technical audits',
      'Eliminate regression bugs before code reaches production environments',
      'Continuous automated security gating in everyday development sprints',
    ],
    capabilities: [
      {
        title: 'Web & API Penetration Testing',
        description: 'Simulated threat actor testing covering authentication bypasses, broken object level authorization (BOLA), and injection flaws.',
      },
      {
        title: 'Static & Dynamic Code Audits (SAST / DAST)',
        description: 'Automated static code scanning and dependency vulnerability monitoring (Snyk, Semgrep, Trivy) embedded into Git pull requests.',
      },
      {
        title: 'Automated End-to-End QA Testing',
        description: 'Playwright and Cypress automation suites testing cross-browser user journeys, network fault tolerance, and data assertions.',
      },
      {
        title: 'Cloud Security Posture Management',
        description: 'IAM least-privilege auditing, S3 bucket encryption verification, and security group firewall hardening across AWS/Azure.',
      },
    ],
    problemSolved: 'Companies launch untested features under tight deadlines, leaving silent vulnerabilities, brittle edge-case failures, and unmonitored security blind spots that invite catastrophic data breaches.',
    solutionApproach: 'We conduct ethical hacking assessments, prioritize remediation by Common Vulnerability Scoring System (CVSS) severity, and write automated test harnesses that make regressions impossible.',
    deliverables: [
      'Executive vulnerability report with CVSS scoring and business risk impact',
      'Engineering remediation guide with verified patch code snippets',
      'Automated Playwright/Cypress end-to-end regression test suite',
      'Continuous security scanning configuration for CI/CD',
    ],
    techStack: ['Playwright', 'Jest', 'OWASP ZAP', 'Burp Suite', 'Semgrep', 'Trivy', 'SonarQube', 'Postman'],
    faqs: [
      {
        question: 'Do you provide a formal vulnerability report for our compliance auditors?',
        answer: 'Yes. We deliver formal third-party security assessment documentation detailing testing methodology, discovered findings, CVSS ratings, and signed verification of remediation.',
      },
    ],
  },
  {
    id: 'api-integration',
    slug: 'api-development-integration',
    title: 'API Development & Systems Integration',
    category: 'Architecture & Integration',
    shortDesc: 'High-throughput RESTful, GraphQL, and event-driven API gateways connecting disparate enterprise platforms, payment processors, and legacy systems.',
    valueProposition: 'Eliminate corporate data silos, automate inter-system workflows, and build rock-solid API ecosystems with sub-millisecond latencies, OAuth2 security, and 99.99% uptime.',
    businessOutcomes: [
      'Seamless bi-directional data synchronization across CRM, ERP, billing, and inventory',
      'Reduce partner onboarding cycle times from months to days with clean OpenAPI specs',
      'Eliminate manual data re-entry errors through automated event triggers and webhooks',
      'Resilient throttling and queue buffering during unpredictable traffic spikes',
    ],
    capabilities: [
      {
        title: 'Enterprise API Gateways & Edge Routing',
        description: 'Centralized API gateway architecture managing SSL termination, rate limiting, token introspection, and path routing.',
      },
      {
        title: 'Enterprise ERP & CRM Connectors',
        description: 'Hardened integrations with Salesforce, SAP, Oracle NetSuite, HubSpot, and custom internal SQL databases.',
      },
      {
        title: 'Event-Driven Webhook Infrastructures',
        description: 'Scalable webhook processing pipelines backed by Redis queues and dead-letter queues (DLQs) to prevent lost events.',
      },
      {
        title: 'Financial & Payment Engine Integration',
        description: 'PCI-compliant payment gateways, automated invoicing, multi-currency conversions, and idempotent transaction handling (Stripe, Razorpay, Adyen).',
      },
    ],
    problemSolved: 'Enterprises struggle with fragmented software stacks where customer, product, and financial data are trapped in separate silos, forcing manual copying and causing data mismatches.',
    solutionApproach: 'We design decoupled integration architectures using contract-first OpenAPI schemas, message queues for asynchronous buffering, and idempotent retry strategies for zero data loss.',
    deliverables: [
      'Production-tested API Gateway with JWT/OAuth2 authentication and rate limiting',
      'Interactive Swagger / OpenAPI 3.0 documentation portal',
      'Automated integration test suites simulating third-party downtime and latency',
      'Telemetry dashboards monitoring API response codes, p99 latencies, and error rates',
    ],
    techStack: ['NestJS', 'FastAPI', 'Node.js', 'GraphQL', 'Kafka', 'RabbitMQ', 'Redis', 'PostgreSQL', 'Docker'],
    faqs: [
      {
        question: 'How do you handle third-party API rate limits and unexpected downtime?',
        answer: 'We implement circuit breaker patterns, exponential backoff with jitter, Redis-backed message queues, and dead-letter queues so requests are safely queued and retried without data loss.',
      },
    ],
  },
  {
    id: 'application-modernization',
    slug: 'application-modernization-maintenance',
    title: 'Application Modernization & Maintenance',
    category: 'Modernization & Support',
    shortDesc: 'Deconstruct fragile monolithic software into modern containerized services, eliminate technical debt, and ensure 24/7 SLA reliability.',
    valueProposition: 'Breathe new life into mission-critical legacy applications with incremental refactoring, cloud containerization, database optimization, and guaranteed uptime support.',
    businessOutcomes: [
      'Reduce cloud hosting and maintenance overhead by up to 50%',
      'Eliminate software crashes and memory leaks with modern runtime upgrades',
      'Enable rapid feature releases without fearing fragile legacy codebase regressions',
      'Extend the operational lifecycle of core proprietary systems by 5+ years',
    ],
    capabilities: [
      {
        title: 'Strangler Fig Monolith Deconstruction',
        description: 'Safely extract high-value business domains into standalone services without high-risk total system rewrites.',
      },
      {
        title: 'Runtime & Framework Upgrades',
        description: 'Modernizing outdated Node.js, Python, PHP, or Java versions to modern LTS runtimes with patched security vulnerabilities.',
      },
      {
        title: 'Database Schema & Query Optimization',
        description: 'Index tuning, query optimization, connection pooling with PgBouncer, and zero-downtime schema migrations.',
      },
      {
        title: '24/7 SLA Application Support',
        description: 'Guaranteed response times, proactive security patching, bug triage, and continuous performance tuning.',
      },
    ],
    problemSolved: 'Legacy systems slow down business growth, run on deprecated frameworks with unpatched CVE security vulnerabilities, and crash during peak business traffic.',
    solutionApproach: 'We conduct a comprehensive code audit, apply the Strangler Fig pattern for incremental modernization, containerize workloads, and wrap legacy endpoints with modern automated test harnesses.',
    deliverables: [
      'Comprehensive Technical Debt & Architectural Audit Report',
      'Containerized Docker/Kubernetes deployment manifests',
      'Zero-downtime database migration scripts',
      'Formal Service Level Agreement (SLA) with guaranteed response times',
    ],
    techStack: ['Docker', 'Kubernetes', 'TypeScript', 'Node.js LTS', 'PostgreSQL', 'Prisma', 'Terraform', 'Datadog'],
    faqs: [
      {
        question: 'Can you modernize our application without interrupting live customer operations?',
        answer: 'Yes. We employ the Strangler Fig pattern and dual-write database strategies, gradually routing live traffic to modernized components while the legacy system continues operating safely.',
      },
    ],
  },
];
