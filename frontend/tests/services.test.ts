import { describe, it, expect } from 'vitest';
import { servicesData } from '../data/services';
import { portfolioProjects } from '../data/portfolio';
import { industriesData } from '../data/industries';
import { processSteps } from '../data/process';

describe('IT Services Data Integrity', () => {
  it('should have all 8 approved core IT services', () => {
    expect(servicesData.length).toBe(8);
    const expectedSlugs = [
      'custom-software-development',
      'web-development',
      'mobile-app-development',
      'cloud-devops',
      'ai-automation',
      'cybersecurity-qa',
      'api-development-integration',
      'application-modernization-maintenance',
    ];
    servicesData.forEach((s) => {
      expect(expectedSlugs).toContain(s.slug);
      expect(s.title).toBeTruthy();
      expect(s.capabilities.length).toBeGreaterThanOrEqual(4);
      expect(s.deliverables.length).toBeGreaterThanOrEqual(4);
      expect(s.techStack.length).toBeGreaterThanOrEqual(4);
      expect(s.faqs.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('should have demonstrative portfolio projects without fabricated claims', () => {
    expect(portfolioProjects.length).toBeGreaterThanOrEqual(4);
    portfolioProjects.forEach((p) => {
      expect(p.isDemonstrative).toBe(true);
      expect(p.challenge).toBeTruthy();
      expect(p.solution).toBeTruthy();
      expect(p.impactMetrics.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('should have 5 core industry verticals defined', () => {
    expect(industriesData.length).toBe(5);
    industriesData.forEach((ind) => {
      expect(ind.keyChallenges.length).toBeGreaterThanOrEqual(3);
      expect(ind.engineeringSolutions.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('should have the 8-step engineering delivery process', () => {
    expect(processSteps.length).toBe(8);
    const stepNames = processSteps.map((s) => s.name);
    expect(stepNames).toEqual(['Discover', 'Plan', 'UI/UX Design', 'Architecture', 'Develop', 'Test', 'Deploy', 'Support']);
  });
});
