import { z } from 'zod';

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(120, 'Name cannot exceed 120 characters')
    .trim(),
  email: z
    .string()
    .email('Please provide a valid work email address')
    .max(254, 'Email cannot exceed 254 characters')
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .max(32, 'Phone number cannot exceed 32 characters')
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .min(2, 'Company or organization name is required')
    .max(160, 'Company name cannot exceed 160 characters')
    .trim(),
  serviceCategory: z
    .string()
    .min(2, 'Please select a service category'),
  projectType: z
    .string()
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .min(10, 'Please provide at least 10 characters describing your project requirements')
    .max(4000, 'Project description cannot exceed 4000 characters')
    .trim(),
  budgetRange: z
    .string()
    .optional()
    .or(z.literal('')),
  timeline: z
    .string()
    .optional()
    .or(z.literal('')),
  features: z
    .array(z.string())
    .default([]),
  honeypot: z
    .string()
    .max(0, 'Bot submission rejected')
    .optional()
    .or(z.literal('')),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
