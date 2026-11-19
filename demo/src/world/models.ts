import * as T from 'three';

type Material = T.MeshStandardMaterial | T.MeshBasicMaterial;
type Animation = (time: number, inspected: number) => void;
const TAU = Math.PI * 2;
const point = (x: number, y: number, z: number) => new T.Vector3(x, y, z);

export function createModel(kind: string, environment: T.Texture) {
  const scene = new T.Scene();
  scene.environment = environment;
  scene.environmentIntensity = .92;
  const stage = new T.Group();
  scene.add(stage);
  const camera = new T.PerspectiveCamera(35, 1, .1, 60);
  const key = new T.DirectionalLight(0xffeee3, 3.6);
  key.position.set(-3, 6, 5);
  const rim = new T.DirectionalLight(0xff813d, 4.2);
  rim.position.set(4, 1.7, -5);
  scene.add(key, rim, new T.HemisphereLight(0xe8dfd6, 0x27201d, 1.05));

  const steel = new T.MeshStandardMaterial({ color: 0x95938d, metalness: .84, roughness: .28 });
  const dark = new T.MeshStandardMaterial({ color: 0x272524, metalness: .8, roughness: .4 });
  const graphite = new T.MeshStandardMaterial({ color: 0x151414, metalness: .45, roughness: .6 });
  const bronze = new T.MeshStandardMaterial({ color: 0xbf5721, metalness: .76, roughness: .34 });
  const amber = new T.MeshStandardMaterial({ color: 0xf97316, emissive: 0xea580c, emissiveIntensity: 2.3, metalness: .18, roughness: .33 });
  const pale = new T.MeshStandardMaterial({ color: 0xd2cec4, metalness: .26, roughness: .31 });
  const line = new T.LineBasicMaterial({ color: 0xb7a294, transparent: true, opacity: .36 });
  const resources = new Set<T.BufferGeometry>();
  const materials = new Set<T.Material>([steel, dark, graphite, bronze, amber, pale, line]);
  const textures = new Set<T.Texture>();
  const animations: Animation[] = [];
  const object = new T.Group();
  stage.add(object);

  function mesh(geometry: T.BufferGeometry, material: Material, parent: T.Object3D, x = 0, y = 0, z = 0) {
    resources.add(geometry);
    const part = new T.Mesh(geometry, material);
    part.position.set(x, y, z);
    parent.add(part);
    return part;
  }

  function box(w: number, h: number, d: number, material: Material, parent: T.Object3D, x = 0, y = 0, z = 0) {
    return mesh(new T.BoxGeometry(w, h, d), material, parent, x, y, z);
  }

  function cylinder(top: number, bottom: number, height: number, sides: number, material: Material, parent: T.Object3D, x = 0, y = 0, z = 0) {
    return mesh(new T.CylinderGeometry(top, bottom, height, sides), material, parent, x, y, z);
  }

  function torus(radius: number, thickness: number, material: Material, parent: T.Object3D, arc = TAU) {
    return mesh(new T.TorusGeometry(radius, thickness, 8, 56, arc), material, parent);
  }

  function trace(vertices: T.Vector3[], parent: T.Object3D) {
    const geometry = new T.BufferGeometry().setFromPoints(vertices);
    resources.add(geometry);
    parent.add(new T.Line(geometry, line));
  }

  function strut(a: T.Vector3, b: T.Vector3, width: number, material: Material, parent: T.Object3D) {
    const bar = cylinder(width * .72, width, a.distanceTo(b), 8, material, parent);
    bar.position.copy(a).lerp(b, .5);
    bar.quaternion.setFromUnitVectors(point(0, 1, 0), b.clone().sub(a).normalize());
    return bar;
  }

  function display(domain: string, w: number, h: number, parent: T.Object3D) {
    const frame = new T.Group();
    parent.add(frame);
    box(w + .1, h + .1, .075, steel, frame);
    box(w + .065, h + .065, .082, dark, frame, 0, 0, .012);
    const canvas = document.createElement('canvas');
    canvas.width = 360;
    canvas.height = 220;
    const ctx = canvas.getContext('2d');
    if (!ctx) return frame;
    ctx.fillStyle = '#130f0d';
    ctx.fillRect(0, 0, 360, 220);
    ctx.strokeStyle = '#352721';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 360; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 220); ctx.stroke();
    }
    for (let y = 0; y <= 220; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(360, y); ctx.stroke();
    }
    ctx.font = '15px monospace';
    ctx.fillStyle = '#ff963d';
    const title = { tech: '01 / CODE DIFF', management: '02 / LEDGER', engineering: '03 / CAD ASSEMBLY', medical: '04 / SYNTHETIC CHART' };
    ctx.fillText(title[domain as keyof typeof title] ?? 'ARTIFACT', 15, 26);
    ctx.strokeStyle = '#a29489';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(15, 38); ctx.lineTo(345, 38); ctx.stroke();
    if (domain === 'tech') {
      for (let i = 0; i < 11; i++) {
        ctx.fillStyle = i % 4 === 2 ? '#f58a48' : '#b8a79b';
        ctx.fillRect(20 + (i % 3) * 19, 56 + i * 13, 48 + (i * 61) % 220, 3);
      }
    } else if (domain === 'management') {
      for (let i = 0; i < 7; i++) {
        const bar = 34 + (i * 19) % 96;
        ctx.fillStyle = i === 5 ? '#fc872e' : '#a79a8c';
        ctx.fillRect(29 + i * 43, 186 - bar, 22, bar);
      }
    } else if (domain === 'engineering') {
      ctx.strokeStyle = '#f1c29d';
      ctx.strokeRect(102, 74, 152, 100);
      ctx.strokeRect(112, 84, 132, 80);
      ctx.beginPath(); ctx.ellipse(178, 124, 43, 28, -.18, 0, TAU); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(59, 124); ctx.lineTo(299, 124); ctx.moveTo(178, 59); ctx.lineTo(178, 192); ctx.stroke();
    } else {
      ctx.strokeStyle = '#ff9a56';
      ctx.beginPath();
      for (let x = 16; x < 344; x++) {
        const y = 119 + Math.sin(x * .16) * Math.sin(x * .041) ** 6 * 32;
        if (x === 16) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = '#b8a79b';
      for (let i = 0; i < 4; i++) ctx.fillRect(22 + i * 75, 175, 46, 4);
    }
    const texture = new T.CanvasTexture(canvas);
    texture.colorSpace = T.SRGBColorSpace;
    textures.add(texture);
    const screen = new T.MeshBasicMaterial({ map: texture, toneMapped: false });
    materials.add(screen);
    mesh(new T.PlaneGeometry(w, h), screen, frame, 0, 0, .06);
    return frame;
  }

  function plinth(radius: number, y: number) {
    cylinder(radius * .98, radius, .2, 8, graphite, stage, 0, y);
    cylinder(radius * .92, radius * .98, .07, 8, steel, stage, 0, y + .13);
    cylinder(radius * .91, radius * .91, .04, 8, dark, stage, 0, y + .18);
    const seam = torus(radius * .78, .009, amber, stage);
    seam.rotation.x = Math.PI / 2;
    seam.position.y = y + .206;
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * TAU + Math.PI / 8;
      cylinder(.055, .06, .018, 6, pale, stage, Math.sin(a) * radius * .81, y + .21, Math.cos(a) * radius * .81);
    }
  }

  function crawler() {
    const bug = new T.Group();
    stage.add(bug);
    const shell = new T.SphereGeometry(1, 20, 12);
    mesh(shell, dark, bug, 0, .17, -.08).scale.set(.31, .2, .45);
    mesh(shell, steel, bug, 0, .22, .17).scale.set(.22, .14, .23);
    const ridge = box(.026, .02, .46, amber, bug, 0, .36, -.12);
    ridge.rotation.x = -.14;
    const hips: T.Group[] = [];
    for (const side of [-1, 1]) {
      for (let i = 0; i < 3; i++) {
        const leg = new T.Group();
        leg.position.set(side * .2, .16, .14 - i * .23);
        bug.add(leg);
        hips.push(leg);
        const knee = point(side * .25, .10, (.85 - i) * .14);
        const foot = point(side * .41, -.16, (.85 - i) * .28);
        strut(point(0, 0, 0), knee, .039, bronze, leg);
        strut(knee, foot, .025, steel, leg);
        mesh(new T.IcosahedronGeometry(.049), dark, leg, knee.x, knee.y, knee.z);
      }
      mesh(shell, amber, bug, side * .115, .25, .36).scale.set(.045, .039, .04);
      strut(point(side * .09, .23, .32), point(side * .19, .35, .53), .013, steel, bug);
    }
    animations.push(time => {
      const walk = T.MathUtils.smoothstep(time, .05, 2.7);
      const step = Math.sin(Math.PI * walk);
      bug.position.set(-2.12 + walk * 2.97, -1.18 + step * Math.sin(time * 18) * .035, 1.52 - walk * .2);
      bug.rotation.y = 1.4 - walk * .92;
      hips.forEach((leg, i) => { leg.rotation.y = Math.sin(time * 18 + i * Math.PI) * .21 * step; });
    });
  }

  if (kind === 'reactor') {
    const grid = new T.GridHelper(16, 32, 0x6c4229, 0x2e231c);
    grid.position.y = -1.52;
    grid.material.transparent = true;
    grid.material.opacity = .6;
    resources.add(grid.geometry);
    materials.add(grid.material);
    scene.add(grid);
    plinth(2.46, -1.4);
    cylinder(.82, 1.04, .21, 12, dark, stage, 0, -1.09);
    cylinder(.56, .72, .24, 12, steel, stage, 0, -.91);
    const ringBase = torus(.71, .025, amber, stage);
    ringBase.rotation.x = Math.PI / 2;
    ringBase.position.y = -.77;
    object.position.y = .38;
    const crystal = new T.MeshStandardMaterial({
      color: 0xf97529, emissive: 0xc73805, emissiveIntensity: .9,
      metalness: .46, roughness: .27, flatShading: true
    });
    materials.add(crystal);
    const prism = mesh(new T.IcosahedronGeometry(.66, 1), crystal, object);
    prism.scale.set(.88, 1.06, .87);
    const shell = mesh(new T.IcosahedronGeometry(.85, 1), new T.MeshBasicMaterial({ color: 0xffa263, wireframe: true, transparent: true, opacity: .46 }), object);
    materials.add(shell.material);
    const rotors = [1.14, 1.40, 1.67].map((radius, index) => {
      const rotor = new T.Group();
      object.add(rotor);
      for (let j = 0; j < 4; j++) {
        const angle = j * Math.PI / 2;
        const segment = torus(radius, .095 - index * .009, index % 2 ? bronze : steel, rotor, 1.29);
        segment.rotation.z = angle;
        const stripe = torus(radius - .071, .014, amber, rotor, 1.22);
        stripe.rotation.z = angle + .036;
        stripe.position.z = .038;
        const bracket = box(.23, .17, .21, dark, rotor, Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        bracket.rotation.z = angle;
        cylinder(.055, .06, .05, 6, pale, rotor, Math.cos(angle) * radius, Math.sin(angle) * radius, .11).rotation.x = Math.PI / 2;
      }
      return rotor;
    });
    for (let i = 0; i < 3; i++) {
      const a = i * TAU / 3 + .5;
      strut(point(Math.cos(a) * 1.8, -1.17, Math.sin(a) * 1.8), point(Math.cos(a) * 1.17, -.64, Math.sin(a) * 1.17), .061, steel, stage);
    }
    const lamp = new T.PointLight(0xff681e, 13, 5, 2);
    lamp.position.set(0, -.24, .35);
    stage.add(lamp);
    const files = ['tech', 'management', 'engineering', 'medical'].map((domain, i) => {
      const panel = display(domain, 1.05, .64, stage);
      const side = i % 2 ? 1 : -1;
      panel.position.set(side * (i < 2 ? 2.04 : 2.09), i < 2 ? 1.2 : -.5, i % 2 ? -.72 : -.04);
      panel.rotation.set(-.04, side * -.29, side * -.095);
      return panel;
    });
    crawler();
    animations.push((time, inspected) => {
      prism.rotation.set(time * .28, time * -.33, .36);
      shell.rotation.set(-time * .15, time * .24, .16);
      rotors[0].rotation.set(.64 + time * .22, .14, -.16);
      rotors[1].rotation.set(-.24, .86 + time * -.24, .32);
      rotors[2].rotation.set(.16 + time * .09, -.55, -.26 + time * .17);
      rotors.forEach((rotor, i) => { rotor.scale.setScalar(1 + inspected * (.1 + i * .047)); });
      files.forEach((panel, i) => { panel.position.y = (i < 2 ? 1.2 : -.5) + Math.sin(time * 1.05 + i) * .08; });
      lamp.intensity = 13 + Math.sin(time * 3) * 2;
    });
  } else if (kind === 'tech') {
    plinth(1.75, -1.18);
    object.rotation.set(.19, -.18, -.12);
    const chip = new T.Group();
    object.add(chip);
    box(2.12, 1.82, .16, graphite, object);
    box(1.72, 1.42, .08, dark, object, 0, 0, .12);
    box(.95, .93, .17, steel, chip, 0, 0, .17);
    box(.68, .66, .08, bronze, chip, 0, 0, .28);
    box(.43, .42, .04, amber, chip, 0, 0, .34);
    const pin = new T.BoxGeometry(.09, .26, .073);
    for (let i = 0; i < 8; i++) {
      const p = (i - 3.5) * .2;
      for (const side of [-1, 1]) {
        mesh(pin, steel, object, p, side * .94, .08);
        mesh(pin, steel, object, side * 1.05, p, .08).rotation.z = Math.PI / 2;
        trace([point(p, side * .84, .19), point(p, side * .7, .19), point(p * .48, side * .45, .19)], object);
      }
    }
    const card = display(kind, .95, .58, object);
    card.position.set(.88, .63, -.36);
    animations.push((time, inspected) => {
      chip.position.z = .03 * Math.sin(time * 1.8) + inspected * .68;
      card.position.x = .88 + inspected * .54;
    });
  } else if (kind === 'management') {
    plinth(1.75, -1.18);
    const layers = Array.from({ length: 3 }, (_, i) => {
      const sheet = display(kind, 1.48, .92, object);
      sheet.position.set((i - 1) * .28, i * .28 - .35, -i * .32);
      sheet.rotation.y = -.25 + i * .09;
      return sheet;
    });
    for (let i = 0; i < 5; i++) {
      const height = .22 + i * .13;
      box(.15, height, .2, i === 3 ? amber : steel, object, -.58 + i * .27, -.93 + height / 2, .35);
    }
    animations.push((time, inspected) => layers.forEach((sheet, i) => {
      sheet.position.x = (i - 1) * (.29 + inspected * .62);
      sheet.position.y = i * .32 - .36 + Math.sin(time * 1.45 + i) * .05;
    }));
  } else if (kind === 'engineering') {
    plinth(1.75, -1.18);
    const assembly = new T.Group();
    assembly.rotation.set(.16, .06, -.36);
    object.add(assembly);
    const slices = [1, .79, .58, .35].map((r, i) => {
      const slice = new T.Group();
      assembly.add(slice);
      const flange = torus(r, .07, i === 2 ? bronze : steel, slice);
      flange.rotation.x = Math.PI / 2;
      cylinder(r * .91, r * .9, .16, i % 2 ? 6 : 12, dark, slice);
      cylinder(r * .33, r * .42, .25, 8, i === 3 ? amber : steel, slice, 0, .07);
      for (let b = 0; b < 6; b++) {
        const a = b / 6 * TAU;
        cylinder(.045, .053, .042, 6, pale, slice, Math.sin(a) * r * .7, .11, Math.cos(a) * r * .7);
      }
      return slice;
    });
    animations.push((time, inspected) => slices.forEach((slice, i) => {
      slice.position.y = (i - 1.5) * (.36 + inspected * .31);
      slice.rotation.y = i * .23 + time * (.13 + i * .055);
    }));
  } else if (kind === 'medical') {
    plinth(1.75, -1.18);
    const helix = new T.Group();
    object.add(helix);
    const cell = new T.SphereGeometry(.09, 10, 8);
    const sides = [[], []] as T.Vector3[][];
    for (let i = 0; i < 15; i++) {
      const a = i * TAU / 9;
      const p = point(Math.cos(a) * .49, (i - 7) * .144, Math.sin(a) * .49);
      const q = point(-p.x, p.y, -p.z);
      sides[0].push(p);
      sides[1].push(q);
      mesh(cell, i % 3 ? pale : amber, helix, p.x, p.y, p.z);
      mesh(cell, i % 4 ? bronze : steel, helix, q.x, q.y, q.z);
      strut(p, q, .015, steel, helix);
    }
    sides.forEach((points, i) => mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points), 54, .039, 7), i ? bronze : pale, helix));
    const chart = display(kind, 1.06, .62, object);
    chart.position.set(.79, .37, -.45);
    chart.rotation.y = -.24;
    animations.push((time, inspected) => {
      helix.rotation.y = time * .45 + inspected * 1.32;
      helix.scale.set(1 + inspected * .35, 1 + inspected * .12, 1 + inspected * .35);
      chart.position.x = .79 + inspected * .38;
    });
  } else {
    plinth(1.63, -1.18);
    const rings = Array.from({ length: 4 }, (_, i) => {
      const ring = torus(1.24 - i * .2, i % 2 ? .024 : .071, i === 1 ? amber : steel, object, TAU * .87);
      ring.position.z = -i * .19;
      return ring;
    });
    mesh(new T.IcosahedronGeometry(.22), bronze, object, 0, 0, .24);
    animations.push((time, inspected) => rings.forEach((ring, i) => {
      ring.rotation.set(.2 + i * .17, i * .22 + inspected * .3, time * (.22 + i * .05) + i * 1.1);
    }));
  }

  return {
    scene, camera, stage,
    update(time: number, aspect: number, yaw: number, tilt: number, scroll: number, inspected: number) {
      const wide = kind === 'reactor';
      const distance = (wide ? 8.85 : 5.25) * Math.max(1, (wide ? 1.22 : 1.06) / aspect);
      const angle = yaw + (wide ? .18 : .22) + scroll * .22;
      camera.aspect = aspect;
      camera.position.set(Math.sin(angle) * distance, distance * (.28 + tilt) + .16, Math.cos(angle) * distance);
      camera.lookAt(0, wide ? .05 : -.08, 0);
      camera.updateProjectionMatrix();
      for (const animate of animations) animate(time, inspected);
    },
    dispose() {
      for (const geometry of resources) geometry.dispose();
      for (const material of materials) material.dispose();
      for (const texture of textures) texture.dispose();
    }
  };
}

