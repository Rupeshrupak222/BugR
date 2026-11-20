'use client';

import { Reveal } from './Reveal';

export function AboutSection() {
  return (
    <section className="landing-about landing-wrap" id="about">
      <Reveal>
        <p className="landing-label">ABOUT BUG REFINERY</p>
        <h2>
          Beyond what you <em>know.</em>
          <br />
          Into what you can <em>do.</em>
        </h2>
        <p className="about-intro">
          Real industry environments. Broken artifacts. Practical challenges.
          <br className="desktop-break" /> Reviewed solutions. Professional proof.
        </p>
        <details className="about-details">
          <summary>More about Bug Refinery +</summary>
          <p>
            Bug Refinery helps theory-strong graduates build practical industry capability by investigating broken artifacts, fixing them under review and shipping evidence.
          </p>
          <p>
            The lab starts with the kind of work people do in that field. Your deliverable and the evidence behind it give a reviewer something concrete to inspect.
          </p>
          <p>Foundry is the future development wing of Bug Refinery. Coming soon.</p>
        </details>
      </Reveal>
    </section>
  );
}
