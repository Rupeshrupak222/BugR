import { hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './refinery.css';

const root = document.getElementById('root');
if (root) {
  const path = location.pathname === '/index.html' ? '/' : location.pathname;
  hydrateRoot(root, <App path={path} />);
}
