import { labContent } from '../data/labs';

export type Lab = typeof labContent[number];
export const labs = labContent;
export const support = 'support@bugrefinery.com';
export const foundry = 'https://foundry.bugrefinery.com/';
export const origin = 'https://bugrefinery.com';
export const price = '₹9,999';
export const status = 'STARTING SOON';
export const terms = `${price} per lab · 9 weeks · Cohort 30`;

export const areas = [
  { id: 'tech', name: 'Technology', file: 'Code diff', title: 'A broken application', description: 'Trace faults through software, data and infrastructure.', before: 'A login request fails for a valid user.', after: 'The serializer is corrected and a regression test documents the fix.' },
  { id: 'management', name: 'Management & Commerce', file: 'Reconciliation sheet', title: 'A ledger that won’t balance', description: 'Work through financial, operational and enterprise problems.', before: 'The ledger and statement show different totals.', after: 'The mismatch is reconciled and the corrected work is ready for audit.' },
  { id: 'engineering', name: 'Engineering & Non-IT', file: 'Engineering drawing', title: 'A drawing with a dimensional error', description: 'Investigate designs, technical drawings and industrial systems.', before: 'A drawing contains conflicting measurements.', after: 'The dimensions are checked and the drawing set is corrected.' },
  { id: 'medical', name: 'Medical', file: 'Synthetic coding chart', title: 'A medical coding discrepancy', description: 'Review clinical documentation, safety cases and biological data.', before: 'A code in a synthetic chart conflicts with its documentation.', after: 'The coding is corrected and the audit finding records the rationale.' }
].map((area, index) => ({
  ...area,
  number: String(index + 1).padStart(2, '0'),
  labs: labs.filter(lab => lab.domain === area.id)
}));

export const steps = [
  ['Simulate Industry Environments', 'Start with a brief, an unfamiliar artifact and the context a real team would give you.'],
  ['Debug Under Pressure', 'Trace the failure, make a defensible correction and get feedback on your decisions.'],
  ['Ship Real Projects', 'Deliver the work with evidence that a reviewer can inspect and discuss with you.']
];
export const phases = [
  ['Weeks 1–2', 'Brushup', 'Refresh the fundamentals in the context of the work.'],
  ['Weeks 3–4', 'Debug', 'Find and fix failures in a broken artifact.'],
  ['Weeks 5–7', 'Navigate', 'Trace dependencies and make changes in unfamiliar work.'],
  ['Weeks 8–9', 'Ship', 'Deliver a final project and explain what changed.']
];
export const benefits = [
  ['Industry Simulation Labs', 'Work within a scenario from your field.'],
  ['Real Artifact and Codebase Work', 'Investigate an existing artifact and make a correction.'],
  ['Project-Based Assessments', 'Demonstrate your decisions through completed work.'],
  ['Certification Backed by Demonstrated Work', 'Leave with evidence alongside a lab completion certificate.'],
  ['Company Talent Pipeline', 'Give hiring teams concrete work they can discuss with graduates.'],
  ['Mentor-Led Reviews', 'Get feedback on the fix and the evidence behind it.']
];
export const proof = ['Shipped project or deliverable', 'Reviewed fixes', 'Work scorecard', 'Capstone post-mortem', 'Verified badge', 'Completion certificate per lab'];
export const pages = [
  { path: '/', name: 'Beyond Theory', description: 'Build practical industry experience through 26 simulations in Technology, Management & Commerce, Engineering & Non-IT, and Medical.' },
  { path: '/labs.html', name: 'Labs', description: 'Browse all 26 Bug Refinery industry-simulation labs, grouped into four areas.' },
  { path: '/students.html', name: 'For Students', description: 'Practice with real-world artifacts and build evidence of your work through nine-week industry simulations.' },
  { path: '/companies.html', name: 'For Companies', description: 'See what graduates can demonstrate through reviewed work and enquire about Bug Refinery’s talent pipeline.' },
  { path: '/about.html', name: 'About', description: 'Learn how Bug Refinery turns industry scenarios into practical work across four domains.' },
  { path: '/contact.html', name: 'Contact', description: 'Reach Bug Refinery support or send an enquiry through the contact form.' },
  { path: '/signup.html', name: 'Sign Up', description: 'Register your interest in Bug Refinery’s upcoming industry-simulation labs.' },
  ...labs.map(lab => ({ path: lab.path, name: lab.name, description: `Explore the nine-week ${lab.name} lab. ${lab.simulate}` }))
];
export const notFound = { path: '/404.html', name: 'Page not found', description: 'The requested Bug Refinery page could not be found.' };
