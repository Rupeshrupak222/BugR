'use client';

import { ArrowUpRight } from 'lucide-react';
import { QuietVideo } from './QuietVideo';
import { Reveal } from './Reveal';
import { areas, phases, terms } from '@/data/landingData';

export function ServicesSection({ onRegister }: { onRegister: (source: string) => void }) {
  return (
    <section className="landing-services landing-wrap">
      <Reveal className="landing-section-row">
        <h2>
          Where will you <em>go?</em>
        </h2>
        <span className="landing-label">YOUR NEXT CHAPTER</span>
      </Reveal>
      <div className="services-pair">
        {[
          {
            media: 'students',
            tag: 'FOR STUDENTS & GRADUATES',
            title: 'Turn practice into proof.',
            description:
              'Build practical experience through real artifacts, mentor-led reviews and project-based assessments. Leave with work you can explain and show.',
            source: 'Students',
          },
          {
            media: 'companies',
            tag: 'FOR COMPANIES',
            title: 'Look beyond the résumé.',
            description:
              'Explore reviewed fixes, shipped deliverables and work scorecards. Start a conversation around what a graduate can demonstrate.',
            source: 'Companies',
          },
        ].map((item, index) => (
          <Reveal key={item.media} delay={index * 0.1}>
            <article className="liquid-glass service-card" id={item.media}>
              <QuietVideo name={item.media} label={item.media + ' film'} />
              <div className="service-body">
                <div className="service-tag">
                  <p className="landing-label">{item.tag}</p>
                  <a
                    className="liquid-glass round-link"
                    href="#signup"
                    onClick={() => onRegister(item.source)}
                    aria-label={'Enquire as ' + item.media}
                  >
                    <ArrowUpRight size={19} />
                  </a>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <details className="audience-details">
                  <summary>
                    {index === 0 ? 'Explore the student programme' : 'Explore the company offering'}{' '}
                    <span aria-hidden="true">+</span>
                  </summary>
                  {index === 0 ? (
                    <div>
                      <p>
                        Start with someone else’s work. Investigate the context, explain your fix and deliver evidence that shows how you checked it.
                      </p>
                      <ol className="audience-phases">
                        {phases.map(([week, title, text]) => (
                          <li key={week}>
                            <span>{week}</span>
                            <h4>{title}</h4>
                            <p>{text}</p>
                          </li>
                        ))}
                      </ol>
                      <p>{terms} · STARTING SOON</p>
                    </div>
                  ) : (
                    <div>
                      <p>
                        Production issues come with unfamiliar systems, incomplete documentation and trade-offs. Simulation gives graduates practice working through those conditions.
                      </p>
                      <h4>Illustrative work across four industries</h4>
                      <ul className="audience-examples">
                        {areas.map((area) => (
                          <li key={area.id}>
                            <strong>{area.name}</strong>
                            <p>{area.after}</p>
                          </li>
                        ))}
                      </ul>
                      <p>Tell us what your team looks for in early-career talent.</p>
                    </div>
                  )}
                </details>
                <a
                  className="liquid-glass landing-pill audience-cta"
                  href="#signup"
                  onClick={() => onRegister(item.source)}
                >
                  {index === 0 ? 'Join the student waitlist' : 'Discuss your hiring needs'}{' '}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
