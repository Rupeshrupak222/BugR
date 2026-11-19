import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';

const main = new Set(['Students', 'Companies', 'Contact']);
const endpoint = '/api/lead';
const support = 'support@bugrefinery.com';
type Widget = { render: (element: HTMLElement, options: { sitekey: string; action: string; size: 'compact' | 'normal' }) => string; remove: (id: string) => void; reset: (id: string) => void };
let script: Promise<Widget> | undefined;

function loadWidget() {
  if (!script) script = new Promise<Widget>((resolve, reject) => {
    const tag = document.createElement('script');
    tag.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    tag.onload = () => {
      const widget = (window as Window & { turnstile?: Widget }).turnstile;
      if (widget) resolve(widget);
      else reject(new Error('Verification unavailable'));
    };
    tag.onerror = reject;
    document.head.append(tag);
  });
  return script;
}

export function LeadForm({ source, submitLabel = 'Send enquiry', onBusyChange }: { source: string; submitLabel?: string; onBusyChange?: (busy: boolean) => void }) {
  const id = useId();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');
  const [verified, setVerified] = useState(false);
  const target = useRef<HTMLDivElement>(null);
  const widget = useRef<{ api: Widget; id: string } | null>(null);
  const lock = useRef(false);
  const attempt = useRef<{ key: string; fingerprint: string } | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/public-config', { signal: AbortSignal.timeout(5000) })
      .then(async response => {
        if (!response.ok) throw new Error();
        const config = await response.json();
        if (!config.enabled) throw new Error();
        if (main.has(source)) {
          const api = await loadWidget();
          if (!active || !target.current) return;
          widget.current = { api, id: api.render(target.current, {
            sitekey: config.siteKey, action: source.toLowerCase(),
            size: matchMedia('(max-width: 500px)').matches ? 'compact' : 'normal'
          }) };
        }
        if (active) setReady(true);
      })
      .catch(() => { if (active) setNotice('Online submission is unavailable. Please contact support.'); });
    return () => {
      active = false;
      if (widget.current) widget.current.api.remove(widget.current.id);
    };
  }, [source]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || lock.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const get = (name: string) => String(fields.get(name) ?? '').trim();
    const data = { name: get('name'), email: get('email'), phone: get('phone'), message: get('message'), source, website: String(fields.get('website') ?? '') };
    const invalid: Record<string, string> = {};
    if (!data.name) invalid.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) invalid.email = 'Enter a valid email address.';
    if (!/^\+?[\d ()-]+$/.test(data.phone) || !/^\d{7,15}$/.test(data.phone.replace(/\D/g, ''))) invalid.phone = 'Enter a valid phone number.';
    setErrors(invalid);
    setVerified(false);
    setNotice('');
    const first = Object.keys(invalid)[0];
    if (first) { form.querySelector<HTMLInputElement>('[name="' + first + '"]')?.focus(); return; }
    const token = get('cf-turnstile-response');
    if (main.has(source) && !token) {
      setNotice('Please complete verification and retry.');
      return;
    }
    const fingerprint = JSON.stringify(data);
    lock.current = true;
    setBusy(true);
    onBusyChange?.(true);
    try {
      if (!attempt.current || attempt.current.fingerprint !== fingerprint) attempt.current = { key: crypto.randomUUID(), fingerprint };
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, token, requestId: attempt.current.key }),
        signal: AbortSignal.timeout(12000)
      });
      if (response.ok && (await response.json()).saved === true) {
        setVerified(true);
        setNotice('Your enquiry was received.');
        attempt.current = null;
        form.reset();
      } else if (response.status === 429) setNotice('Submission limit reached. Please try again later.');
      else if (response.status === 422) setNotice('Please complete verification again and retry.');
      else setNotice('We couldn’t confirm your submission. Please retry or contact support.');
    } catch {
      setNotice('We couldn’t confirm your submission. Please retry or contact support.');
    } finally {
      lock.current = false;
      setBusy(false);
      onBusyChange?.(false);
      if (widget.current) widget.current.api.reset(widget.current.id);
    }
  }

  return <form className="lead panel" data-source={source} onSubmit={submit} action={endpoint} method="post" noValidate>
    <fieldset disabled={!ready || busy}>
      <legend>Register interest · {source}</legend>
      {([['name','Name','text',120],['email','Email','email',254],['phone','Phone number','tel',32]] as const).map(([name, label, type, max]) =>
        <label key={name}>{label}<input name={name} type={type} required maxLength={max} autoComplete={name === 'phone' ? 'tel' : name} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? id + name : undefined} />
          {errors[name] && <span id={id + name} className="error">{errors[name]}</span>}</label>)}
      {(source === 'Contact' || source === 'Companies') && <label>Message (optional)<textarea name="message" maxLength={2000} rows={4} /></label>}
      <label className="trap" hidden>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="verification" ref={target} />
      <button className="button primary" type="submit">{busy ? 'Sending…' : submitLabel}</button>
    </fieldset>
    <p className={verified ? 'form-status success' : 'form-status error'} data-state={verified ? 'saved' : 'notice'} role="status">{notice}</p>
    {!ready && <p className="form-fallback">Online submission requires the lead service. Contact <a href={'mailto:' + support}>{support}</a>.</p>}
  </form>;
}

export function LabSignup({ source }: { source: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const id = useId();
  useEffect(() => setReady(true), []);
  return <>
    {ready ? <button ref={trigger} className="button primary" type="button" onClick={() => {
      setMounted(true);
      dialog.current?.showModal();
    }}>Sign up for {source}</button> : <a className="button" href="/signup.html">Get Early Access</a>}
    <dialog ref={dialog} className="dialog" aria-labelledby={id} onClose={() => { setMounted(false); trigger.current?.focus(); }} onClick={event => {
      if (event.target === event.currentTarget) dialog.current?.close();
    }}><div className="dialog-content"><button type="button" className="button" onClick={() => dialog.current?.close()}>Close</button>
      <h2 id={id}>{source}</h2>{mounted && <LeadForm source={source} />}</div></dialog>
  </>;
}
