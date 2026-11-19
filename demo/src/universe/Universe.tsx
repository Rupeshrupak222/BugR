import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { areas, benefits, foundry, proof, steps, terms } from '../data';
import { chapters } from './journey';
import type { mountUniverse } from './engine';
import './universe.css';

export function Universe() {
  const root = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLButtonElement>(null);
  const control = useRef<ReturnType<typeof mountUniverse> | null>(null);
  const notes = useRef<HTMLDialogElement>(null);
  const notesTrigger = useRef<HTMLElement | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inspect, setInspect] = useState(false);
  const [menu, setMenu] = useState(false);
  const [lightweight, setLightweight] = useState(false);
  const [quality, setQuality] = useState('Adaptive');
  const settings = useRef({ paused: false, inspect: false });

  useEffect(() => {
    setEnhanced(true);
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let revision = 0;
    const refresh = () => {
      const version = ++revision;
      control.current?.dispose();
      control.current = null;
      setReady(false);
      if (preference.matches || lightweight) return;
      void import('./engine').then(({ mountUniverse }) => {
        if (version !== revision || !host.current || !root.current || !label.current) return;
        try {
          control.current = mountUniverse(host.current, root.current, label.current, {
            ready: setReady, quality: setQuality,
            select: () => setInspect(value => !value),
            chapter: index => { setActive(index); setInspect(false); }
          });
          control.current.pause(settings.current.paused);
        } catch { setReady(false); }
      }).catch(() => setReady(false));
    };
    refresh();
    preference.addEventListener('change', refresh);
    return () => { revision++; control.current?.dispose(); control.current = null; preference.removeEventListener('change', refresh); };
  }, [lightweight]);

  useEffect(() => { settings.current.inspect = inspect; control.current?.inspect(inspect); }, [inspect]);
  useEffect(() => { settings.current.paused = paused; control.current?.pause(paused); }, [paused]);

  function go(index: number, event?: MouseEvent<HTMLAnchorElement>) {
    if (!ready) return;
    event?.preventDefault();
    control.current?.go(index);
    history.replaceState(null, '', '#' + chapters[index].id);
    setMenu(false);
  }
  function openNotes(event: MouseEvent<HTMLButtonElement>) {
    notesTrigger.current = event.currentTarget;
    notes.current?.showModal();
  }
  const chapter = chapters[active];
  return <div ref={root} className={'industry-universe' + (ready ? ' is-live' : '') + (enhanced ? ' is-enhanced' : '')} data-chapter={active}>
    <div className="universe-surface" ref={host} aria-hidden="true" />
    <div className="universe-vignette" aria-hidden="true" />
    <header className="universe-header" onKeyDown={event => { if (event.key === 'Escape' && menu) { setMenu(false); menuButton.current?.focus(); } }}>
      <a className="universe-brand" href="/" aria-label="Bug Refinery home"><img src="/assets/brand.svg" width="30" height="30" alt="" /><span>BUG REFINERY<small>THE INDUSTRY UNIVERSE</small></span></a>
      <div className="universe-header-actions">
        {ready && <button className="quiet-control pause-universe" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? '▷ Play 3D' : 'Ⅱ Pause 3D'}</button>}
        <a className="universe-signup" href="/signup.html">Sign Up <span aria-hidden="true">↗</span></a>
        {enhanced && <button className="quiet-control" ref={menuButton} type="button" aria-label="Menu" aria-expanded={menu} aria-controls="universe-directory" onClick={() => setMenu(value => !value)}>{menu ? 'Close −' : 'Index +'}</button>}
      </div>
      <nav id="universe-directory" className={menu ? 'open' : ''} aria-label="Main navigation">
        {[['/labs.html', 'All 26 Labs'], ['/students.html', 'For Students'], ['/companies.html', 'For Companies'], ['/about.html', 'About'], ['/contact.html', 'Contact'], [foundry, 'Foundry ↗']].map(([href, text]) => <a key={href} href={href}>{text}</a>)}
        <span className="directory-mode">{ready ? 'Immersive review demo' : 'Reading view'}</span>
        {enhanced && <button type="button" onClick={() => { setLightweight(value => !value); setMenu(false); }}>{lightweight ? 'Try immersive view' : 'Use reading view'}</button>}
      </nav>
    </header>

    <div className="universe-register"><span>26 LABS <b>/</b> 4 INDUSTRIES <b>/</b> 9 WEEKS</span><span className="universe-signal">{ready ? 'LIVE ENVIRONMENT' : 'BEYOND THEORY'}</span></div>
    <div className="journey-track">
      {chapters.map((item, index) => {
        const area = index > 0 && index < 5 ? areas[index - 1] : null;
        return <section id={item.id} key={item.id} className={'journey-chapter' + (active === index ? ' current' : '')} aria-label={item.name} inert={ready && active !== index ? true : undefined}>
          <div className="journey-copy">
            <p className="journey-eyebrow">{String(index + 1).padStart(2, '0')} / {item.name}{area && <span> {area.labs.length} LABS</span>}</p>
            {index === 0 ? <h1>BEYOND<br /><em>THEORY.</em></h1> : <h2>{item.title}</h2>}
            {index === 0 && <p className="universe-manifesto">FROM THEORY TO PRODUCTION-READY.</p>}
            <p className="journey-description">{item.description}</p>
            <div className="journey-actions">
              {index === 0 ? <><a className="universe-cta" href="/signup.html">Sign Up <span>↗</span></a><a href="#process" onClick={event => go(5, event)}>See how it works ↓</a></>
                : area ? <><a className="universe-cta" href={'/labs.html#' + area.id}>Explore {area.labs.length} labs ↗</a><button type="button" hidden={!enhanced} onClick={openNotes}>Field notes +</button></>
                : index === 5 ? <><button className="universe-cta" type="button" hidden={!enhanced} onClick={openNotes}>Explore the method +</button><a href="/students.html">For students ↗</a></>
                : <><a className="universe-cta" href="/signup.html">Register interest ↗</a><a href="/companies.html">I’m hiring ↗</a></>}
            </div>
            {index === 6 && <p className="journey-terms">{terms} · STARTING SOON</p>}
          </div>
          <div className="reading-content">
            {index === 0 && <p>Explore four connected industries. The interactive environment is an illustrative concept demo. Scroll or use the scene navigator to travel, and select an artifact to inspect its structure.</p>}
            {area && <><svg viewBox="0 0 320 160" aria-hidden="true"><use href={'/assets/artifacts.svg#' + area.id} /></svg><h3>{area.title}</h3><p><strong>Before</strong> {area.before}</p><p><strong>Reviewed work</strong> {area.after}</p><p>Illustrative artifact scenario.</p><ul className="reading-labs">{area.labs.map(lab => <li key={lab.path}><a href={lab.path}>{lab.name} ↗</a></li>)}</ul></>}
            {index === 5 && <Method />}
            {index === 6 && <><a href="/labs.html">Browse all 26 labs ↗</a><p>BUG REFINERY — BEYOND THEORY.<br />SIMULATE. DEBUG. SHIP.</p></>}
          </div>
        </section>;
      })}
    </div>

    <button ref={label} className="spatial-label" type="button" hidden={!ready} aria-pressed={inspect} onClick={() => setInspect(value => !value)}><span className="spatial-cross" aria-hidden="true">+</span><span><small>ILLUSTRATIVE ARTIFACT / {String(active + 1).padStart(2, '0')}</small>{chapter.artifact}<b>{inspect ? 'RECONNECT −' : 'INSPECT STRUCTURE +'}</b></span></button>
    {ready && <aside className="universe-telemetry" aria-label="Current scene"><span>SECTOR {String(active + 1).padStart(2, '0')} / 07</span><strong>{chapter.name}</strong><small>{chapter.coordinate} <i>·</i> {quality}</small><span className="interaction-hint">{inspect ? 'COMPONENTS SEPARATED' : paused ? 'MOTION PAUSED · SCROLL TO NAVIGATE' : 'SCROLL TO TRAVEL · SELECT TO INSPECT'}</span></aside>}
    <nav className="journey-nav" aria-label="Scene navigation">
      <a className="journey-all-labs" href="/labs.html">26 Labs ↗</a>
      <ol>{chapters.map((item, index) => <li key={item.id}><a href={'#' + item.id} onClick={event => go(index, event)} aria-current={ready && active === index ? 'step' : undefined} aria-label={item.name}><span className="journey-node">{String(index + 1).padStart(2, '0')}</span><span className="journey-node-title">{item.short}</span></a></li>)}</ol>
      {ready && <button type="button" className="next-sector" onClick={() => go(active === 6 ? 0 : active + 1)} aria-label={active === 6 ? 'Return to start' : 'Next scene'}>{active === 6 ? '↺' : '→'}</button>}
    </nav>
    <div className="journey-progress" aria-hidden="true"><div /></div>
    <p className="sr-only" aria-live="polite">{ready ? 'Exploring ' + chapter.name + '. Scene ' + (active + 1) + ' of 7.' : 'Reading view. All industry information is available below.'}</p>

    <dialog className="universe-notes" ref={notes} onClose={() => notesTrigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) notes.current?.close(); }}>
      <button className="notes-close" type="button" onClick={() => notes.current?.close()} autoFocus>Close ×</button>
      <p className="journey-eyebrow">FIELD NOTES / {chapter.name}</p>
      {active > 0 && active < 5 ? <><h2>{areas[active - 1].title}</h2><p className="notes-disclaimer">Illustrative scenario. The 3D object is a conceptual model.</p><h3>Before</h3><p>{areas[active - 1].before}</p><h3>Reviewed work</h3><p>{areas[active - 1].after}</p><h3>{areas[active - 1].labs.length} labs in this world</h3><ul>{areas[active - 1].labs.map(lab => <li key={lab.path}><a href={lab.path}>{lab.name} ↗</a></li>)}</ul><p>{terms} · STARTING SOON</p></> : <Method />}
    </dialog>
  </div>;
}

function Method() {
  return <div className="method-notes"><h3>The gap between theory and real work</h3><p>Academic exercises often isolate one concept and start with a clean brief. Industry work means tracing an unfamiliar artifact, checking a correction and explaining the handoff.</p>
    <h3>For hiring managers</h3><ul><li>Work begins with an existing system or artifact.</li><li>Faults rarely come with a complete explanation.</li><li>Teams need to see how a correction was checked.</li><li>A handoff must explain what changed.</li></ul>
    <h3>For graduates</h3><ul><li>Exercises tend to isolate a single concept.</li><li>Projects can start from an empty file.</li><li>Unfamiliar work requires tracing someone else’s decisions.</li><li>A fix needs to hold up in review.</li></ul>
    <ol>{steps.map(([title, description]) => <li key={title}><h3>{title}</h3><p>{description}</p></li>)}</ol><h3>Proof you can show</h3><ul>{proof.map(item => <li key={item}>{item}</li>)}</ul>{benefits.map(([title, description]) => <p key={title}><strong>{title}.</strong> {description}</p>)}</div>;
}
