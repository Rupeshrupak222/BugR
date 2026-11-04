import express from 'express';
import { createHash } from 'node:crypto';
import { isIP } from 'node:net';
import { resolve } from 'node:path';

const main = new Set(['Students', 'Companies', 'Contact']);
const validSources = new Set([...main, 'Sign Up',
  'Python Full Stack', 'Java Full Stack', 'Selenium Testing', 'Data Analytics', 'Data Engineering', 'AI / ML',
  'Data Science', 'Cloud and DevOps', 'Cyber Security', 'UI/UX Design', 'App Development',
  'Finance', 'Business Analytics', 'Supply Chain Management', 'Salesforce', 'SAP FICA', 'HRM',
  'Embedded Systems', 'IoT and Robotics', 'AutoCAD', 'CATIA', 'Quality and Safety', 'Construction Planning',
  'Medical Coding', 'Pharmacovigilance', 'Bioinformatics'
]);

export function validateLead(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const values = {};
  for (const [key, max] of Object.entries({
    name: 120, email: 254, phone: 32, source: 80, message: 2000, website: 256, token: 2048, requestId: 36
  })) {
    const value = body[key];
    if (typeof value !== 'string' || value.length > max || value.includes('\0')) return null;
    values[key] = key === 'website' ? value : value.trim();
  }
  if (!values.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return null;
  if (!/^\+?[\d ()-]+$/.test(values.phone) || !/^\d{7,15}$/.test(values.phone.replace(/\D/g, ''))) return null;
  if (!validSources.has(values.source) || !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(values.requestId)) return null;
  return values;
}

export function createApp({ env = process.env, request = fetch, dist = resolve('dist') } = {}) {
  const app = express();
  app.disable('x-powered-by');
  const proxyHops = Number(env.TRUST_PROXY_HOPS ?? 0);
  if (Number.isSafeInteger(proxyHops) && proxyHops > 0) app.set('trust proxy', proxyHops);
  const configured = Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY && env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY && env.TURNSTILE_HOSTNAME);
  const headers = { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: 'Bearer ' + env.SUPABASE_SERVICE_ROLE_KEY, 'Content-Type': 'application/json' };

  async function rpc(name, payload) {
    const response = await request(new URL('/rest/v1/rpc/' + name, env.SUPABASE_URL), {
      method: 'POST', headers, body: JSON.stringify(payload), signal: AbortSignal.timeout(3000)
    });
    if (!response.ok) throw new Error('Database request failed');
    return response.json();
  }

  app.use((_req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
  app.use('/api', (_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
  app.get('/api/public-config', (_req, res) => res.json({ enabled: configured, siteKey: configured ? env.TURNSTILE_SITE_KEY : null }));
  app.post('/api/lead', express.json({ limit: '16kb' }), async (req, res) => {
    if (!req.is('application/json')) return res.status(415).json({ saved: false });
    const lead = validateLead(req.body);
    if (!lead || lead.website) return res.status(400).json({ saved: false });
    if (!configured || !req.ip || !isIP(req.ip)) return res.status(503).json({ saved: false });

    try {
      const hash = createHash('sha256').update(req.ip.replace(/^::ffff:/, '')).digest('hex');
      if (await rpc('claim_lead_attempt', { p_hash: hash }) !== true) return res.status(429).json({ saved: false });
      if (main.has(lead.source)) {
        if (!lead.token) return res.status(422).json({ saved: false });
        const response = await request('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST', body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: lead.token }),
          signal: AbortSignal.timeout(3000)
        });
        if (!response.ok) throw new Error('Verification unavailable');
        const verification = await response.json();
        if (!verification.success || verification.hostname !== env.TURNSTILE_HOSTNAME || verification.action !== lead.source.toLowerCase()) {
          return res.status(422).json({ saved: false });
        }
      }
      const saved = await rpc('save_website_lead', {
        p_id: lead.requestId, p_name: lead.name, p_email: lead.email, p_phone: lead.phone,
        p_source: lead.source, p_message: lead.message
      });
      if (saved !== true) return res.status(409).json({ saved: false });
      return res.json({ saved: true });
    } catch {
      return res.status(503).json({ saved: false });
    }
  });
  app.use('/api', (_req, res) => res.status(404).json({ saved: false }));
  app.get('/index.html', (_req, res) => res.redirect(301, '/'));
  app.use('/assets', express.static(resolve(dist, 'assets'), { immutable: true, maxAge: '1y' }));
  app.use(express.static(dist));
  app.use((_req, res) => res.status(404).sendFile(resolve(dist, '404.html')));
  app.use((error, _req, res, _next) => res.status(error.status === 400 || error.status === 413 ? error.status : 503).json({ saved: false }));
  return app;
}
