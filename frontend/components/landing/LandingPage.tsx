'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { areas, proof, terms } from '@/data/landingData';
import { QuietVideo } from './QuietVideo';
import { Reveal } from './Reveal';
import { AboutSection } from './AboutSection';
import { FeaturedVideoSection } from './FeaturedVideoSection';
import { PhilosophySection } from './PhilosophySection';
import { ServicesSection } from './ServicesSection';
import './landing.css';
import { InlineLab } from './InlineLab';
import { RegistrationSection } from './RegistrationSection';

function Navigation({ onRegister }: { onRegister: (source: string) => void }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => setReady(true), []);

  return (
    <header
      className={'landing-header' + (ready ? ' enhanced' : '')}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <div className="liquid-glass landing-nav">
        <a href="#top" className="landing-brand">
          <img src="/assets/brand.svg" alt="" width="27" height="27" />
          <span>Bug Refinery</span>
        </a>
        <nav className={open ? 'open' : ''} id="landing-navigation" aria-label="Main navigation">
          {[
            ['#labs', 'The labs'],
            ['#process', 'The method'],
            ['#about', 'About'],
          ].map(([href, title]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {title}
            </a>
          ))}
        </nav>
        <a
          href="#signup"
          className="liquid-glass landing-pill nav-signup"
          onClick={() => onRegister('Sign Up')}
        >
          Sign Up <ArrowUpRight size={15} />
        </a>
        <button
          ref={trigger}
          className="landing-menu"
          type="button"
          hidden={!ready}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="landing-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}

export function LandingPage() {
  const [source, setSource] = useState('Sign Up');

  return (
    <div className="glass-landing bg-black text-white" id="top">
      <section className="landing-hero">
        <QuietVideo name="hero" label="hero background" hero />
        <div className="hero-tint" />
        <Navigation onRegister={setSource} />
        <div className="landing-hero-copy">
          <p className="hero-kicker">
            26 LABS <span>·</span> 4 INDUSTRIES <span>·</span> 9 WEEKS
          </p>
          <h1>
            Beyond <em>theory.</em>
          </h1>
          <p className="hero-tagline">FROM THEORY TO PRODUCTION-READY.</p>
          <a className="liquid-glass hero-capsule" href="#labs">
            <span>Find your industry. Build your proof.</span>
            <span className="capsule-arrow">
              <ArrowRight size={21} />
            </span>
          </a>
          <p className="hero-subtitle">
            Real industry environments. Practical challenges.
            <br />
            Reviewed solutions. Professional proof.
          </p>
          <a className="liquid-glass landing-pill manifesto" href="#process">
            Discover the method <ArrowDown size={14} />
          </a>
        </div>
      </section>
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <section className="landing-industries landing-wrap" id="labs">
        <Reveal className="landing-section-row">
          <div>
            <p className="landing-label">FIND YOUR FIELD</p>
            <h2>
              Four industries.
              <br />
              <em>One way forward.</em>
            </h2>
          </div>
          <p>
            26 simulation labs. Each with its own artifacts,
            <br className="desktop-break" /> challenges and evidence of progress.
          </p>
        </Reveal>
        <div className="industry-list">
          {areas.map((area) => (
            <Reveal key={area.id}>
              <details className="industry-entry">
                <summary>
                  <span className="industry-number">{area.number}</span>
                  <h3>{area.name}</h3>
                  <span className="industry-count">{area.labs.length} labs</span>
                  <span className="industry-expand" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="industry-content">
                  <p>{area.description}</p>
                  <ul className="reading-labs">
                    {area.labs.map((lab) => (
                      <li key={lab.path}>
                        <InlineLab lab={lab} onRegister={setSource} />
                      </li>
                    ))}
                  </ul>
                  <p className="industry-example">
                    <strong>Illustrative challenge</strong> {area.before}
                    <br />
                    <strong>Reviewed work</strong> {area.after}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
        <p className="landing-terms">
          {terms} <span>·</span> STARTING SOON
        </p>
      </section>
      <ServicesSection onRegister={setSource} />
      <section className="landing-proof landing-wrap">
        <Reveal>
          <p className="landing-label">THE OUTCOME</p>
          <h2>
            Work you can <em>show.</em>
          </h2>
          <ul>
            {proof.map((item) => (
              <li key={item}>
                <span aria-hidden="true">↗</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
      <section className="landing-final landing-wrap">
        <Reveal>
          <p className="landing-label">YOUR NEXT STEP</p>
          <h2>
            Make your next move
            <br />
            <em>mean something.</em>
          </h2>
          <a
            className="liquid-glass landing-pill final-signup"
            href="#signup"
            onClick={() => setSource('Sign Up')}
          >
            Register your interest <ArrowUpRight size={18} />
          </a>
          <p>SIMULATE. DEBUG. SHIP.</p>
        </Reveal>
      </section>
      <RegistrationSection source={source} onSelect={setSource} />
      <footer className="landing-footer landing-wrap">
        <a className="landing-brand" href="#top">
          <img src="/assets/brand.svg" alt="" width="25" height="25" />
          Bug Refinery
        </a>
        <nav aria-label="Footer">
          {[
            ['#labs', 'All labs'],
            ['#students', 'Students'],
            ['#companies', 'Companies'],
            ['#about', 'About'],
            ['#contact', 'Contact'],
            ['#signup', 'Sign Up'],
          ].map(([href, title]) => (
            <a
              key={href}
              href={href}
              onClick={() => {
                if (href === '#contact') setSource('Contact');
                if (href === '#signup') setSource('Sign Up');
              }}
            >
              {title}
            </a>
          ))}
        </nav>
        <p>© Bug Refinery. Beyond theory.</p>
      </footer>
    </div>
  );
}
