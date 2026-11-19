import { useEffect, useId, useRef, useState } from 'react';
import { LeadForm } from '../../src/LeadForm';
import { DomainRail, Eyebrow, PageHero, SectionHead } from './Layout';
import { areas, phases, price, status, terms, type Lab } from './data';

export function Catalogue() {
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  useEffect(() => setReady(true), []);
  const query = search.trim().toLowerCase();
  const groups = areas.map(area => ({
    ...area,
    results: (!filter || area.id === filter) ? area.labs.filter(lab => lab.name.toLowerCase().includes(query)) : []
  }));
  const count = groups.reduce((total, area) => total + area.results.length, 0);
  function clear() {
    setSearch('');
    setFilter('');
  }

  return <>
    <PageHero label="THE LAB INDEX / 26 LABS · 4 AREAS" title={<>Find your <em>workbench.</em></>} text="Explore the artifacts you’ll work on and the proof you’ll build in each nine-week simulation." artwork="index" />
    <div className="wrap"><DomainRail withinCatalogue onSelect={clear} /><p className="catalogue-terms">{status} · {terms}</p></div>
    <section className="wrap section catalogue" aria-label="All labs">
      {ready && <div className="filters">
        <div className="filter-control"><label htmlFor="lab-search">Find a lab</label>
          <input id="lab-search" type="search" placeholder="Search by lab name" value={search} onChange={event => setSearch(event.target.value)} /></div>
        <div className="filter-control"><label htmlFor="lab-area">Area</label>
          <select id="lab-area" value={filter} onChange={event => setFilter(event.target.value)}>
            <option value="">All areas</option>{areas.map(area => <option value={area.id} key={area.id}>{area.name}</option>)}
          </select></div>
        <button type="button" className="button" onClick={clear}>Clear filters</button><p role="status">{count} {count === 1 ? 'lab' : 'labs'} shown.</p>
      </div>}
      {count === 0 && <p className="no-match panel">No labs match your search. Try another name or clear the filters.</p>}
      {groups.map(area => <section className="catalogue-group" id={area.id} key={area.id} hidden={!area.results.length}>
        <SectionHead label={`FILE ${area.number} / ${area.labs.length} LABS`} title={area.name} text={area.description} />
        <div className="lab-grid">{area.results.map(lab => <a className="lab-card panel" href={lab.path} key={lab.path}>
          <span className="card-register"><span>{area.number}.{String(area.labs.indexOf(lab) + 1).padStart(2, '0')}</span><span className="tag">{status}</span></span>
          <h3>{lab.name}</h3><p><strong>Simulate</strong> {lab.simulate}</p><p><strong>Proof</strong> {lab.summaryProof}</p>
          <span className="text-link">View curriculum <span aria-hidden="true">↗</span></span>
        </a>)}</div>
      </section>)}
    </section>
  </>;
}

function SignupDialog({ lab }: { lab: Lab }) {
  const trigger = useRef<HTMLAnchorElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const title = useId();
  return <>
    <a ref={trigger} className="button primary" href="/signup.html" aria-label={'Sign up for ' + lab.name} onClick={event => {
      if (!dialog.current || typeof dialog.current.showModal !== 'function' ||
        event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      dialog.current.showModal();
      setOpen(true);
    }}>{lab.cta}</a>
    <dialog ref={dialog} aria-labelledby={title} onCancel={event => { if (busy) event.preventDefault(); }} onClose={() => {
      setOpen(false);
      trigger.current?.focus();
    }}>
      <div className="dialog-head"><h2 id={title}>{lab.name}</h2>
        <button type="button" className="button" disabled={busy} onClick={() => dialog.current?.close()}>Close</button>
      </div>
      <p>Register your interest in this lab.</p>
      {open && <LeadForm source={lab.name} submitLabel="Sign Up" onBusyChange={setBusy} />}
    </dialog>
  </>;
}

export function LabPage({ lab }: { lab: Lab }) {
  const area = areas.find(item => item.id === lab.domain)!;
  return <>
    <div className="wrap breadcrumbs"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href={'/labs.html#' + area.id}>{area.name}</a> / <span aria-current="page">{lab.name}</span></nav></div>
    <PageHero label={`${area.name} / ${lab.slug}`} title={lab.name} text={lab.simulate} artwork={area.id}>
      <p className="lab-problem"><strong>Bug found</strong> {lab.bug}</p><span className="tag">{status}</span>
    </PageHero>
    <div className="wrap curriculum-layout">
      <aside className="curriculum-index"><Eyebrow>9-WEEK CURRICULUM</Eyebrow>
        <nav aria-label="Curriculum phases">{phases.map(([week, title], index) =>
          <a key={week} href={'#phase-0' + (index + 1)}><span className="index">0{index + 1}</span><strong>{title}</strong><small>{week}</small></a>
        )}</nav>
      </aside>
      <article className="curriculum">
        {lab.curriculum.map((phase, index) => <section className="curriculum-phase" id={'phase-0' + (index + 1)} key={phase.heading}>
          <Eyebrow>PHASE 0{index + 1} / {phases[index][0]}</Eyebrow><h2>{phase.heading}</h2>
          {phase.body && <p className="phase-body">{phase.body}</p>}
          {phase.items.length > 0 && <ul className="phase-items">{phase.items.map(item => <li key={item}>{item}</li>)}</ul>}
        </section>)}
        <section className="panel lab-proof"><Eyebrow>SHIP / DELIVERABLE</Eyebrow><h2>Proof you can show.</h2><p className="lab-output">{lab.proof}</p><p>Verified badge · Completion certificate per lab</p></section>
        <section className="panel lab-pricing" aria-label="Lab pricing and registration">
          <div><p className="price">{price} <span>/ lab</span></p><p>9 weeks · Cohort 30</p><p>{lab.priceNote}</p></div>
          <div><p className="tag">{status}</p><SignupDialog lab={lab} /></div>
        </section>
        <a className="text-link back" href={'/labs.html#' + area.id}>← Back to labs</a>
      </article>
    </div>
  </>;
}
