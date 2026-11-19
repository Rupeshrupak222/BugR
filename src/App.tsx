import { useEffect, useRef, useState } from 'react';
import { areas, labs, terms, status, pages } from './catalogue';
import { LeadForm, LabSignup } from './LeadForm';

const foundry = 'https://foundry.bugrefinery.com/';
const support = 'support@bugrefinery.com';
const nav = [['For Companies','/companies.html'],['For Students','/students.html'],['Labs','/labs.html'],['Foundry',foundry],['Sign Up','/signup.html']];
const footer = [['About','/about.html'],['Labs','/labs.html'],['Students','/students.html'],['Companies','/companies.html'],['Contact','/contact.html']];
const phases = ['Brush up on the tools and workflow', 'Fix a broken artifact under review', 'Navigate the existing work', 'Ship the final deliverable'];
const weeks = ['Weeks 1–2','Weeks 3–4','Weeks 5–7','Weeks 8–9'];

function Brand() {
  return <a className="brand" href="/"><svg aria-hidden="true" viewBox="0 0 36 36" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 4h10m-8 0v11L6 28q-2 4 3 4h18q5 0 3-4l-9-13V4"/><path d="m18 19 4 2v5l-4 2-4-2v-5zM18 22v5m-7-4h3m8 0h3"/></svg><span>Bug Refinery<small>Beyond Theory.</small></span></a>;
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return <header className="header" onKeyDown={event => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      document.getElementById('menu-toggle')?.focus();
    }
  }}><div className="wrap bar"><Brand />
    {ready && <button id="menu-toggle" className="menu button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>Menu</button>}
    <nav id="site-nav" aria-label="Main navigation" className={ready && !open ? 'nav collapsed' : 'nav'}>
      {nav.map(([label, href]) => <a key={href} href={href} aria-current={path === href ? 'page' : undefined} className={label === 'Sign Up' ? 'button primary' : ''}>{label}</a>)}
    </nav></div></header>;
}

function CookieChoice() {
  const [visible, show] = useState(false);
  useEffect(() => {
    try { show(!localStorage.getItem('br_cookie_consent')); }
    catch { show(true); }
  }, []);
  if (!visible) return null;
  return <aside className="cookie" aria-label="Cookie choice">
    <p>This site stores only your cookie choice in your own browser. No tracking, advertising, or analytics cookies are used.</p>
    {['Accept','Dismiss'].map(label => <button key={label} className="button" onClick={() => {
      try { localStorage.setItem('br_cookie_consent', label === 'Accept' ? 'accepted' : 'dismissed'); }
      catch { /* The choice still closes the banner for this visit. */ }
      show(false);
    }}>{label}</button>)}
  </aside>;
}

function Motion() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty('--progress', max > 0 ? String(scrollY / max) : '0');
    };
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      if (!reduced.matches) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('arrived');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-reveal]').forEach(section => observer.observe(section));
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    schedule();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
    };
  }, []);
  return <div className="progress" aria-hidden="true" />;
}

function RefineryCore() {
  const [paused, setPaused] = useState(false);
  const figure = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = figure.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.classList.toggle('out-of-view', !entry.isIntersecting);
    });
    const visibility = () => element.classList.toggle('tab-hidden', document.hidden);
    observer.observe(element);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  return <figure ref={figure} className={'instrument' + (paused ? ' paused' : '')} onPointerMove={event => {
    if (paused || !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--tilt-x', ((event.clientY - bounds.top) / bounds.height * -8 + 4) + 'deg');
    event.currentTarget.style.setProperty('--tilt-y', ((event.clientX - bounds.left) / bounds.width * 8 - 4) + 'deg');
  }} onPointerLeave={event => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  }}>
    <svg className="circuit-map" viewBox="0 0 600 600" aria-hidden="true"><g fill="none" stroke="currentColor"><path d="M40 110h95l70 70M565 160h-80l-55 55M10 420h115l75-75M555 465h-90l-60-60M300 20v110M310 480v100"/><circle cx="300" cy="300" r="245" strokeDasharray="2 13"/><circle cx="300" cy="300" r="205" strokeDasharray="110 280"/></g></svg>
    <div className="sculpture-tilt"><img className="sculpture" src="/refinery-core.webp" width="1100" height="1100" fetchPriority="high" alt="Interwoven metallic ribbons surrounding a glowing amber refinery core" /></div>
    <span className="object-note note-top"><i /> RAW POTENTIAL</span>
    <span className="object-note note-bottom">REFINED THROUGH PRACTICE <i /></span>
    <figcaption><span><span className="signal" /> THE DIGITAL REFINERY</span><button className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Play motion' : 'Pause motion'}</button></figcaption>
  </figure>;
}

