export const areas = [
  { name: 'Tech', icon: '⌘', artifact: 'codebase, ticket or technical asset', labs: [
    'Python Full Stack', 'Java Full Stack', 'Selenium Testing', 'Data Analytics', 'Data Engineering', 'AI / ML',
    'Data Science', 'Cloud and DevOps', 'Cyber Security', 'UI/UX Design', 'App Development'
  ] },
  { name: 'Management and Commerce', icon: '▤', artifact: 'statement, model or audit', labs: [
    'Finance', 'Business Analytics', 'Supply Chain Management', 'Salesforce', 'SAP FICA', 'HRM'
  ] },
  { name: 'Engineering and Non-IT', icon: '◇', artifact: 'drawing or technical artifact', labs: [
    'Embedded Systems', 'IoT and Robotics', 'AutoCAD', 'CATIA', 'Quality and Safety', 'Construction Planning'
  ] },
  { name: 'Medical', icon: '✚', artifact: 'chart, claim or domain evidence', labs: [
    'Medical Coding', 'Pharmacovigilance', 'Bioinformatics'
  ] }
];

export const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
export const labs = areas.flatMap(area => area.labs.map(name => ({
  name, area: area.name, artifact: area.artifact, slug: slug(name), path: '/labs/' + slug(name) + '.html'
})));
export const terms = 'Rs 9,999 per lab · 9 weeks · Cohort 30';
export const status = 'STARTING SOON';
export const pages = [
  { path: '/', name: 'Beyond Theory', description: 'From theory to production-ready through 26 industry-simulation labs in four areas.' },
  { path: '/labs.html', name: 'Labs', description: 'Explore 26 industry-simulation labs across Tech, Management, Engineering and Medical.' },
  { path: '/students.html', name: 'For Students', description: 'Work with real artifacts and build inspectable proof of what you can do.' },
  { path: '/companies.html', name: 'For Companies', description: 'See what job-ready work looks like and enquire about Bug Refinery.' },
  { path: '/about.html', name: 'About', description: 'Learn about Bug Refinery, Beyond Theory and the industry-simulation method.' },
  { path: '/contact.html', name: 'Contact', description: 'Contact Bug Refinery support or send an enquiry.' },
  { path: '/signup.html', name: 'Sign Up', description: 'Register interest in Bug Refinery industry-simulation labs.' },
  ...labs.map(lab => ({path: lab.path, name: lab.name, description: 'Explore the nine-week ' + lab.name + ' industry-simulation lab and register interest.'}))
];
