export const chapters = [
  { id: 'refinery', name: 'The Refinery', short: 'Origin', coordinate: '00 / 00', title: 'BEYOND THEORY.', description: 'Real industry environments. Broken artifacts. Practical challenges. Reviewed solutions. Professional proof.', artifact: 'Refinery core', model: 'reactor' },
  { id: 'technology', name: 'Technology', short: 'Technology', coordinate: '00 / −72', title: 'Trace the system.', description: 'Software architecture, connected data systems, AI and debugging. Follow the fault through an unfamiliar system.', artifact: 'Compute architecture', model: 'tech' },
  { id: 'commerce', name: 'Management & Commerce', short: 'Commerce', coordinate: '62 / −112', title: 'Balance the operation.', description: 'Financial models, transactions, accounting and supply chains. Turn an operational mismatch into work that stands up to review.', artifact: 'Transaction ledger', model: 'management' },
  { id: 'engineering', name: 'Engineering & Non-IT', short: 'Engineering', coordinate: '124 / −72', title: 'Resolve the assembly.', description: 'Mechanical assemblies, CAD drawings and industrial systems. Investigate the tolerances that make the whole system work.', artifact: 'Mechanical assembly', model: 'engineering' },
  { id: 'medical', name: 'Medical', short: 'Medical', coordinate: '124 / 00', title: 'Examine the evidence.', description: 'Clinical documentation, pharmaceutical research and biological data. Trace discrepancies with care and document the correction.', artifact: 'Molecular study', model: 'medical' },
  { id: 'process', name: 'Proof & Results', short: 'The method', coordinate: '62 / 42', title: 'SIMULATE. DEBUG. SHIP.', description: 'Start with a broken artifact. Investigate it, correct it under review, and deliver professional proof.', artifact: 'Reviewed artifacts', model: 'index' },
  { id: 'arrival', name: 'Your Next Step', short: 'Begin', coordinate: '00 / 00', title: 'FROM THEORY TO PRODUCTION-READY.', description: 'Choose your industry. Work through real challenges. Leave with evidence of what you can do.', artifact: 'Unified refinery', model: 'reactor' }
] as const;

// The final stop returns to the original chamber in a single connected environment.
export const stations: [number, number, number][] = [[0, 0, 0], [0, 0, -72], [62, 0, -112], [124, 0, -72], [124, 0, 0], [62, 0, 42], [0, 0, 0]];