function Process() {
  const [selected, select] = useState(0);
  const steps = [
    ['Simulate Industry Environments', 'Start with a broken artifact and the context to understand the work.'],
    ['Debug Under Pressure', 'Investigate the failure, fix it and show your reasoning under review.'],
    ['Ship Real Projects', 'Deliver the finished work and evidence that a reviewer can inspect.']
  ];
  return <section className="band wrap" id="process" data-reveal><p className="eyebrow">03 / THE METHOD</p><h2>Three Steps to Job-Ready</h2>
    <ol className="process">{steps.map(([title, description], index) => <li className={index === selected ? 'selected' : ''} key={title}>
      <button type="button" aria-pressed={index === selected} onClick={() => select(index)}><span>0{index + 1}</span>{title}</button><p>{description}</p>
    </li>)}</ol></section>;
}

function Home() {
  return <>
    <section className="hero"><div className="wrap hero-layout">
      <div className="hero-copy"><p className="hero-badge"><span className="signal" /> BEYOND THEORY.</p><h1><span>From Theory to</span><br />Production-<br /><em>Ready.</em></h1>
        <p className="intro">Work on real artifacts and tickets across Tech, Management, Engineering and Medical. Fix what breaks under review, then ship proof of what you can do.</p>
        <div className="actions"><a href="/signup.html" className="button primary">Get Early Access ↗</a><a className="button" href="#process">See How It Works ↓</a></div>
        <div className="hero-facts"><div><strong>26</strong><span>INDUSTRY LABS</span></div><div><strong>04</strong><span>CORE AREAS</span></div><div><strong>09</strong><span>WEEKS OF PRACTICE</span></div></div>
      </div><RefineryCore /></div><div className="domain-rail wrap">{areas.map(area => <span key={area.name}><i>{area.icon}</i>{area.name}</span>)}</div></section>
    <section className="band wrap gap-section" data-reveal><p className="eyebrow">01 / THE INDUSTRY GAP</p><h2>Where theory meets<br /><span className="muted-heading">real work.</span></h2>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="panel perspective"><span className="perspective-icon" aria-hidden="true">⌘</span><p className="eyebrow">THE EMPLOYER PERSPECTIVE</p><h3>The hiring manager’s frustration</h3><ul><li>Unfamiliar work takes longer to navigate.</li><li>Failures rarely come with clear instructions.</li><li>Senior engineers spend time supervising basics.</li><li>Shipping independently takes practice.</li></ul></article>
        <article className="panel perspective"><span className="perspective-icon" aria-hidden="true">↗</span><p className="eyebrow">THE GRADUATE PERSPECTIVE</p><h3>The graduate’s reality</h3><ul><li>Academic exercises start with clean examples.</li><li>Messy artifacts are unfamiliar.</li><li>Feedback on real fixes is hard to get.</li><li>Employers need work they can inspect.</li></ul></article>
      </div></section>
    <section className="artifact"><div className="band wrap artifact-layout" data-reveal><div className="artifact-visual" aria-hidden="true"><div className="artifact-orbit" /><div className="evidence-card evidence-back"><span>01 / INVESTIGATE</span><strong>Find the fracture.</strong><div className="code-lines"><i/><i/><i/></div></div><div className="evidence-card evidence-front"><span>02 / REVIEW & REFINE</span><strong>Make the fix.<br />Show the proof.</strong><div className="evidence-line"><span>ARTIFACT</span><b>→</b><span>DELIVERABLE</span></div></div></div><div><p className="eyebrow">02 / THE LABS</p><h2>Real Bugs.<br />Real Artifacts.<br /><em>Real Pressure.</em></h2><p>Take on the kind of work people encounter in industry. Investigate the issue, get your fix reviewed and ship a deliverable with evidence.</p><a className="button" href="/labs.html">Explore All Labs ↗</a></div></div></section>
    <section className="band wrap" data-reveal><p className="eyebrow">THE CATALOGUE</p><h2>26 Labs, 4 Areas.</h2><p>The artifact changes by domain. The method does not: work on a broken artifact, fix it under review, ship with proof.</p>
      <div className="area-grid">{areas.map(area => <article className="panel area" key={area.name}><span className="area-count">{String(area.labs.length).padStart(2, '0')} LABS</span><span aria-hidden="true" className="glyph">{area.icon}</span><h3>{area.name}</h3>
        <ul>{area.labs.slice(0,3).map(name => <li key={name}>{name}</li>)}</ul>
        {area.labs.length > 3 && <p>+ {area.labs.length - 3} more</p>}<a href="/labs.html">Explore <span className="sr-only">{area.name}</span> ↗</a>
      </article>)}</div><p className="terms">All 26 labs <strong>{status}</strong> · {terms} · <a href="/labs.html">Explore all 26 labs</a></p>
    </section><Process />
    <section className="band wrap" data-reveal><p className="eyebrow">04 / THE OUTPUT</p><h2>What You Get</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{['Industry-simulation labs','Real codebase and artifact work','Project-based assessments','Hiring-ready certification backed by demonstrated work','Company talent pipeline','Mentor-led reviews'].map((benefit, index) => <article className="panel" key={benefit}><span className="eyebrow">0{index + 1}</span><h3>{benefit}</h3></article>)}</div>
    </section><section className="band wrap closing"><h2>Ready to Close the Gap?</h2><div className="actions"><a className="button primary" href="/companies.html">I’m Hiring ↗</a><a className="button" href="/students.html">I’m a Graduate ↗</a></div></section>
  </>;
}

