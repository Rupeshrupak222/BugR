import { Home } from './Home';
import { Catalogue, LabPage } from './Labs';
import { Button, Eyebrow, Layout } from './Layout';
import { mainPages } from './MainPages';
import { labs } from './data';

function MissingPage() {
  return <section className="wrap section"><Eyebrow>404 / ARCHIVE</Eyebrow><h1>Page <em>not found.</em></h1>
    <div className="actions"><Button href="/" primary>Home</Button><Button href="/labs.html">Browse Labs</Button></div></section>;
}

export function App({ path }: { path: string }) {
  const lab = labs.find(item => item.path === path);
  const MainPage = mainPages[path as keyof typeof mainPages];
  let content = <MissingPage />;
  if (path === '/') content = <Home />;
  else if (path === '/labs.html') content = <Catalogue />;
  else if (lab) content = <LabPage lab={lab} />;
  else if (MainPage) content = <MainPage />;
  return <Layout path={path}>{content}</Layout>;
}
