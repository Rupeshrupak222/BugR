import { QuietVideo } from './QuietVideo';
import { Reveal } from './Reveal';
import { steps } from '../data';
export function PhilosophySection() {
  return <section className="landing-method landing-wrap" id="process"><Reveal><p className="landing-label">THE METHOD</p><h2>Theory <em>×</em> practice.</h2></Reveal><div className="method-columns"><Reveal className="method-image"><QuietVideo name="philosophy" label="the method film" /></Reveal><Reveal className="method-copy" delay={.1}>{steps.map(([title, description], index) => <div key={title}><p className="landing-label">0{index + 1} / {['SIMULATE', 'DEBUG', 'SHIP'][index]}</p><h3>{title}</h3><p>{description}</p></div>)}</Reveal></div></section>;
}
