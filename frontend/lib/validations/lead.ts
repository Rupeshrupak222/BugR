import { z } from 'zod';

export const leadSchema = z.object({
  requestId: z.string().uuid(),
  name: z.string().min(1, 'Name is required').max(120, 'Name is too long'),
  email: z.string().email('Please enter a valid email address').max(254),
  phone: z
    .string()
    .min(7, 'Phone number must have at least 7 digits')
    .max(32, 'Phone number is too long')
    .regex(/^\+?[\d ()-]+$/, 'Please enter a valid phone number'),
  source: z.string().min(1, 'Source is required').max(80),
  message: z.string().max(2000, 'Message cannot exceed 2000 characters').optional().default(''),
  token: z.string().optional(),
  website: z.string().max(256).optional().default(''),
});

export type LeadFormData = z.infer<typeof leadSchema>;