function Catalogue() {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState('');
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const matches = labs.filter(lab => (!domain || lab.area === domain) && lab.name.toLowerCase().includes(query.trim().toLowerCase()));
  return <section className="band wrap"><p className="eyebrow">THE CATALOGUE</p><h1>26 Labs, 4 Areas.</h1><p>{terms}</p>
    {ready && <div className="filters"><label>Find a lab<input type="search" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <label>Area<select value={domain} onChange={event => setDomain(event.target.value)}><option value="">All areas</option>{areas.map(area => <option key={area.name}>{area.name}</option>)}</select></label>
      <p role="status">{matches.length} labs shown.</p></div>}
    {areas.map(area => {
      const items = matches.filter(lab => lab.area === area.name);
      return items.length > 0 && <section className="catalogue-group" key={area.name}><h2>{area.icon} {area.name} <small>({area.labs.length})</small></h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(lab => <a className="panel lab-card" key={lab.path} href={lab.path}><span className="tag">{status}</span><h3>{lab.name}</h3><span>View lab ↗</span></a>)}</div></section>;
    })}
  </section>;
}

function LabDetail({ lab }: { lab: typeof labs[number] }) {
  return <article className="band wrap narrow"><p className="eyebrow">{lab.slug}</p><h1>{lab.name}</h1><p>{lab.area}</p><h2>Nine-week curriculum</h2>
    <ol className="curriculum">{phases.map((phase, index) => <li key={phase}><p className="eyebrow">{weeks[index]}</p><h3>{phase}</h3>{index === 1 && <p>Investigate a {lab.artifact} relevant to the lab.</p>}</li>)}</ol>
    <p>Completion proof includes a shipped deliverable, reviewed fixes, scorecard and capstone post-mortem, plus a verified badge and completion certificate.</p>
    <div className="panel"><p>{terms}</p><p className="tag">{status}</p><LabSignup source={lab.name} /></div></article>;
}

const utility: Record<string, { title: string; text: string; source?: string }> = {
  '/students.html': { title: 'For Students & Graduates', text: 'Practice the work you’ll meet on the job. Investigate a broken artifact, get feedback on your fix, navigate existing work and ship a deliverable someone can inspect.', source: 'Students' },
  '/companies.html': { title: 'For Companies', text: 'Job readiness shows up in the work: a fix a reviewer can inspect, a scorecard and a post-mortem that explain what changed. Enquire about the Bug Refinery talent pipeline.', source: 'Companies' },
  '/about.html': { title: 'Beyond Theory.', text: 'Bug Refinery bridges the gap between theory and practical work with industry-simulation labs across four areas.' },
  '/contact.html': { title: 'Contact Bug Refinery', text: 'Send us an enquiry or reach support directly.', source: 'Contact' },
  '/signup.html': { title: 'Get Early Access', text: 'Register interest in Bug Refinery labs. This form is for interest only.', source: 'Sign Up' }
};

export function App({ path }: { path: string }) {
  const lab = labs.find(item => item.path === path);
  const page = utility[path];
  return <><a href="#content" className="skip">Skip to content</a><Header path={path} /><Motion />
    <main id="content">
      {path === '/' ? <Home /> : path === '/labs.html' ? <Catalogue /> : lab ? <LabDetail lab={lab} /> : page ?
        <section className="band wrap narrow"><p className="eyebrow">BUG REFINERY / BEYOND THEORY</p><h1>{page.title}</h1><p className="intro">{page.text}</p>
          {page.source === 'Students' && <ol className="curriculum">{phases.map((phase, i) => <li key={phase}><span className="eyebrow">{weeks[i]}</span><p>{phase}</p></li>)}</ol>}
          {path === '/about.html' && <p>Foundry is our future development wing. <a href={foundry}>Foundry · Coming Soon ↗</a></p>}
          {path === '/contact.html' && <p><a href={'mailto:' + support}>{support}</a></p>}
          {page.source && <LeadForm source={page.source} />}
        </section> : <section className="band wrap"><h1>Page not found</h1><a href="/">Back to Bug Refinery</a></section>}
    </main>
    <footer className="footer"><div className="wrap"><Brand /><nav aria-label="Footer">{footer.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a href="https://www.instagram.com/bugrefinerylabs/">Instagram</a><a href="https://www.linkedin.com/company/bugrefinerylabs/">LinkedIn</a></nav><p>© Bug Refinery</p></div></footer>
    <CookieChoice />
  </>;
}

export function pageTitle(path: string) {
  const page = pages.find(item => item.path === path);
  return page ? page.name + ' | Bug Refinery' : 'Page not found | Bug Refinery';
}
