import { describe, it, expect } from 'vitest';
import { leadSchema } from '../lib/validations/lead';

describe('leadSchema validation (Zod)', () => {
  it('should accept valid applicant lead', () => {
    const validData = {
      requestId: 'c8087268-306d-495d-9fc0-42ba2cfa5fbc',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543210',
      source: 'Java Full Stack',
      message: 'Looking forward to cohort 30.',
    };

    const parsed = leadSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidData = {
      requestId: 'c8087268-306d-495d-9fc0-42ba2cfa5fbc',
      name: 'Priya Sharma',
      email: 'invalid-email-address',
      phone: '+91 9876543210',
      source: 'Java Full Stack',
    };

    const parsed = leadSchema.safeParse(invalidData);
    expect(parsed.success).toBe(false);
  });

  it('should reject missing name', () => {
    const invalidData = {
      requestId: 'c8087268-306d-495d-9fc0-42ba2cfa5fbc',
      name: '',
      email: 'priya@example.com',
      phone: '+91 9876543210',
      source: 'Java Full Stack',
    };

    const parsed = leadSchema.safeParse(invalidData);
    expect(parsed.success).toBe(false);
  });
});
