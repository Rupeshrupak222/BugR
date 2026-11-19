import type { ReactNode } from 'react';
import { LeadForm } from '../../src/LeadForm';
import { Button, DomainCards, DomainRail, Eyebrow, PageHero, SectionHead } from './Layout';
import { areas, foundry, phases, proof, status, support, terms } from './data';

function Proof({ title }: { title: ReactNode }) {
  return <section className="wrap section"><SectionHead label="THE EVIDENCE" title={title} />
    <div className="benefits-grid">{proof.map((item, index) => <article key={item}><span className="index">0{index + 1}</span><h3>{item}</h3></article>)}</div>
  </section>;
}

function Enquiry({ id, source, title, children, submit }: { id: string; source: string; title: ReactNode; children: ReactNode; submit: string }) {
  return <section className="wrap section enquiry" id={id}><div><Eyebrow>BUG REFINERY / BEYOND THEORY</Eyebrow><h2>{title}</h2>{children}</div>
    <LeadForm source={source} submitLabel={submit} /></section>;
}

function Students() {
  return <>
    <PageHero label="FOR STUDENTS & GRADUATES" title={<>Practice the work <em>you’ll meet.</em></>}
      text="Get experience with unfamiliar artifacts, practical fixes and reviewed deliverables across all four industry areas." artwork="engineering">
      <div className="actions"><Button href="/signup.html" primary>Get Early Access</Button><Button href="#program">See the Curriculum</Button></div>
    </PageHero>
    <section className="wrap section"><SectionHead label="THE GAP" title={<>From clean briefs to <em>real artifacts.</em></>}
      text="In a simulation, you start with someone else’s work. You investigate the context, explain your fix and deliver evidence that shows how you checked it." />
      <DomainRail /></section>
    <section className="wrap section" id="program"><SectionHead label="26 LABS / FOUR AREAS" title={<>Nine weeks <em>of practice.</em></>} />
      <div className="phase-grid">{phases.map(([week, title, text]) => <article className="panel" key={week}><Eyebrow>{week}</Eyebrow><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="terms-line"><p>{status} · {terms}</p><a className="text-link" href="/labs.html">Explore the 26 labs ↗</a></div>
    </section>
    <Proof title={<>Build work you can <em>show.</em></>} />
    <Enquiry id="waitlist" source="Students" title={<>Join the student <em>waitlist.</em></>} submit="Join the Waitlist"><p>{status} · {terms}</p></Enquiry>
  </>;
}

function Companies() {
  return <>
    <PageHero label="FOR COMPANIES" title={<>See what graduates <em>can do.</em></>}
      text="Inspect a reviewed fix, a work scorecard and a post-mortem that explain what changed. Enquire about the Bug Refinery talent pipeline." artwork="management">
      <div className="actions"><Button href="#contact" primary>Talk to Us</Button></div>
    </PageHero>
    <section className="wrap section"><SectionHead label="THE HIRING GAP" title={<>Ask about <em>the work.</em></>}
      text="Production issues come with unfamiliar systems, incomplete documentation and trade-offs. Simulation gives graduates practice working through those conditions." />
      <div className="phase-grid">{areas.map(area => <article className="panel" key={area.id}><Eyebrow>{area.name}</Eyebrow><h3>{area.title}</h3><p>{area.after}</p></article>)}</div>
    </section>
    <Proof title={<>What a graduate <em>can demonstrate.</em></>} />
    <Enquiry id="contact" source="Companies" title={<>Tell us about your <em>hiring needs.</em></>} submit="Send Message">
      <p>Share what your team looks for in early-career talent.</p>
    </Enquiry>
  </>;
}

function About() {
  return <>
    <PageHero label="ABOUT BUG REFINERY" title={<>Beyond <em>theory.</em></>}
      text="Bug Refinery helps theory-strong graduates build practical industry capability by investigating broken artifacts, fixing them under review and shipping evidence." artwork="index" />
    <section className="wrap section"><SectionHead label="FOUR AREAS / ONE METHOD" title={<>The artifact changes. <em>The method holds.</em></>}
      text="The lab starts with the kind of work people do in that field. Your deliverable and the evidence behind it give a reviewer something concrete to inspect." />
      <DomainCards /></section>
    <Proof title={<>Work that can <em>be reviewed.</em></>} />
    <section className="wrap section"><div className="panel foundry"><div><Eyebrow>FUTURE DEVELOPMENT WING</Eyebrow><h2>Foundry.</h2><p>Foundry is the future development wing of Bug Refinery.</p></div>
      <div><p className="tag">Coming Soon</p><Button href={foundry}>Visit Foundry</Button></div></div></section>
  </>;
}

function Contact() {
  return <section className="wrap page-hero enquiry contact-page" id="contact"><div><Eyebrow>CONTACT / SUPPORT</Eyebrow><h1>Contact <em>Bug Refinery.</em></h1>
    <p className="lede">Send us an enquiry or reach support directly.</p><a className="support-link" href={'mailto:' + support}>{support}</a>
    <p><a href="/students.html#waitlist">Visit the student waitlist ↗</a></p></div><LeadForm source="Contact" submitLabel="Send Message" /></section>;
}

function SignUp() {
  return <section className="wrap page-hero enquiry" id="interest"><div><Eyebrow>EARLY ACCESS / INTEREST</Eyebrow><h1>Ready to close <em>the gap?</em></h1>
    <p className="lede">Register your interest in Bug Refinery labs. This form collects enquiries only.</p><p>{status} · {terms}</p>
    <div className="actions"><Button href="/students.html#waitlist">I’m a Graduate</Button><Button href="/companies.html#contact">I’m Hiring</Button></div></div>
    <LeadForm source="Sign Up" submitLabel="Register Interest" /></section>;
}

export const mainPages = {
  '/students.html': Students,
  '/companies.html': Companies,
  '/about.html': About,
  '/contact.html': Contact,
  '/signup.html': SignUp
};
