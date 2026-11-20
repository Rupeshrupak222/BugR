export interface IndustryItem {
  id: string;
  name: string;
  badge: string;
  headline: string;
  description: string;
  keyChallenges: string[];
  engineeringSolutions: string[];
  technologies: string[];
}

export const industriesData: IndustryItem[] = [
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    badge: 'HEALTHCARE',
    headline: 'Secure, interoperable digital health systems with strict HIPAA compliance.',
    description: 'We engineer HIPAA-compliant medical portals, clinical workflow automations, EHR data bridges, and biomedical analytics platforms designed with data privacy at the core.',
    keyChallenges: [
      'Strict regulatory compliance (HIPAA, HITECH, FDA 21 CFR Part 11)',
      'Legacy EHR/EMR interoperability bottlenecks and HL7/FHIR compatibility',
      'Sensitive protected health information (PHI) exposure risks',
    ],
    engineeringSolutions: [
      'Automated FHIR JSON data mapping and HL7 v2 message parsing engines',
      'Hardware-level cryptographic key storage and immutable audit logging',
      'Zero-knowledge access controls for patient-facing telemedicine portals',
    ],
    technologies: ['FastAPI', 'Python', 'FHIR API', 'PostgreSQL', 'AWS HealthLake', 'KMS Encryption'],
  },
  {
    id: 'fintech',
    name: 'Financial Services & Banking',
    badge: 'FINTECH',
    headline: 'High-frequency transaction engines, ledger integrity, and PCI-DSS security.',
    description: 'We develop robust payment gateways, reconciliation engines, core banking middleware, and fraud analytics pipelines capable of processing millions of transactions with deterministic accuracy.',
    keyChallenges: [
      'Financial transaction race conditions and double-spending risks',
      'PCI-DSS compliance and financial data tokenization',
      'Complex multi-source reconciliation discrepancies between banks and processors',
    ],
    engineeringSolutions: [
      'Double-entry bookkeeping ledgers with cryptographic balance verification',
      'Distributed locking architectures using Redis and PostgreSQL advisory locks',
      'Automated real-time fraud scoring microservices with sub-50ms latency',
    ],
    technologies: ['Go', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'AWS KMS', 'OpenTelemetry'],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Omnichannel Retail',
    badge: 'RETAIL & E-COMMERCE',
    headline: 'Sub-second digital storefronts, real-time inventory, and frictionless checkouts.',
    description: 'We build headless commerce platforms that handle massive flash sale traffic spikes, synchronize multi-warehouse inventory in real-time, and maximize conversion rates.',
    keyChallenges: [
      'Site slow-downs and crashes during holiday promotions and flash sales',
      'Inventory sync discrepancies between online marketplaces and physical stores',
      'High shopping cart abandonment due to multi-step checkout friction',
    ],
    engineeringSolutions: [
      'Headless Next.js storefronts with Edge cache pre-rendering and dynamic cart hydration',
      'Change Data Capture (CDC) inventory meshes for sub-second stock allocation',
      'Single-click checkout integrations with Stripe, Apple Pay, and local payment methods',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Redis', 'Shopify Plus API', 'Stripe', 'MedusaJS'],
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    badge: 'LOGISTICS',
    headline: 'End-to-end fleet tracking, automated dispatch, and warehouse optimization.',
    description: 'We create intelligent logistics software: real-time GPS fleet telemetry, warehouse inventory slotting algorithms, and supplier portal integrations.',
    keyChallenges: [
      'Unpredictable transit delays and zero real-time visibility across multi-carrier routes',
      'Inefficient manual dispatch coordination leading to high fuel overhead',
      'Disconnected supplier communications and lost paper bills of lading',
    ],
    engineeringSolutions: [
      'Real-time IoT telemetry ingestion with geofencing and delay alert automation',
      'Linear programming algorithms optimizing driver routes and package load distribution',
      'Digital bill of lading (eBOL) capture with optical verification and mobile signatures',
    ],
    technologies: ['Node.js', 'Python', 'Mapbox API', 'MQTT / IoT Core', 'PostgreSQL / PostGIS', 'React Native'],
  },
  {
    id: 'saas',
    name: 'B2B SaaS & Product Companies',
    badge: 'SAAS & STARTUPS',
    headline: 'Multi-tenant cloud architectures built for venture-scale customer growth.',
    description: 'We partner with venture-backed founders and scaling SaaS companies to build MVPs, modernize core monoliths, design self-service developer APIs, and automate billing.',
    keyChallenges: [
      'Balancing high feature delivery velocity against accumulating technical debt',
      'Managing tenant data isolation and role-based permissions at scale',
      'Implementing flexible subscription billing models (usage-based, seats, tiers)',
    ],
    engineeringSolutions: [
      'Multi-tenant architecture with Row-Level Security (RLS) in PostgreSQL',
      'Stripe Billing webhook state machines handling tier upgrades, downgrades, and proration',
      'Automated developer portals with self-service API keys, webhooks, and sandbox testing',
    ],
    technologies: ['Next.js', 'NestJS', 'Prisma', 'Supabase', 'Stripe Billing', 'Redis', 'Tailwind CSS'],
  },
];
