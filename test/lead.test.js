import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/app.js';

const env = {
  SUPABASE_URL: 'https://database.example', SUPABASE_SERVICE_ROLE_KEY: 'test-key',
  TURNSTILE_SECRET_KEY: 'test-secret', TURNSTILE_SITE_KEY: 'test-public',
  TURNSTILE_HOSTNAME: 'website.example'
};
const base = {
  name: 'Synthetic lead', email: 'synthetic@example.com', phone: '+91 1234567890',
  source: 'Students', message: '', website: '', token: 'test-token', requestId: 'e9f4c941-cad3-4658-975d-b6351769fa55'
};

async function exercise({ patch, fake, settings = env }) {
  const calls = [];
  const app = createApp({ env: settings, request: async (url, options) => {
    calls.push({ url: String(url), body: options.body });
    return fake(String(url), options);
  } });
  const server = app.listen(0, '127.0.0.1');
  try {
    await new Promise((resolve, reject) => { server.once('listening', resolve); server.once('error', reject); });
    const res = await fetch('http://127.0.0.1:' + server.address().port + '/api/lead', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...base, ...patch })
    });
    return { status: res.status, payload: await res.json(), calls };
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

const success = url => Response.json(url.includes('siteverify') ? { success: true, hostname: env.TURNSTILE_HOSTNAME, action: 'students' } : true);

test('main form validates Turnstile between rate claim and confirmed write', async () => {
  const result = await exercise({ fake: success });
  assert.equal(result.status, 200);
  assert.deepEqual(result.payload, { saved: true });
  assert.deepEqual(result.calls.map(call => call.url.split('/').at(-1)), ['claim_lead_attempt', 'siteverify', 'save_website_lead']);
  assert.match(JSON.parse(result.calls[0].body).p_hash, /^[a-f0-9]{64}$/);
  assert.equal(JSON.parse(result.calls[2].body).p_source, 'Students');
});

test('invalid fields, unknown source and honeypot reject before external calls', async () => {
  for (const patch of [{ email: 'bad' }, { phone: 'bad' }, { name: '' }, { source: 'Unknown' }, { website: 'robot' }]) {
    const result = await exercise({ patch, fake: success });
    assert.equal(result.status, 400);
    assert.equal(result.calls.length, 0);
  }
});

test('rate rejection, missing token, wrong action and database failure do not confirm', async () => {
  const limited = await exercise({ fake: () => Response.json(false) });
  assert.equal(limited.status, 429);
  assert.equal(limited.calls.length, 1);
  const missing = await exercise({ patch: { token: '' }, fake: success });
  assert.equal(missing.status, 422);
  assert.equal(missing.calls.length, 1);
  const invalid = await exercise({ fake: url => url.includes('siteverify') ? Response.json({ success: true, hostname: env.TURNSTILE_HOSTNAME, action: 'contact' }) : success(url) });
  assert.equal(invalid.status, 422);
  assert.equal(invalid.calls.length, 2);
  const offline = await exercise({ fake: url => url.endsWith('save_website_lead') ? new Response('', { status: 500 }) : success(url) });
  assert.equal(offline.status, 503);
  assert.deepEqual(offline.payload, { saved: false });
});

test('lab registration attributes the lead without main-form Turnstile', async () => {
  const result = await exercise({ patch: { source: 'Finance', token: '' }, fake: success });
  assert.equal(result.status, 200);
  assert.equal(result.calls.length, 2);
  assert.equal(JSON.parse(result.calls[1].body).p_source, 'Finance');
});

test('an unconfigured deployment fails closed', async () => {
  const result = await exercise({ settings: {}, fake: success });
  assert.equal(result.status, 503);
  assert.equal(result.calls.length, 0);
});
