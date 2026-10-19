import * as THREE from "three";

/** Typical clear-span warehouse used as the hero model (metres). */
export const DIM = { span: 30, length: 60, eave: 9, rise: 1.5, bay: 7.5 };

export type Layer = "primary" | "secondary" | "panels" | "accessories";
export const LAYERS: Layer[] = ["primary", "secondary", "panels", "accessories"];

export type Piece = {
  obj: THREE.Object3D;
  layer: Layer;
  kind: "grow" | "drop" | "slide" | "pop" | "flyin";
  at: number; // seconds into the build
  spark?: THREE.Vector3; // where sparks fly when the piece lands
  from?: THREE.Vector3; // offset for drop / slide / flyin
};

export type LayerMats = {
  solids: THREE.MeshStandardMaterial[];
  edges: THREE.LineBasicMaterial[];
  base: { color: THREE.Color; opacity: number }[];
};

const ORANGE = new THREE.Color("#ff6a00");

function stripeTexture(a: string, b: string, n = 24, vertical = true) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = a;
  g.fillRect(0, 0, 256, 256);
  const w = 256 / n;
  for (let i = 0; i < n; i++) {
    const grad = vertical ? g.createLinearGradient(i * w, 0, (i + 1) * w, 0) : g.createLinearGradient(0, i * w, 0, (i + 1) * w);
    grad.addColorStop(0, a);
    grad.addColorStop(0.45, b);
    grad.addColorStop(0.55, a);
    grad.addColorStop(1, a);
    g.fillStyle = grad;
    if (vertical) g.fillRect(i * w, 0, w, 256);
    else g.fillRect(0, i * w, 256, w);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

function pvTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = "#121a33";
  g.fillRect(0, 0, 256, 128);
  g.strokeStyle = "#5a6a9a";
  g.lineWidth = 2;
  for (let x = 0; x <= 256; x += 32) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, 128);
    g.stroke();
  }
  for (let y = 0; y <= 128; y += 32) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(256, y);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function buildPEB(lowPower: boolean) {
  const root = new THREE.Group();
  const groups = {} as Record<Layer, THREE.Group>;
  const mats = {} as Record<Layer, LayerMats>;
  for (const l of LAYERS) {
    groups[l] = new THREE.Group();
    groups[l].name = l;
    root.add(groups[l]);
    mats[l] = { solids: [], edges: [], base: [] };
  }
  const pieces: Piece[] = [];
  const spinners: THREE.Object3D[] = [];
  let crane: THREE.Object3D | null = null;

  const mat = (layer: Layer, params: THREE.MeshStandardMaterialParameters) => {
    const m = new THREE.MeshStandardMaterial({ transparent: true, ...params });
    mats[layer].solids.push(m);
    mats[layer].base.push({ color: m.color.clone(), opacity: params.opacity ?? 1 });
    return m;
  };
  const edgeMat = (layer: Layer, color = "#7d828c", opacity = 0.55) => {
    const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    mats[layer].edges.push(m);
    return m;
  };

  const steel = {
    primary: mat("primary", { color: "#4b4f58", metalness: 0.75, roughness: 0.36 }),
    secondary: mat("secondary", { color: "#8c9099", metalness: 0.8, roughness: 0.3 }),
    rod: mat("secondary", { color: "#a3a7ae", metalness: 0.9, roughness: 0.25 }),
  };
  const edges = {
    primary: edgeMat("primary", "#8e939d", 0.6),
    secondary: edgeMat("secondary", "#9aa0aa", 0.35),
    panels: edgeMat("panels", "#1b1d21", 0.35),
    accessories: edgeMat("accessories", "#2a2c31", 0.4),
  };

  const roofTex = stripeTexture("#9fa4ab", "#d9dce0", 20, true);
  const wallTex = stripeTexture("#3d4149", "#5a5f69", 24, true);
  const bandTex = stripeTexture("#d65a00", "#ff8a3d", 24, true);
  const panelMats = {
    roof: mat("panels", { color: "#ffffff", map: roofTex, metalness: 0.55, roughness: 0.42 }),
    wall: mat("panels", { color: "#ffffff", map: wallTex, metalness: 0.5, roughness: 0.5 }),
    band: mat("panels", { color: "#ffffff", map: bandTex, metalness: 0.4, roughness: 0.5 }),
    sky: mat("panels", { color: "#cfe6ff", metalness: 0.1, roughness: 0.1, opacity: 0.45, emissive: new THREE.Color("#5f88b8"), emissiveIntensity: 0.25 }),
  };
  const accMats = {
    silver: mat("accessories", { color: "#c9ccd2", metalness: 0.95, roughness: 0.22 }),
    orange: mat("accessories", { color: "#ff6a00", metalness: 0.35, roughness: 0.45, emissive: new THREE.Color("#ff6a00"), emissiveIntensity: 0.12 }),
    shutter: mat("accessories", { color: "#ffffff", map: stripeTexture("#2a2d33", "#4a4e57", 30, false), metalness: 0.6, roughness: 0.4 }),
    pv: mat("accessories", { color: "#ffffff", map: pvTexture(), metalness: 0.6, roughness: 0.25 }),
    dark: mat("accessories", { color: "#26282d", metalness: 0.6, roughness: 0.5 }),
  };

  const withEdges = (mesh: THREE.Mesh, em: THREE.LineBasicMaterial | null) => {
    mesh.castShadow = !lowPower;
    mesh.receiveShadow = !lowPower;
    if (em) mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), em));
    return mesh;
  };

  /** A member that grows along its axis from `a` to `b`. Taper scales local x toward the far end. */
  const member = (a: THREE.Vector3, b: THREE.Vector3, w: number, d: number, m: THREE.Material, em: THREE.LineBasicMaterial | null, taper = 1) => {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const geo = new THREE.BoxGeometry(w, len, d);
    geo.translate(0, len / 2, 0);
    if (taper !== 1) {
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        if (pos.getY(i) > len / 2) pos.setX(i, pos.getX(i) * taper);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
    }
    const mesh = withEdges(new THREE.Mesh(geo, m), em);
    const holder = new THREE.Group();
    holder.position.copy(a);
    holder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    holder.add(mesh);
    return holder;
  };

  const { span, length, eave, rise, bay } = DIM;
  const hx = span / 2;
  const hz = length / 2;
  const frames: number[] = [];
  for (let z = -hz; z <= hz + 0.01; z += bay) frames.push(z);

  // slab
  const slab = new THREE.Mesh(new THREE.BoxGeometry(span + 3, 0.35, length + 3), new THREE.MeshStandardMaterial({ color: "#2a2c31", roughness: 0.95 }));
  slab.position.y = -0.17;
  slab.receiveShadow = true;
  root.add(slab);
  const slabEdge = new THREE.LineSegments(new THREE.EdgesGeometry(slab.geometry), new THREE.LineBasicMaterial({ color: "#ff6a00", transparent: true, opacity: 0.35 }));
  slab.add(slabEdge);

  // ---- PRIMARY: columns + rafters --------------------------------------
  frames.forEach((z, fi) => {
    const t0 = 0.2 + fi * 0.14;
    for (const s of [-1, 1]) {
      const col = member(new THREE.Vector3(s * hx, 0, z), new THREE.Vector3(s * hx, eave, z), 0.5, 0.32, steel.primary, edges.primary, 1.9);
      groups.primary.add(col);
      pieces.push({ obj: col, layer: "primary", kind: "grow", at: t0 + (s > 0 ? 0.05 : 0), spark: new THREE.Vector3(s * hx, 0.1, z) });
      // base plate
      const plate = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.12, 0.8), steel.primary);
      plate.position.set(s * hx, 0.06, z);
      groups.primary.add(withEdges(plate, edges.primary));
    }
    for (const s of [-1, 1]) {
      const raf = member(new THREE.Vector3(s * hx, eave + 0.2, z), new THREE.Vector3(0, eave + rise + 0.2, z), 0.95, 0.3, steel.primary, edges.primary, 0.6);
      groups.primary.add(raf);
      pieces.push({ obj: raf, layer: "primary", kind: "drop", at: 1.35 + fi * 0.11 + (s > 0 ? 0.04 : 0), from: new THREE.Vector3(0, 14, 0), spark: new THREE.Vector3(s * hx, eave + 0.3, z) });
    }
  });

  // ---- SECONDARY: purlins, girts, eave struts, bracing --------------------
  const nP = lowPower ? 5 : 7;
  let k = 0;
  for (const s of [-1, 1]) {
    for (let i = 0; i < nP; i++) {
      const t = (i + 0.5) / nP;
      const x = s * hx * (1 - t);
      const y = eave + rise * t + 0.75;
      const p = member(new THREE.Vector3(x, y, -hz - 0.6), new THREE.Vector3(x, y, hz + 0.6), 0.14, 0.24, steel.secondary, edges.secondary);
      groups.secondary.add(p);
      pieces.push({ obj: p, layer: "secondary", kind: "slide", at: 2.55 + k++ * 0.05, from: new THREE.Vector3(0, 0, -length * 1.2) });
    }
    // eave strut
    const es = member(new THREE.Vector3(s * (hx + 0.1), eave + 0.55, -hz - 0.6), new THREE.Vector3(s * (hx + 0.1), eave + 0.55, hz + 0.6), 0.2, 0.3, steel.secondary, edges.secondary);
    groups.secondary.add(es);
    pieces.push({ obj: es, layer: "secondary", kind: "slide", at: 2.5, from: new THREE.Vector3(0, 0, length * 1.2) });
    // girts
    for (const y of [1.6, 3.6, 5.6, 7.6]) {
      const g = member(new THREE.Vector3(s * (hx + 0.45), y, -hz - 0.3), new THREE.Vector3(s * (hx + 0.45), y, hz + 0.3), 0.22, 0.12, steel.secondary, edges.secondary);
      groups.secondary.add(g);
      pieces.push({ obj: g, layer: "secondary", kind: "slide", at: 2.7 + k++ * 0.04, from: new THREE.Vector3(0, 0, length * 1.2) });
    }
  }
  // X bracing in end bays: walls and roof
  for (const [za, zb] of [
    [-hz, -hz + bay],
    [hz - bay, hz],
  ]) {
    for (const s of [-1, 1]) {
      const pairs: [THREE.Vector3, THREE.Vector3][] = [
        [new THREE.Vector3(s * (hx + 0.2), 0.4, za), new THREE.Vector3(s * (hx + 0.2), eave - 0.4, zb)],
        [new THREE.Vector3(s * (hx + 0.2), 0.4, zb), new THREE.Vector3(s * (hx + 0.2), eave - 0.4, za)],
        [new THREE.Vector3(s * hx * 0.95, eave + 0.6, za), new THREE.Vector3(s * hx * 0.05, eave + rise + 0.4, zb)],
        [new THREE.Vector3(s * hx * 0.95, eave + 0.6, zb), new THREE.Vector3(s * hx * 0.05, eave + rise + 0.4, za)],
      ];
      for (const [a, b] of pairs) {
        const r = member(a, b, 0.07, 0.07, steel.rod, null);
        groups.secondary.add(r);
        pieces.push({ obj: r, layer: "secondary", kind: "grow", at: 3.2 + Math.random() * 0.3 });
      }
    }
  }

  // ---- PANELS: roof sheets, skylights, walls, gable ---------------------
  const strips = lowPower ? 8 : 12;
  const sw = (length + 1.2) / strips;
  const slopeLen = Math.hypot(hx, rise);
  const ang = Math.atan2(rise, hx);
  for (const s of [-1, 1]) {
    for (let i = 0; i < strips; i++) {
      const z = -hz - 0.6 + sw * (i + 0.5);
      const sky = i % 4 === 2;
      const geo = new THREE.BoxGeometry(slopeLen + 0.8, 0.07, sw - 0.04);
      const tex = sky ? panelMats.sky : panelMats.roof;
      const m = withEdges(new THREE.Mesh(geo, tex), edges.panels);
      if (!sky) {
        const uv = geo.attributes.uv;
        for (let u = 0; u < uv.count; u++) uv.setXY(u, uv.getX(u) * 1, uv.getY(u) * 6);
      }
      const holder = new THREE.Group();
      holder.position.set((s * (hx + 0.4)) / 2, eave + rise / 2 + 1.0, z);
      holder.rotation.z = -s * ang;
      holder.add(m);
      groups.panels.add(holder);
      pieces.push({ obj: holder, layer: "panels", kind: "flyin", at: 3.5 + i * 0.07 + (s > 0 ? 0.03 : 0), from: new THREE.Vector3(s * 6, 16, 0) });
    }
    // side walls: dark cladding over an orange dado band
    for (let i = 0; i < strips; i++) {
      const z = -hz - 0.3 + ((length + 0.6) / strips) * (i + 0.5);
      const h = (length + 0.6) / strips;
      const wall = withEdges(new THREE.Mesh(new THREE.BoxGeometry(0.07, eave - 1.2, h - 0.03), panelMats.wall), edges.panels);
      wall.position.set(s * (hx + 0.62), 1.2 + (eave - 1.2) / 2 + 0.5, z);
      const band = withEdges(new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.2, h - 0.03), panelMats.band), edges.panels);
      band.position.set(s * (hx + 0.62), 0.6, z);
      const holder = new THREE.Group();
      holder.add(wall, band);
      groups.panels.add(holder);
      pieces.push({ obj: holder, layer: "panels", kind: "slide", at: 4.0 + i * 0.05, from: new THREE.Vector3(s * 10, 0, 0) });
    }
  }
  // back gable (z = -hz), the front stays open as a cutaway
  const gStrips = 6;
  for (let i = 0; i < gStrips; i++) {
    const x0 = -hx + (span / gStrips) * i;
    const xc = x0 + span / gStrips / 2;
    const h = eave + rise * (1 - Math.abs(xc) / hx) + 0.5;
    const g = withEdges(new THREE.Mesh(new THREE.BoxGeometry(span / gStrips - 0.03, h, 0.07), panelMats.wall), edges.panels);
    g.position.set(xc, h / 2, -hz - 0.5);
    groups.panels.add(g);
    pieces.push({ obj: g, layer: "panels", kind: "slide", at: 4.4 + i * 0.05, from: new THREE.Vector3(0, 0, -12) });
  }

  // ---- ACCESSORIES: ventilators, gutters, shutters, canopy, crane, PV ---
  for (let z = -hz + 5; z < hz - 2; z += 10) {
    const v = new THREE.Group();
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.6, 16), accMats.silver);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.55, 18, 10, 0, Math.PI * 2, 0, Math.PI / 1.7), accMats.silver);
    head.position.y = 0.45;
    const fins = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(0.56, 0.5, 0.5, 14, 1, true), 1), edges.accessories);
    fins.position.y = 0.45;
    head.add(fins);
    v.add(neck, head);
    v.position.set(0, eave + rise + 1.25, z);
    spinners.push(head);
    groups.accessories.add(v);
    pieces.push({ obj: v, layer: "accessories", kind: "pop", at: 4.9 + (z + hz) * 0.006 });
  }
  for (const s of [-1, 1]) {
    const gut = member(new THREE.Vector3(s * (hx + 1.0), eave + 0.5, -hz - 0.6), new THREE.Vector3(s * (hx + 1.0), eave + 0.5, hz + 0.6), 0.35, 0.3, accMats.orange, edges.accessories);
    groups.accessories.add(gut);
    pieces.push({ obj: gut, layer: "accessories", kind: "slide", at: 4.85, from: new THREE.Vector3(0, 0, length) });
    for (let i = 1; i < frames.length - 1; i += 2) {
      const dp = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, eave + 0.3, 8), accMats.silver);
      dp.position.set(s * (hx + 0.85), (eave + 0.3) / 2, frames[i] + 0.6);
      groups.accessories.add(dp);
      pieces.push({ obj: dp, layer: "accessories", kind: "pop", at: 5.0 + i * 0.03 });
    }
  }
  // shutters + canopies on the +x wall
  for (const z of [-11, 8]) {
    const sh = withEdges(new THREE.Mesh(new THREE.BoxGeometry(0.16, 6, 5), accMats.shutter), edges.accessories);
    sh.position.set(hx + 0.72, 3.0, z);
    const hood = withEdges(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 5.4), accMats.dark), edges.accessories);
    hood.position.set(hx + 0.85, 6.3, z);
    const can = withEdges(new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.14, 7), accMats.orange), edges.accessories);
    can.position.set(hx + 2.3, 7.1, z);
    can.rotation.z = -0.06;
    const g = new THREE.Group();
    g.add(sh, hood, can);
    groups.accessories.add(g);
    pieces.push({ obj: g, layer: "accessories", kind: "slide", at: 5.05, from: new THREE.Vector3(6, 0, 0) });
  }
  // louvers high on the -x wall
  for (let z = -hz + 6; z < hz - 3; z += 12) {
    const lv = withEdges(new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.2, 2.2), accMats.dark), edges.accessories);
    lv.position.set(-hx - 0.75, 7.4, z);
    groups.accessories.add(lv);
    pieces.push({ obj: lv, layer: "accessories", kind: "pop", at: 5.15 });
  }
  // crane runway + EOT crane bridge
  for (const s of [-1, 1]) {
    const rb = member(new THREE.Vector3(s * (hx - 0.9), 6.6, -hz), new THREE.Vector3(s * (hx - 0.9), 6.6, hz), 0.35, 0.55, accMats.dark, edges.accessories);
    groups.accessories.add(rb);
    pieces.push({ obj: rb, layer: "accessories", kind: "slide", at: 4.7, from: new THREE.Vector3(0, 0, -length) });
  }
  {
    const bridge = new THREE.Group();
    const girder = withEdges(new THREE.Mesh(new THREE.BoxGeometry(span - 1.4, 0.9, 0.8), accMats.orange), edges.accessories);
    girder.position.y = 7.4;
    const trolley = withEdges(new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 1.8), accMats.dark), edges.accessories);
    trolley.position.set(3, 8.2, 0);
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2, 6), accMats.silver);
    rope.position.set(3, 6.1, 0);
    const hook = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.09, 8, 16, Math.PI * 1.4), accMats.orange);
    hook.position.set(3, 4.4, 0);
    bridge.add(girder, trolley, rope, hook);
    bridge.position.z = 10;
    crane = bridge;
    groups.accessories.add(bridge);
    pieces.push({ obj: bridge, layer: "accessories", kind: "slide", at: 5.2, from: new THREE.Vector3(0, 0, -30) });
  }
  // rooftop PV array on the +x slope
  {
    const arr = new THREE.Group();
    const rows = 3;
    const cols = lowPower ? 4 : 6;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const pv = withEdges(new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 4.2), accMats.pv), edges.accessories);
        pv.position.set(2.5 + r * 2.6, 0, -16 + c * 4.6);
        arr.add(pv);
      }
    }
    arr.position.set(0, eave + rise + 1.15, 0);
    arr.rotation.z = -ang;
    groups.accessories.add(arr);
    pieces.push({ obj: arr, layer: "accessories", kind: "flyin", at: 5.35, from: new THREE.Vector3(0, 10, 0) });
  }

  // record rest transforms
  for (const p of pieces) p.obj.userData.rest = { pos: p.obj.position.clone(), rot: p.obj.rotation.clone(), scale: p.obj.scale.clone() };

  return { root, groups, mats, pieces, spinners, crane: crane as THREE.Object3D | null, ORANGE };
}
