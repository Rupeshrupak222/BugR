import { useEffect, useRef, useState, type ReactNode } from 'react';
import { areas, foundry } from './data';


const nav = [
  ['/labs.html', 'Labs'], ['/students.html', 'For Students'], ['/companies.html', 'For Companies'],
  ['/about.html', 'About'], ['/contact.html', 'Contact'], [foundry, 'Foundry ↗']
];

export function Button({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  return <a className={primary ? 'button primary' : 'button'} href={href}>{children} <span aria-hidden="true">{href.startsWith('#') ? '↓' : '↗'}</span></a>;
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function Art({ id }: { id: string }) {
  return <svg className="artifact" viewBox="0 0 320 160" aria-hidden="true" focusable="false"><use href={'/assets/artifacts.svg#' + id} /></svg>;
}
export function SectionHead({ label, title, text }: { label: string; title: ReactNode; text?: string }) {
  return <div className="section-head"><div><Eyebrow>{label}</Eyebrow><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}
export function PageHero({ label, title, text, artwork, children }: { label: string; title: ReactNode; text: string; artwork: string; children?: ReactNode }) {
  return <section className="wrap page-hero"><div><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p className="lede">{text}</p>{children}</div>
    <div className="page-art"><Art id={artwork} /></div>
  </section>;
}

function Brand() {
  return <a className="brand" href="/"><img src="/assets/brand.svg" width="36" height="36" alt="" /><span>Bug Refinery</span></a>;
}

function Header({ path }: { path: string }) {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLButtonElement>(null);
  useEffect(() => setReady(true), []);
  return <header className="site-header"><div className={'wrap header-inner' + (ready ? ' enhanced' : '')} onKeyDown={event => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      menu.current?.focus();
    }
  }}><Brand />
    <div id="world-controls" />
    <button ref={menu} type="button" className="menu-toggle" aria-controls="site-nav" aria-expanded={open} hidden={!ready} onClick={() => setOpen(value => !value)}>Menu <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="site-nav" className={open ? 'open' : ''} aria-label="Main navigation">
      {nav.map(([href, name]) => <a key={href} href={href} onClick={() => setOpen(false)}
        aria-current={path === href ? 'page' : href === '/labs.html' && path.startsWith('/labs/') ? 'location' : undefined}>{name}</a>)}
      <a className="button primary" href="/signup.html" aria-current={path === '/signup.html' ? 'page' : undefined}>Sign Up <span aria-hidden="true">↗</span></a>
    </nav>
  </div></header>;
}

function Footer() {
  return <footer className="site-footer"><div className="wrap"><div className="footer-top"><Brand />
    <nav aria-label="Footer">{nav.map(([href, name]) => <a key={href} href={href}>{name}</a>)}<a href="/signup.html">Sign Up</a>
      <a href="https://www.linkedin.com/company/bugrefinerylabs/">LinkedIn</a><a href="https://www.instagram.com/bugrefinerylabs/">Instagram</a></nav>
  </div><p className="signoff">BEYOND THEORY.</p><p className="footer-note">© Bug Refinery <span>SIMULATE / DEBUG / SHIP</span></p></div></footer>;
}

function CookieChoice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try { setVisible(!localStorage.getItem('br_cookie_consent')); }
    catch { setVisible(true); }
  }, []);
  function choose(choice: string) {
    try { localStorage.setItem('br_cookie_consent', choice); }
    catch { /* The visitor can still dismiss the banner when storage is blocked. */ }
    setVisible(false);
  }
  return <aside className="cookie" aria-label="Cookie choice" hidden={!visible}><p>This site stores only your cookie choice in your browser. It uses no tracking, advertising or analytics cookies.</p>
    <div className="actions"><button type="button" className="button" onClick={() => choose('dismissed')}>Dismiss</button><button type="button" className="button primary" onClick={() => choose('accepted')}>Accept</button></div>
  </aside>;
}

export function DomainRail({ withinCatalogue = false, onSelect }: { withinCatalogue?: boolean; onSelect?: () => void }) {
  return <nav className="domain-rail" aria-label="Simulation areas">{areas.map(area =>
    <a key={area.id} href={(withinCatalogue ? '#' : '/labs.html#') + area.id} onClick={onSelect}>
      <span className="index">{area.number}</span><strong>{area.name}</strong><small>{area.labs.length} labs</small><span aria-hidden="true">↗</span>
    </a>)}</nav>;
}

export function DomainCards({ preview = false }: { preview?: boolean }) {
  return <div className="domain-grid">{areas.map(area => <article className="domain-card" key={area.id}>
    <div className="card-register"><span>FILE {area.number}</span><span>{area.labs.length} LABS</span></div>
    <Art id={area.id} /><div className="domain-copy"><h3>{area.name}</h3><p>{area.description}</p>
      {preview && <><ul className="lab-preview">{area.labs.slice(0, 3).map(lab => <li key={lab.path}>{lab.name}</li>)}</ul>
        {area.labs.length > 3 && <p className="more">+{area.labs.length - 3} more</p>}</>}
      <a className="text-link" href={'/labs.html#' + area.id} aria-label={'Explore Labs in ' + area.name}>Explore Labs <span aria-hidden="true">↗</span></a>
    </div>
  </article>)}</div>;
}

export function Layout({ path, children }: { path: string; children: ReactNode }) {
  if (path === '/') return <><a className="skip" href="#content">Skip to content</a><main id="content">{children}</main><CookieChoice /></>;
  return <><a className="skip" href="#content">Skip to content</a><Header path={path} />
    <main id="content">{children}</main><Footer /><CookieChoice /></>;
}

