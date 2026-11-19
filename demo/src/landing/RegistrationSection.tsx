import { LeadForm } from '../../../src/LeadForm';
import { areas, support, terms } from '../data';

export function RegistrationSection({ source, onSelect }: { source: string; onSelect: (source: string) => void }) {
  return <section className="landing-registration landing-wrap" id="signup" aria-labelledby="registration-heading">
    <div className="registration-intro"><p className="landing-label">LET’S GET STARTED</p><h2 id="registration-heading">Take the<br /><em>next step.</em></h2><p>Register your interest in a lab, join the student waitlist, or talk to us about your hiring needs.</p><p className="landing-terms">{terms}<br />STARTING SOON</p>
      <div id="contact" className="landing-contact"><h3>Contact & support</h3><p>Have a question? Choose “Contact / general enquiry” in the form, or reach us directly.</p><a href={'mailto:' + support}>{support}</a></div>
    </div>
    <div className="liquid-glass registration-form"><label htmlFor="landing-enquiry">I’m interested in</label><select id="landing-enquiry" value={source} onChange={event => onSelect(event.target.value)}>
      <optgroup label="General enquiries"><option value="Sign Up">General registration</option><option value="Students">Student waitlist</option><option value="Companies">Hiring / company enquiry</option><option value="Contact">Contact / general enquiry</option></optgroup>
      {areas.map(area => <optgroup key={area.id} label={area.name}>{area.labs.map(lab => <option key={lab.slug} value={lab.name}>{lab.name}</option>)}</optgroup>)}
    </select><p className="registration-selection">{source === 'Sign Up' ? 'Register your interest in Bug Refinery.' : 'Your enquiry is for ' + source + '.'}</p>
      <LeadForm key={source} source={source} submitLabel={source === 'Students' ? 'Join the Waitlist' : source === 'Companies' || source === 'Contact' ? 'Send Message' : 'Register Interest'} />
    </div>
  </section>;
}
