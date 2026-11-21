export interface ProcessStep {
  number: string;
  name: string;
  tagline: string;
  description: string;
  activities: string[];
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    name: 'Discover',
    tagline: 'Technical Discovery & Requirements Synthesis',
    description: 'We unpack your strategic business objectives, audit existing legacy systems, interview technical stakeholders, and map out user journey constraints.',
    activities: [
      'Architectural teardown of existing technical stacks and infrastructure',
      'Stakeholder alignment on functional and non-functional requirements (NFRs)',
      'Security, data compliance, and third-party API dependency mapping',
    ],
    deliverables: [
      'Technical Discovery Document',
      'System Architecture Blueprint & Data Flow Diagrams',
      'High-Level Scope, Milestones & Timeline Estimate',
    ],
  },
  {
    number: '02',
    name: 'Plan',
    tagline: 'Roadmapping, Architecture & Sprint Planning',
    description: 'We translate discovery findings into an actionable engineering roadmap, defining database schemas, API contracts, infrastructure requirements, and sprint backlogs.',
    activities: [
      'Entity-Relationship (ER) modeling and database normalization design',
      'API specification authoring (OpenAPI/Swagger or GraphQL schemas)',
      'CI/CD deployment topology and cloud infrastructure provisioning planning',
    ],
    deliverables: [
      'Comprehensive Project Specification (PRD / TRD)',
      'Database Schema Definitions & API Contracts',
      'Sprint Backlog with Story Points & Acceptance Criteria',
    ],
  },
  {
    number: '03',
    name: 'UI/UX Design',
    tagline: 'UI/UX Architecture & Design System Creation',
    description: 'We construct wireframes, design systems, and interactive prototypes tailored to your technical user personas, focusing on speed, accessibility, and intuitive ergonomics.',
    activities: [
      'Low-fidelity wireframing and user workflow optimization',
      'High-fidelity interactive Figma component libraries and design tokens',
      'Accessibility review against WCAG 2.1 AA standards and dark-mode contrast',
    ],
    deliverables: [
      'Complete Interactive Design Prototype',
      'Reusable Component Library & Design System Tokens',
      'Micro-interaction and responsive layout specifications',
    ],
  },
  {
    number: '04',
    name: 'Architecture',
    tagline: 'Technical Architecture & Infrastructure Design',
    description: 'We design the distributed system architecture, data models, cloud infrastructure topologies, and security boundaries before writing production code.',
    activities: [
      'Microservices and event-driven data flow architectural modeling',
      'PostgreSQL schema design, indexing strategy, and connection pooling topology',
      'Cloud VPC networking, Kubernetes clusters, and IAM least-privilege policies',
    ],
    deliverables: [
      'Formal Technical Architecture RFC Document',
      'Database Entity-Relationship (ER) & Schema Specs',
      'Infrastructure as Code (Terraform / Helm) blueprints',
    ],
  },
  {
    number: '05',
    name: 'Develop',
    tagline: 'Test-Driven Engineering & Clean Code Implementation',
    description: 'Our senior engineering squad writes robust, modular, and type-safe code in two-week agile sprints. Every commit is code-reviewed and verified by automated CI gates.',
    activities: [
      'Clean TypeScript, Python, or Go implementation adhering to SOLID principles',
      'Unit and integration test authoring alongside feature code (TDD)',
      'Bi-weekly staging environment sprint reviews and functional demos',
    ],
    deliverables: [
      'Version-controlled Git repository with structured pull request history',
      'Continuously deployed Staging Environment for live stakeholder testing',
      'Automated unit test coverage reports (>80% benchmark)',
    ],
  },
  {
    number: '06',
    name: 'Test',
    tagline: 'End-to-End QA, Security Audits & Performance Profiling',
    description: 'We subject the application to rigorous automated browser testing, API contract verification, simulated latency, security penetration tests, and mobile device checks.',
    activities: [
      'Automated Playwright end-to-end regression test suite execution',
      'OWASP Top 10 security scanning and dependency vulnerability triage',
      'Load testing and concurrency benchmarking under simulated peak traffic',
    ],
    deliverables: [
      'QA Test Execution & Pass/Fail Matrix',
      'Security Vulnerability & Penetration Audit Report',
      'Core Web Vitals & Server Latency Benchmark Documentation',
    ],
  },
  {
    number: '07',
    name: 'Deploy',
    tagline: 'Zero-Downtime Production Cutover & Cloud Provisioning',
    description: 'We orchestrate seamless production launches using blue/green or canary deployment strategies, verifying DNS propagation, SSL certificates, database migrations, and CDN caches.',
    activities: [
      'Infrastructure as Code (IaC) execution in production VPC environments',
      'Zero-downtime database schema migration and data seeding',
      'Smoke testing in production with active rollback triggers',
    ],
    deliverables: [
      'Live Production System on AWS, Azure, GCP, or Vercel',
      'Terraform / Docker / Kubernetes production configuration manifests',
      'Production verification sign-off and rollback runbook',
    ],
  },
  {
    number: '08',
    name: 'Support',
    tagline: 'Proactive Telemetry, SLA Maintenance & Continuous Evolution',
    description: 'Our engagement continues with proactive application monitoring, automated database backups, security patch updates, and dedicated engineering sprints for future enhancements.',
    activities: [
      '24/7 infrastructure observability and alert escalation via Datadog/Prometheus',
      'Regular OS, dependency, and framework security patch maintenance',
      'Monthly architectural reviews and continuous feature iteration cycles',
    ],
    deliverables: [
      'Real-time Operational Telemetry Dashboards',
      'Monthly Uptime, Incident & Performance Reports',
      'Dedicated Engineering Hours for Ongoing Evolution',
    ],
  },
];
