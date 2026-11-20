'use client';

import { ArrowUpRight } from 'lucide-react';
import { QuietVideo } from './QuietVideo';
import { Reveal } from './Reveal';

export function FeaturedVideoSection() {
  return (
    <section className="landing-featured landing-wrap" aria-label="Our approach">
      <Reveal className="featured-frame">
        <QuietVideo name="approach" label="our approach film" />
        <div className="film-shade" />
        <div className="featured-content">
          <div className="liquid-glass approach-note">
            <p className="landing-label">OUR APPROACH</p>
            <p>
              Start with an unfamiliar artifact. Find the fault, make a defensible correction, and deliver work a reviewer can inspect. That’s how theory becomes practical experience.
            </p>
          </div>
          <a className="liquid-glass landing-pill" href="#students">
            Explore the experience <ArrowUpRight size={17} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
