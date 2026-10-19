"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildPEB, DIM, LAYERS, type Layer } from "./buildScene";
import { components } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

type LState = { op: number; glow: number; lift: number };

export default function PebBuild() {
  const section = useRef<HTMLElement>(null);
  const canvasWrap = useRef<HTMLDivElement>(null);
  const hud = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current!;
    const wrap = canvasWrap.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;

    // ---- renderer / scene ---------------------------------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.25 : 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = !lowPower;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    wrap.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#ffffff", 80, 170);
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.55;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 400);

    scene.add(new THREE.HemisphereLight("#ffffff", "#c9cbd0", 1.1));
    const sun = new THREE.DirectionalLight("#ffe2c4", 2.4);
    sun.position.set(40, 60, 30);
    sun.castShadow = !lowPower;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -50, right: 50, top: 50, bottom: -50, near: 1, far: 200 });
    sun.shadow.bias = -0.0005;
    scene.add(sun);
    const rim = new THREE.DirectionalLight("#ffb27a", 0.8);
    rim.position.set(-40, 12, -40);
    scene.add(rim);
    const glow = new THREE.PointLight("#ff6a00", 12, 30, 1.8);
    glow.position.set(0, 3, 6);
    scene.add(glow);

    const grid = new THREE.GridHelper(300, 100, "#c4c6cb", "#e2e3e6");
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.55;
    grid.position.y = -0.36;
    scene.add(grid);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.ShadowMaterial({ opacity: 0.18 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.34;
    ground.receiveShadow = true;
    scene.add(ground);

    const { root, groups, mats, pieces, spinners, crane } = buildPEB(lowPower);
    scene.add(root);

    // ---- sparks ----------------------------------------------------------
    const N = lowPower ? 120 : 260;
    const sPos = new Float32Array(N * 3);
    const sVel = new Float32Array(N * 3);
    const sLife = new Float32Array(N);
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    const dot = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d")!;
      const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      r.addColorStop(0, "rgba(255,255,255,1)");
      r.addColorStop(0.25, "rgba(255,190,120,1)");
      r.addColorStop(0.6, "rgba(255,106,0,.5)");
      r.addColorStop(1, "rgba(255,106,0,0)");
      g.fillStyle = r;
      g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();
    const sparks = new THREE.Points(
      sGeo,
      new THREE.PointsMaterial({ size: 0.45, map: dot, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: "#ffffff" }),
    );
    scene.add(sparks);
    for (let i = 0; i < N; i++) sPos[i * 3 + 1] = -999;
    let sIdx = 0;
    const emit = (p: THREE.Vector3, n = 14) => {
      for (let j = 0; j < n; j++) {
        const i = sIdx++ % N;
        sPos[i * 3] = p.x;
        sPos[i * 3 + 1] = p.y;
        sPos[i * 3 + 2] = p.z;
        const a = Math.random() * Math.PI * 2;
        const sp = 3 + Math.random() * 7;
        sVel[i * 3] = Math.cos(a) * sp;
        sVel[i * 3 + 1] = 2 + Math.random() * 8;
        sVel[i * 3 + 2] = Math.sin(a) * sp;
        sLife[i] = 0.5 + Math.random() * 0.7;
      }
    };

    // ---- build timeline (plays once on load) ----------------------------
    const build = gsap.timeline({ paused: true });
    const counter = hud.current!.querySelector<HTMLElement>("[data-build]")!;
    const memberCount = hud.current!.querySelector<HTMLElement>("[data-members]")!;
    let placed = 0;
    for (const p of pieces) {
      const rest = p.obj.userData.rest as { pos: THREE.Vector3; rot: THREE.Euler; scale: THREE.Vector3 };
      const landed = () => {
        placed++;
        memberCount.textContent = String(placed).padStart(3, "0");
        if (p.spark) emit(p.spark, p.kind === "grow" ? 10 : 18);
      };
      if (p.kind === "grow") {
        p.obj.scale.set(1, 0.0001, 1);
        build.to(p.obj.scale, { y: 1, duration: 0.55, ease: "power3.out", onStart: () => p.spark && emit(p.spark, 8), onComplete: landed }, p.at);
      } else if (p.kind === "drop" || p.kind === "slide" || p.kind === "flyin") {
        p.obj.position.copy(rest.pos).add(p.from!);
        p.obj.visible = false;
        const dur = p.kind === "drop" ? 0.7 : p.kind === "flyin" ? 0.8 : 0.75;
        build.set(p.obj, { visible: true }, p.at);
        if (p.kind === "flyin") {
          p.obj.rotation.x = rest.rot.x + 0.6;
          build.to(p.obj.rotation, { x: rest.rot.x, duration: dur, ease: "power3.out" }, p.at);
        }
        build.to(
          p.obj.position,
          { x: rest.pos.x, y: rest.pos.y, z: rest.pos.z, duration: dur, ease: p.kind === "drop" ? "bounce.out" : "expo.out", onComplete: landed },
          p.at,
        );
      } else {
        p.obj.scale.setScalar(0.0001);
        build.to(p.obj.scale, { x: 1, y: 1, z: 1, duration: 0.6, ease: "back.out(2.2)", onComplete: landed }, p.at);
      }
    }
    memberCount.nextElementSibling!.textContent = "/" + String(pieces.length).padStart(3, "0");
    build.eventCallback("onUpdate", () => {
      counter.textContent = String(Math.round(build.progress() * 100)).padStart(3, "0");
    });
    build.eventCallback("onComplete", () => sec.setAttribute("data-built", "1"));

    // ---- scroll states ----------------------------------------------------
    const L: Record<Layer, LState> = {
      primary: { op: 1, glow: 0, lift: 0 },
      secondary: { op: 1, glow: 0, lift: 0 },
      panels: { op: 1, glow: 0, lift: 0 },
      accessories: { op: 1, glow: 0, lift: 0 },
    };
    const cam = { ang: 0.72, rad: lowPower ? 125 : 112, y: 30, look: 5, orbit: 0 };
    const stepEls = Array.from(sec.querySelectorAll<HTMLElement>("[data-step]"));
    const bar = sec.querySelector<HTMLElement>("[data-step-bar]")!;

    const scrollTl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut", duration: 1 } });
    const focus = (name: Layer | "all", at: number) => {
      for (const l of LAYERS) {
        const on = name === "all" || name === l;
        const idx = LAYERS.indexOf(l);
        const fi = name === "all" ? 99 : LAYERS.indexOf(name);
        scrollTl.to(
          L[l],
          {
            op: on ? 1 : idx < fi ? 0.22 : 0.0,
            glow: on && name !== "all" ? 1 : 0,
            lift: !on && idx > fi ? 9 : 0,
          },
          at,
        );
      }
    };
    scrollTl.to(sec.querySelector("[data-intro]"), { autoAlpha: 0, y: -40, duration: 0.5 }, 0.1);
    scrollTl.to(cam, { ang: 0.25, rad: lowPower ? 98 : 78, y: 18, look: 6 }, 0);
    focus("primary", 0.4);
    scrollTl.fromTo(stepEls[0], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.7);
    scrollTl.to(stepEls[0], { autoAlpha: 0, y: -40, duration: 0.5 }, 1.8);
    focus("secondary", 1.8);
    scrollTl.to(cam, { ang: -0.35, rad: lowPower ? 96 : 74, y: 30, look: 7 }, 1.8);
    scrollTl.fromTo(stepEls[1], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 2.2);
    scrollTl.to(stepEls[1], { autoAlpha: 0, y: -40, duration: 0.5 }, 3.2);
    focus("panels", 3.2);
    scrollTl.to(cam, { ang: -0.95, rad: lowPower ? 104 : 84, y: 22, look: 5 }, 3.2);
    scrollTl.fromTo(stepEls[2], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 3.6);
    scrollTl.to(stepEls[2], { autoAlpha: 0, y: -40, duration: 0.5 }, 4.6);
    focus("accessories", 4.6);
    scrollTl.to(cam, { ang: 0.9, rad: lowPower ? 100 : 80, y: 34, look: 6 }, 4.6);
    scrollTl.fromTo(stepEls[3], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 5.0);
    focus("all", 6.0);
    scrollTl.to(cam, { ang: 0.55, rad: lowPower ? 125 : 112, y: 30, look: 5 }, 6.0);
    scrollTl.to(stepEls[3], { autoAlpha: 0, y: -40, duration: 0.5 }, 6.1);
    scrollTl.fromTo(sec.querySelector("[data-outro]"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 6.4);
    scrollTl.to({}, { duration: 0.6 }, 7);

    let target = 0;
    let prog = 0;
    let lastProg = -1;
    const st = ScrollTrigger.create({
      trigger: sec,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        target = self.progress;
      },
    });

    // ---- per-frame ---------------------------------------------------------
    const orange = new THREE.Color("#ff6a00");
    const tmp = new THREE.Color();
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / innerWidth - 0.5;
      mouse.y = e.clientY / innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);

    const applyLayers = () => {
      for (const l of LAYERS) {
        const s = L[l];
        const m = mats[l];
        m.solids.forEach((mat, i) => {
          const base = m.base[i];
          mat.opacity = base.opacity * s.op;
          mat.transparent = mat.opacity < 0.999;
          mat.depthWrite = mat.opacity > 0.5;
          mat.visible = mat.opacity > 0.01;
          tmp.copy(base.color).lerp(orange, s.glow * (l === "panels" ? 0.25 : 0.55));
          mat.color.copy(tmp);
        });
        m.edges.forEach((e) => {
          e.opacity = Math.min(1, (0.35 + s.glow * 0.65) * Math.max(s.op, s.glow));
          e.color.set(s.glow > 0.05 ? "#ff8a3d" : l === "panels" || l === "accessories" ? "#1b1d21" : "#8e939d");
          e.visible = s.op > 0.01;
        });
        groups[l].position.y = s.lift;
      }
    };

    let w = 0;
    let h = 0;
    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w < 768 ? 42 : 32;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(sec);

    const clock = new THREE.Clock();
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      if (!reduce) cam.orbit += dt * 0.035;
      mouse.sx += (mouse.x - mouse.sx) * 0.04;
      mouse.sy += (mouse.y - mouse.sy) * 0.04;
      const a = cam.ang + cam.orbit * 0.6 + Math.sin(cam.orbit) * 0.12 + mouse.sx * 0.25;
      // frame the build to the right of the copy on wide screens
      const offX = w > 1024 ? -9 : 0;
      camera.position.set(Math.sin(a) * cam.rad + offX, cam.y - mouse.sy * 6, Math.cos(a) * cam.rad);
      camera.lookAt(offX * 0.2, cam.look, 0);
      if (w > 1024) camera.setViewOffset(w, h, -w * 0.17, 0, w, h);
      else camera.setViewOffset(w, h, 0, h * 0.2, w, h);

      // ease toward the scroll position inside the render loop: one smooth value per frame, no tween churn
      prog += (target - prog) * Math.min(1, dt * 6);
      if (Math.abs(target - prog) < 0.0005) prog = target;
      if (prog !== lastProg) {
        lastProg = prog;
        scrollTl.progress(prog);
        bar.style.transform = `scaleY(${prog})`;
      }
      applyLayers();
      spinners.forEach((s, i) => (s.rotation.y = t * (3 + (i % 3))));
      if (crane && sec.dataset.built) crane.position.z = Math.sin(t * 0.35) * 18;

      for (let i = 0; i < N; i++) {
        if (sLife[i] <= 0) continue;
        sLife[i] -= dt;
        sVel[i * 3 + 1] -= 22 * dt;
        sPos[i * 3] += sVel[i * 3] * dt;
        sPos[i * 3 + 1] += sVel[i * 3 + 1] * dt;
        sPos[i * 3 + 2] += sVel[i * 3 + 2] * dt;
        if (sPos[i * 3 + 1] < 0) {
          sPos[i * 3 + 1] = 0;
          sVel[i * 3 + 1] *= -0.35;
          sVel[i * 3] *= 0.6;
          sVel[i * 3 + 2] *= 0.6;
        }
        if (sLife[i] <= 0) sPos[i * 3 + 1] = -999;
      }
      sGeo.attributes.position.needsUpdate = true;
      glow.intensity = 10 + Math.sin(t * 3) * 3;
      renderer.render(scene, camera);
    };
    frame();

    const startBuild = () => {
      if (reduce) build.progress(1);
      else build.play(0);
      gsap.fromTo(sec.querySelectorAll("[data-hud]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, stagger: 0.06, delay: 0.2 });
    };
    if (reduce) startBuild();
    const enter = ScrollTrigger.create({ trigger: sec, start: "top 70%", once: true, onEnter: () => !reduce && startBuild() });

    return () => {
      enter.kill();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      st.kill();
      scrollTl.kill();
      build.kill();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mm = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mm)) mm.forEach((x) => x.dispose());
        else mm?.dispose?.();
      });
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section ref={section} className="relative h-[460vh] border-y border-[var(--line)] bg-white" aria-label="Components of a pre-engineered building">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="blueprint absolute inset-0 opacity-60" />
        <div ref={canvasWrap} className="absolute inset-0" />
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.6) 30%, transparent 55%)" }}
        />

        {/* HUD */}
        <div
          ref={hud}
          className="mono pointer-events-none absolute right-[var(--gutter)] top-28 hidden text-right text-[10px] leading-[1.9] text-mute md:block"
        >
          <div data-hud className="invisible">
            BUILD <span data-build className="text-orange">000</span>%
          </div>
          <div data-hud className="invisible">
            MEMBERS <span data-members className="text-bone">000</span>
            <span />
          </div>
          <div data-hud className="invisible">SPAN {DIM.span.toFixed(1)} M · LENGTH {DIM.length.toFixed(1)} M</div>
          <div data-hud className="invisible">EAVE HT {DIM.eave.toFixed(1)} M · SLOPE 1:10</div>
        </div>

        {/* step progress rail */}
        <div className="absolute bottom-10 left-[var(--gutter)] top-28 hidden w-px bg-[var(--line)] md:block">
          <div data-step-bar className="h-full w-full origin-top bg-orange" style={{ transform: "scaleY(0)" }} />
        </div>

        <div data-intro className="wrap absolute inset-x-0 top-24 md:top-1/2 md:-translate-y-1/2 md:pl-[calc(var(--gutter)+40px)]">
          <div className="mono mb-4 flex items-center gap-3 text-[11px] text-orange">
            <span className="h-2 w-2 bg-orange" />
            How a PEB comes together
          </div>
          <h2 className="display max-w-[16ch] text-[clamp(26px,3.4vw,46px)]">Components of a pre-engineered building</h2>
          <p className="mt-4 max-w-sm text-bone/70">Scroll to take the building apart, layer by layer.</p>
        </div>

        {/* component steps */}
        {components.map((c) => (
          <div
            key={c.n}
            data-step
            className="wrap invisible absolute inset-x-0 bottom-0 pb-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:pb-0 md:pl-[calc(var(--gutter)+40px)]"
          >
            <div className="max-w-md border-l-2 border-orange bg-white/95 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,.35)] md:p-8">
              <div className="mono mb-3 text-[11px] text-mute">Components of PEB</div>
              <h3 className="display text-[clamp(24px,2.8vw,36px)]">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-bone/75">{c.body}</p>
            </div>
          </div>
        ))}

        <div
          data-outro
          className="wrap invisible absolute inset-x-0 bottom-0 pb-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:pb-0 md:pl-[calc(var(--gutter)+40px)]"
        >
          <div className="max-w-md border-l-2 border-orange bg-white/95 p-6 md:p-8">
            <div className="mono mb-3 text-[11px] text-orange">Designed, fabricated and erected by Jagmount</div>
            <h3 className="display text-[clamp(24px,2.8vw,36px)]">One team from drawing to handover.</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
