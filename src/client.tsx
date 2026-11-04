import { createRoot, hydrateRoot } from 'react-dom/client';
import { App, pageTitle } from './App';
import './style.css';

const root = document.getElementById('root')!;
const path = location.pathname === '/index.html' ? '/' : location.pathname;
document.title = pageTitle(path);
const app = <App path={path} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
