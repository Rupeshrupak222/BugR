import { ArrowUpRight } from 'lucide-react';
import { type Lab, price, status } from '../data';

export function InlineLab({ lab, onRegister }: { lab: Lab; onRegister: (source: string) => void }) {
  return <details className="inline-lab" id={'lab-' + lab.slug}>
    <summary><span>{lab.name}</span><span className="inline-lab-toggle" aria-hidden="true">+</span></summary>
    <div className="inline-lab-body">
      <p><strong>Simulate</strong> {lab.simulate}</p><p><strong>Bug found</strong> {lab.bug}</p>
      <div className="inline-curriculum">{lab.curriculum.map((phase, index) => <section className="inline-phase" key={index}><h4>{phase.heading}</h4>{phase.body && <p>{phase.body}</p>}{phase.items.length > 0 && <ul>{phase.items.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}</div>
      <div className="inline-proof"><h4>Proof you can show</h4><p>{lab.proof}</p><p>Verified badge · Completion certificate per lab</p></div>
      <div className="inline-pricing"><div><p className="inline-price">{price} <span>/ lab</span></p><p>9 weeks · Cohort 30</p><p>{lab.priceNote}</p><p>{status}</p></div><a className="liquid-glass landing-pill" href="#signup" onClick={() => onRegister(lab.name)}>Register for this lab <ArrowUpRight size={16} /></a></div>
    </div>
  </details>;
}
