export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: 'FinTech' | 'Cloud' | 'AI & Automation' | 'Web & SaaS' | 'HealthTech';
  clientType: string;
  timeline: string;
  summary: string;
  challenge: string;
  solution: string;
  impactMetrics: string[];
  techStack: string[];
  architectureDiagramType: string;
  isDemonstrative: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'fintech-payment-engine',
    slug: 'fintech-payment-orchestrator',
    title: 'High-Concurrency Payment Orchestration Engine',
    category: 'FinTech',
    clientType: 'Financial Services Reference Architecture',
    timeline: '12 Weeks',
    summary: 'A distributed, idempotent payment routing and settlement gateway capable of processing 10,000 transactions per second with sub-100ms latency and zero double-charge risk.',
    challenge: 'High peak volumes during settlement windows caused distributed database deadlocks, race conditions in account balance updates, and duplicate transaction charges when webhooks timed out.',
    solution: 'Engineered an event-driven ledger service with pessimistic row-locking on account balances, transactional outbox pattern via Apache Kafka, Redis-backed distributed locks, and automated idempotency keys.',
    impactMetrics: [
      '10,000 TPS peak throughput benchmarked',
      'Zero double-charge incidents under simulated 500ms network timeouts',
      '99.999% ledger consistency across dual-entry accounting records',
    ],
    techStack: ['Go', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Prometheus', 'AWS ECS'],
    architectureDiagramType: 'Event-Driven Transactional Outbox',
    isDemonstrative: true,
  },
  {
    id: 'healthtech-clinical-pipeline',
    slug: 'healthtech-clinical-pipeline',
    title: 'HIPAA-Compliant Clinical Data Extraction Pipeline',
    category: 'HealthTech',
    clientType: 'Healthcare Systems Reference Architecture',
    timeline: '14 Weeks',
    summary: 'An automated OCR and RAG extraction engine transforming scanned medical discharge summaries and lab PDFs into structured FHIR-compliant patient records.',
    challenge: 'Physicians spent 3+ hours daily manually re-keying diagnostic data and lab results from unstructured hospital PDFs into electronic health record (EHR) databases.',
    solution: 'Designed an asynchronous extraction worker architecture combining document layout OCR, domain-grounded LLM entity extraction, PII/PHI sanitization filters, and deterministic schema validation before database entry.',
    impactMetrics: [
      '78% reduction in manual physician data entry time',
      '99.2% entity extraction accuracy on complex clinical discharge summaries',
      'Strict HIPAA compliance with end-to-end KMS encryption at rest and in transit',
    ],
    techStack: ['Python', 'FastAPI', 'pgvector', 'LangChain', 'Docker', 'AWS Textract', 'PostgreSQL'],
    architectureDiagramType: 'Asynchronous Document Ingestion & RAG',
    isDemonstrative: true,
  },
  {
    id: 'ecommerce-event-inventory',
    slug: 'ecommerce-event-inventory',
    title: 'Real-Time Omnichannel Inventory Synchronization',
    category: 'Web & SaaS',
    clientType: 'Retail & E-Commerce Reference Architecture',
    timeline: '10 Weeks',
    summary: 'A sub-second stock allocation engine synchronizing online marketplaces, physical POS registers, and central warehouse distribution centers without overselling.',
    challenge: 'Flash sales and holiday promotions triggered ghost stock and overselling across Shopify and physical stores due to 15-minute batch sync latency.',
    solution: 'Built a real-time event stream using change-data-capture (CDC via Debezium) syncing warehouse database commits directly to an in-memory Redis cluster with optimistic concurrency versioning.',
    impactMetrics: [
      'Inventory sync latency reduced from 15 minutes to 180 milliseconds',
      'Eliminated overselling cancellations completely during high-traffic flash sales',
      'Unified visibility across 45 physical retail locations and online channels',
    ],
    techStack: ['Node.js', 'TypeScript', 'Redis', 'PostgreSQL', 'Debezium', 'Next.js', 'Tailwind CSS'],
    architectureDiagramType: 'Change Data Capture (CDC) Real-Time Mesh',
    isDemonstrative: true,
  },
  {
    id: 'cloud-finops-modernization',
    slug: 'cloud-finops-modernization',
    title: 'Multi-Tenant Kubernetes Infrastructure Modernization',
    category: 'Cloud',
    clientType: 'Enterprise Cloud Architecture',
    timeline: '8 Weeks',
    summary: 'Migration of an unmonitored virtual-machine monolith into an automated, autoscaling AWS EKS cluster with comprehensive FinOps cost attribution.',
    challenge: 'Runaway AWS spending, manual SSH deployments taking 4 hours per release, and cascading outages whenever a single background job consumed all host memory.',
    solution: 'Provisioned immutable infrastructure via Terraform, implemented Kubernetes resource quotas and Karpenter node autoscaling, and configured automated GitHub Actions GitOps deployments.',
    impactMetrics: [
      '38% reduction in monthly AWS cloud infrastructure billing',
      'Deployment duration slashed from 4 hours to 6 minutes',
      'Zero downtime throughout 6 months of continuous daily releases',
    ],
    techStack: ['AWS EKS', 'Terraform', 'Kubernetes', 'Karpenter', 'GitHub Actions', 'Datadog', 'ArgoCD'],
    architectureDiagramType: 'GitOps Continuous Deployment on EKS',
    isDemonstrative: true,
  },
];
