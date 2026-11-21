import { LeadFormData } from './validations/lead';

const API_BASE = typeof window !== 'undefined' ? '/api' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api');

export interface LeadResponse {
  saved: boolean;
  id?: string;
  message?: string;
}

export interface PublicConfig {
  enabled: boolean;
  siteKey: string | null;
}

export async function fetchPublicConfig(): Promise<PublicConfig> {
  try {
    const res = await fetch(`${API_BASE}/leads/public-config`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load public config');
    return await res.json();
  } catch {
    return { enabled: true, siteKey: null };
  }
}

export async function submitLead(data: LeadFormData): Promise<LeadResponse> {
  const res = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Submission failed. Please check your details and try again.');
  }

  return res.json();
}
