import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { createModel } from '../world/models';
import { stations } from './journey';

const v = (x: number, y: number, z: number) => new T.Vector3(x, y, z);
const TAU = Math.PI * 2;

export function buildEnvironment(scene: T.Scene, environment: T.Texture, mobile: boolean) {
  const metal = new T.MeshStandardMaterial({ color: 0x555350, metalness: .83, roughness: .31 });
  const dark = new T.MeshStandardMaterial({ color: 0x151515, metalness: .68, roughness: .42 });
  const cream = new T.MeshStandardMaterial({ color: 0xaaa69e, metalness: .57, roughness: .26 });
  const orange = new T.MeshStandardMaterial({ color: 0xf97316, emissive: 0xea580c, emissiveIntensity: 2, roughness: .4 });
  const line = new T.LineBasicMaterial({ color: 0xf97316, transparent: true, opacity: .27 });
  const geometries = new Set<T.BufferGeometry>();
  const materials = new Set<T.Material>([metal, dark, cream, orange, line]);
  const animations: ((time: number, inspection: number, active: number) => void)[] = [];
  const models: ReturnType<typeof createModel>[] = [];
  const anchors: T.Object3D[] = [];
  const targets: T.Object3D[] = [];
  const rooms: T.Group[] = [];
  const unit = mobile ? new T.BoxGeometry(1, 1, 1) : new RoundedBoxGeometry(1, 1, 1, 1, .025);
  geometries.add(unit);
  function mesh(geo: T.BufferGeometry, mat: T.Material, parent: T.Object3D, x = 0, y = 0, z = 0) {
    geometries.add(geo);
    const m = new T.Mesh(geo, mat);
    m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true;
    parent.add(m); return m;
  }
  function box(parent: T.Object3D, x: number, y: number, z: number, sx: number, sy: number, sz: number, mat = metal) {
    const m = mesh(unit, mat, parent, x, y, z); m.scale.set(sx, sy, sz); return m;
  }
  function ring(parent: T.Object3D, radius: number, tube: number, mat = metal, segments = mobile ? 40 : 80) {
    return mesh(new T.TorusGeometry(radius, tube, mobile ? 5 : 8, segments), mat, parent);
  }
  function rod(parent: T.Object3D, from: T.Vector3, to: T.Vector3, radius: number, mat = metal) {
    const m = mesh(new T.CylinderGeometry(radius, radius, from.distanceTo(to), 6), mat, parent);
    m.position.copy(from).lerp(to, .5); m.quaternion.setFromUnitVectors(v(0, 1, 0), to.clone().sub(from).normalize()); return m;
  }
  function route(points: T.Vector3[], radius: number, mat: T.Material, parent: T.Object3D) {
    const curve = new T.CatmullRomCurve3(points);
    mesh(new T.TubeGeometry(curve, mobile ? 32 : 64, radius, 5, false), mat, parent);
    return curve;
  }
  function display(parent: T.Object3D, text: string, x: number, y: number, z: number, size: number) {
    const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#f97316'; ctx.font = '500 68px monospace'; ctx.textAlign = 'center'; ctx.fillText(text, 512, 87);
    const texture = new T.CanvasTexture(canvas); texture.colorSpace = T.SRGBColorSpace;
    const mat = new T.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false }); materials.add(mat);
    const m = mesh(new T.PlaneGeometry(size, size / 8), mat, parent, x, y, z);
    m.castShadow = false; return texture;
  }
  const textures: T.Texture[] = [];
  // Small procedural roughness texture adds brushed metal detail without asset downloads.
  const brushed = document.createElement('canvas'); brushed.width = 128; brushed.height = 128;
  const brush = brushed.getContext('2d')!;
  for (let row = 0; row < 128; row++) {
    const shade = 120 + Math.floor((Math.sin(row * 78.233) * 43758.5453 % 1 + 1) * 52);
    brush.fillStyle = `rgb(${shade},${shade},${shade})`; brush.fillRect(0, row, 128, 1);
  }
  const roughness = new T.CanvasTexture(brushed); roughness.wrapS = roughness.wrapT = T.RepeatWrapping;
  metal.roughnessMap = roughness; cream.roughnessMap = roughness; textures.push(roughness);
  const floor = mesh(new T.PlaneGeometry(340, 340), dark, scene, 62, -.28, -35); floor.rotation.x = -Math.PI / 2;
  const grid = new T.GridHelper(320, 160, 0x493020, 0x24201c); grid.position.set(62, -.25, -35); scene.add(grid);
  geometries.add(grid.geometry); materials.add(grid.material as T.Material);

  const names = ['01 / REFINERY CORE', '02 / TECHNOLOGY', '03 / ENTERPRISE', '04 / ENGINEERING', '05 / MEDICAL', '06 / PROOF'];
  const kinds = ['reactor', 'tech', 'management', 'engineering', 'medical', 'index'];
  stations.slice(0, 6).forEach(([x, y, z], index) => {
    const room = new T.Group(); room.position.set(x, y, z); scene.add(room); rooms.push(room);
    const platform = mesh(new T.CylinderGeometry(13, 14, .8, 64), dark, room, 0, .15, 0);
    platform.receiveShadow = true;
    for (const radius of [10.8, 12.8]) { const r = ring(room, radius, .035, orange); r.rotation.x = Math.PI / 2; r.position.y = .58; }
    for (let i = 0; i < 12; i++) {
      const a = i * TAU / 12;
      const beam = box(room, Math.sin(a) * 12, .6, Math.cos(a) * 12, .035, .04, 1.2, cream); beam.rotation.y = a;
    }
    // Tower structure and overhead gantries make the focal object part of an industrial room.
    for (const side of [-1, 1]) {
      for (const depth of [-12, 12]) {
        box(room, side * 17, 10, depth, 1.4, 20, 1.8, dark);
        box(room, side * 16.2, 10, depth, .15, 19, .45, metal);
        box(room, side * 16.1, 13, depth + 1, .07, 6, .08, orange);
        box(room, side * 17, .6, depth, 3.1, 1.1, 3, metal);
        const buttress = box(room, side * 15, 18.5, depth, 6, .6, .9, metal); buttress.rotation.z = side * .48;
      }
      box(room, side * 17, 20, 0, 1.6, 1.5, 30, metal);
      box(room, side * 15, 19.3, 0, .22, .16, 28, cream);
      box(room, side * 15, 19, 0, .07, .1, 26, orange);
      // Repeated machinery housings, pipe flanges, braces and small service lights.
      for (let j = 0; j < (mobile ? 3 : 5); j++) {
        const pz = -10 + j * (mobile ? 10 : 5);
        box(room, side * 19, 4, pz, 2, 8, 3, dark);
        box(room, side * 17.9, 3, pz, .18, 4.5, 2.3, metal);
        box(room, side * 17.75, 5.6, pz, .1, .07, 2.1, orange);
        rod(room, v(side * 18, 8, pz), v(side * 16, 19, pz), .12);
      }
    }
    for (const depth of [-13, 13]) box(room, 0, 21, depth, 35, 1.2, 1.1, dark);
    textures.push(display(room, names[index], 0, 16.7, -15, 22));
    const gate = new T.Group(); gate.position.set(0, 8, -24); room.add(gate);
    if (index === 1 || index === 2) {
      const width = index === 1 ? 10 : 13;
      for (const side of [-1, 1]) { box(gate, side * width, 0, 0, .7, 16, 1.5); box(gate, side * (width - .5), 0, .8, .08, 15, .08, orange); }
      box(gate, 0, 8, 0, width * 2, .8, 1.5); box(gate, 0, 7.5, .8, width * 2, .06, .08, orange);
    } else {
      ring(gate, 9, .48, metal, index === 3 ? 6 : 64);
      ring(gate, 8.5, .045, orange, index === 3 ? 6 : 64);
      if (index === 4) { const second = ring(gate, 9.4, .22, cream); second.position.z = -2; }
    }
    const model = createModel(kinds[index], environment); models.push(model);
    const scale = index === 0 ? 3.8 : index === 4 ? 4.7 : 4;
    model.stage.position.y = index === 0 ? 5.9 : 5.3;
    model.stage.scale.setScalar(scale); room.add(model.stage);
    model.stage.traverse(child => { if (child instanceof T.Mesh) { child.castShadow = true; child.receiveShadow = true; } });
    targets.push(model.stage);
    const anchor = new T.Object3D(); anchor.position.set(index === 4 ? 3.4 : 4.5, index === 0 ? 8.6 : 7.5, 1); room.add(anchor); anchors.push(anchor);
    const spot = new T.SpotLight(0xf5f1e8, 650, 42, .65, .65, 1.6); spot.position.set(-7, 19, 6); spot.target.position.set(0, 3, 0); room.add(spot, spot.target);
    const warm = new T.PointLight(0xf97316, 110, 26, 1.7); warm.position.set(0, 5, -8); room.add(warm);
    const shaftMaterial = new T.ShaderMaterial({
      transparent: true, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending,
      vertexShader: 'varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: 'varying vec2 vUv; void main(){float edge=pow(sin(vUv.x*3.14159),3.); float fade=pow(vUv.y,1.6)*(1.-vUv.y); gl_FragColor=vec4(1.,.78,.54,edge*fade*.12);}'
    }); materials.add(shaftMaterial);
    const shaft = mesh(new T.CylinderGeometry(.25, 6.5, 21, 24, 1, true), shaftMaterial, room, -3.5, 9.5, 3);
    shaft.rotation.z = -.34; shaft.castShadow = false; shaft.receiveShadow = false;
    animations.push((time, inspection, active) => {
      room.visible = room.position.distanceTo(scene.userData.cameraPosition) < (mobile ? 105 : 150);
      if (room.visible) model.update(time, 1.6, 0, 0, 0, active === index || (active === 6 && index === 0) ? inspection : 0);
      spot.visible = warm.visible = shaft.visible = index === active || (active === 6 && index === 0);
    });

    if (index === 1) {
      const cube = new T.BoxGeometry(1.2, 1.2, 1.2); geometries.add(cube);
      const nodes = new T.InstancedMesh(cube, metal, mobile ? 24 : 48); room.add(nodes);
      const dummy = new T.Object3D();
      for (let n = 0; n < nodes.count; n++) {
        const side = n % 2 ? 1 : -1, height = Math.floor(n / 2) % 6;
        dummy.position.set(side * (9 + Math.floor(n / 12) * 1.9), 2 + height * 2, -5 - Math.floor(n / 12) * 2.3); dummy.updateMatrix(); nodes.setMatrixAt(n, dummy.matrix);
      }
      for (const side of [-1, 1]) {
        for (let n = 0; n < 5; n++) route([v(side * 11, 2 + n * 2, -6), v(side * 8, 2 + n * 2, -3), v(side * 5, 5, 0)], .035, orange, room);
      }
      const lattice = mesh(new T.IcosahedronGeometry(4.3, 1), new T.MeshBasicMaterial({ color: 0xf97316, wireframe: true, transparent: true, opacity: .22 }), room, 0, 10, -8); materials.add(lattice.material);
      animations.push(time => { lattice.rotation.y = time * .08; });
    } else if (index === 2) {
      for (let n = 0; n < 7; n++) {
        const height = 3 + (n * 3 % 8);
        box(room, -10 + n * 3.3, height / 2 + .7, -8, 1.5, height, 2, n === 4 ? cream : metal);
        box(room, -10 + n * 3.3, height + .75, -8, 1.55, .08, 2.05, orange);
      }
      for (const side of [-1, 1]) {
        const transaction = route([v(side * 12, 1, 9), v(side * 12, 3, -6), v(0, 3, -12)], .1, metal, room);
        const packet = mesh(new T.BoxGeometry(.5, .5, .5), orange, room);
        animations.push(time => packet.position.copy(transaction.getPoint((time * .09 + (side + 1) / 4) % 1)));
      }
    } else if (index === 3) {
      for (const side of [-1, 1]) {
        const arm = new T.Group(); arm.position.set(side * 9, 1, 1); room.add(arm);
        mesh(new T.CylinderGeometry(1.8, 2.2, 1.5, 12), dark, arm);
        const elbow = new T.Group(); elbow.position.y = 1.2; arm.add(elbow);
        rod(elbow, v(0, 0, 0), v(-side * 2, 5, 0), .6, metal);
        const joint = mesh(new T.CylinderGeometry(.9, .9, 1.5, 24), cream, elbow, -side * 2, 5, 0); joint.rotation.x = Math.PI / 2;
        rod(elbow, v(-side * 2, 5, 0), v(-side * 4.3, 7, 0), .4, metal);
        for (const z of [-.4, .4]) rod(elbow, v(-side * 4.3, 7, z), v(-side * 4.6, 5.8, z), .11, orange);
        animations.push(time => { elbow.rotation.z = Math.sin(time * .4) * .12 * side; arm.rotation.y = Math.sin(time * .25) * .17; });
      }
      const outline = mesh(new T.TorusGeometry(6.8, .02, 4, 6), orange, room, 0, 7, -5);
      animations.push(time => { outline.rotation.z = time * -.06; });
    } else if (index === 4) {
      for (const side of [-1, 1]) for (let n = 0; n < 3; n++) {
        mesh(new T.CylinderGeometry(.6, .6, 7, 12, 1, true), metal, room, side * (9 + n * 2), 4, -5);
        mesh(new T.CylinderGeometry(.2, .2, 5.8, 10), orange, room, side * (9 + n * 2), 4, -5);
      }
      const scanner = ring(room, 4.2, .04, orange); scanner.rotation.x = Math.PI / 2;
      animations.push(time => { scanner.position.y = 5 + Math.sin(time * .65) * 3.6; });
      const geo = new T.BufferGeometry().setFromPoints(Array.from({ length: 120 }, (_, i) => v((i / 119 - .5) * 17, 10 + Math.sin(i * .4) * Math.sin(i * .14) ** 6 * 2.5, -9)));
      geometries.add(geo); room.add(new T.Line(geo, line));
    } else if (index === 5) {
      ['tech', 'management', 'engineering', 'medical'].forEach((kind, n) => {
        const evidence = createModel(kind, environment); models.push(evidence);
        evidence.stage.position.set((n - 1.5) * 5.5, 3, 2); evidence.stage.scale.setScalar(1.9); room.add(evidence.stage);
        animations.push((time, inspected, active) => { if (room.visible) evidence.update(time, 1.6, 0, 0, 0, active === 5 ? inspected : 0); });
      });
      model.stage.position.set(0, 10.5, -6); model.stage.scale.setScalar(1.8);
      textures.push(display(room, 'SIMULATE / DEBUG / SHIP', 0, 13.8, -7, 20));
    }
  });

  // Conduits, frames and moving packets physically connect the six chambers.
  for (let i = 0; i < 6; i++) {
    const a = new T.Vector3(...stations[i]), b = new T.Vector3(...stations[i + 1]);
    const direction = b.clone().sub(a).normalize(), side = v(-direction.z, 0, direction.x);
    for (const sign of [-1, 1]) {
      const p = a.clone().addScaledVector(side, sign * 6).setY(.9), q = b.clone().addScaledVector(side, sign * 6).setY(.9);
      rod(scene, p, q, .18, metal); rod(scene, p.clone().setY(1.12), q.clone().setY(1.12), .035, orange);
      const pulse = mesh(new T.SphereGeometry(.15, 6, 5), orange, scene);
      animations.push(time => { pulse.position.copy(p).lerp(q, (time * .065 + i * .13 + (sign + 1) / 4) % 1); });
    }
    for (let j = 2; j <= 2; j++) {
      const midpoint = a.clone().lerp(b, j / 4);
      const frame = new T.Group(); frame.position.copy(midpoint); frame.rotation.y = Math.atan2(direction.x, direction.z); scene.add(frame);
      for (const sign of [-1, 1]) { box(frame, sign * 7, 5, 0, .35, 10, .6, dark); box(frame, sign * 6.8, 6, .34, .06, 7, .04, orange); }
      box(frame, 0, 10, 0, 14.3, .4, .6, metal);
    }
  }
  // Instanced deck fasteners and ventilation details, rather than hundreds of draw calls.
  const boltCount = mobile ? 144 : 288;
  const bolts = new T.InstancedMesh(unit, cream, boltCount); scene.add(bolts);
  const dummy = new T.Object3D();
  for (let i = 0; i < boltCount; i++) {
    const room = stations[i % 6], angle = Math.floor(i / 6) / (boltCount / 6) * TAU;
    dummy.position.set(room[0] + Math.sin(angle) * 11.8, .62, room[2] + Math.cos(angle) * 11.8); dummy.scale.set(.12, .08, .26); dummy.rotation.y = angle; dummy.updateMatrix(); bolts.setMatrixAt(i, dummy.matrix);
  }
  const dustGeometry = new T.BufferGeometry();
  const dust = new Float32Array((mobile ? 150 : 500) * 3);
  for (let i = 0; i < dust.length; i += 3) { dust[i] = Math.sin(i * 12.3) * 100 + 62; dust[i + 1] = (Math.sin(i * 2.7) + 1) * 12; dust[i + 2] = Math.cos(i * 7.4) * 100 - 30; }
  dustGeometry.setAttribute('position', new T.BufferAttribute(dust, 3)); geometries.add(dustGeometry);
  const dustMaterial = new T.PointsMaterial({ color: 0xf5f1e8, size: .06, transparent: true, opacity: .35, depthWrite: false }); materials.add(dustMaterial);
  const particles = new T.Points(dustGeometry, dustMaterial); scene.add(particles);
  return {
    anchors, targets,
    update(time: number, inspection: number, active: number) { for (const animate of animations) animate(time, inspection, active); particles.position.y = Math.sin(time * .1) * .5; },
    dispose() { models.forEach(model => model.dispose()); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose()); }
  };
}
