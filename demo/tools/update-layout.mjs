import fs from 'node:fs';
let source=fs.readFileSync('demo/src/Layout.tsx','utf8');
source=source.replace("import { SceneView, WorldCanvas } from './world/World';",'');
source=source.replace('<SceneView model={artwork} label="ARTIFACT / VIEWPORT" variant="page-world" interactive />','<div className="page-art"><Art id={artwork} /></div>');
source=source.replace('<SceneView model={area.id} variant="tile-world" />','<Art id={area.id} />');
source=source.replace('<WorldCanvas />','');
const start=source.indexOf("  useEffect(() => {\n    if (!('IntersectionObserver' in window)) return;",source.indexOf('export function Layout'));
if(start>=0){const end=source.indexOf("  if (path === '/')",start); source=source.slice(0,start)+source.slice(end);}
fs.writeFileSync('demo/src/Layout.tsx',source);
