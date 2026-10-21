"use client";

import { useEffect, useRef } from "react";

// Hero 3D: um portal de partículas. O anel gira, um fluxo de "dados" atravessa o portal vindo
// do fundo, e o interior ondula. Na abertura as partículas se juntam para formar o anel; o
// mouse inclina a cena e a rolagem leva a câmera para dentro do portal.
// Three.js é carregado sob demanda para não pesar o primeiro carregamento.

const ANEL_VS = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uRaio;
  uniform float uPixel;
  attribute float aAngulo;
  attribute float aDesvio;
  attribute float aProf;
  attribute float aVel;
  attribute float aTam;
  attribute float aSemente;
  attribute vec3 aInicio;
  varying float vBrilho;
  varying float vSemente;

  void main() {
    float a = aAngulo + uTime * aVel;
    float onda = sin(a * 5.0 + uTime * 0.8 + aSemente * 6.283) * 0.06;
    float r = uRaio + aDesvio + onda;
    vec3 anel = vec3(cos(a) * r, sin(a) * r, aProf);
    float t = smoothstep(0.0, 1.0, clamp(uIntro * 1.4 - aSemente * 0.4, 0.0, 1.0));
    vec3 pos = mix(aInicio, anel, t);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aTam * uPixel * (30.0 / -mv.z);
    vBrilho = clamp(0.3 + 0.55 * (1.0 - abs(aDesvio) * 3.0), 0.2, 0.75);
    vSemente = aSemente;
  }
`;

const FLUXO_VS = /* glsl */ `
  uniform float uTime;
  uniform float uRaio;
  uniform float uPixel;
  attribute float aAngulo;
  attribute float aR;
  attribute float aZ;
  attribute float aVel;
  attribute float aTam;
  attribute float aSemente;
  varying float vBrilho;
  varying float vSemente;

  void main() {
    // Atravessa de z = -26 (fundo) até z = 6 (atrás da câmera) e recomeça.
    float z = mod(aZ + uTime * aVel, 32.0) - 26.0;
    float funil = 1.0 + max(0.0, -z) * 0.07;
    float a = aAngulo + z * 0.12 + uTime * 0.05;
    float r = uRaio * aR * funil;
    vec3 pos = vec3(cos(a) * r, sin(a) * r, z);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aTam * uPixel * (30.0 / -mv.z);
    float perto = smoothstep(6.0, 1.0, z);
    float longe = smoothstep(-26.0, -14.0, z);
    vBrilho = perto * longe * 0.8;
    vSemente = aSemente;
  }
`;

const PONTO_FS = /* glsl */ `
  uniform vec3 uCor;
  uniform float uClaro;
  varying float vBrilho;
  varying float vSemente;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alfa = smoothstep(0.5, 0.0, d);
    vec3 cor = mix(uCor, vec3(1.0), step(0.95, vSemente) * (1.0 - uClaro));
    gl_FragColor = vec4(cor, alfa * vBrilho);
  }
`;

const DISCO_VS = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv * 2.0 - 1.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DISCO_FS = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform vec3 uCor;
  varying vec2 vUv;

  // O plano vai até 1,6 raio: r = 1 é o aro. Aro nítido com halo, interior escuro com espiral sutil.
  void main() {
    float r = length(vUv) * 1.6;
    if (r > 1.6) discard;
    float ang = atan(vUv.y, vUv.x);
    float aro = exp(-pow((r - 1.0) * 9.0, 2.0));
    float halo = exp(-abs(r - 1.0) * 3.2) * 0.28 * (1.0 - smoothstep(1.25, 1.6, r));
    float espiral = sin(ang * 4.0 + r * 11.0 - uTime * 1.4) * 0.5 + 0.5;
    float dentro = (1.0 - step(1.0, r)) * smoothstep(0.25, 1.0, r) * espiral * 0.16;
    float i = (aro * 0.55 + halo + dentro) * uIntro;
    gl_FragColor = vec4(mix(uCor, vec3(1.0), aro * 0.12), i);
  }
`;

// Converte qualquer cor CSS (inclusive oklch) para RGB lendo um pixel de um canvas.
function corCss(valor: string): [number, number, number] {
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = valor;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

export function PortalHero({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let desmontado = false;
    let limpar = () => {};

    (async () => {
      const THREE = await import("three");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (desmontado) return;

      const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const pequeno = matchMedia("(max-width: 767px)").matches;
      const RAIO = 3;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      const cena = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.set(0, 0, 10);
      const grupo = new THREE.Group();
      cena.add(grupo);

      const uniforms = {
        uTime: { value: 0 },
        uIntro: { value: reduzir ? 1 : 0 },
        uRaio: { value: RAIO },
        uPixel: { value: renderer.getPixelRatio() },
        uCor: { value: new THREE.Color() },
        uClaro: { value: 0 },
      };

      // Anel de partículas.
      const nAnel = pequeno ? 9000 : 22000;
      const anel = new THREE.BufferGeometry();
      const att = (n: number, k: number) => new Float32Array(n * k);
      const [ang, desv, prof, vel, tam, sem, ini] = [att(nAnel, 1), att(nAnel, 1), att(nAnel, 1), att(nAnel, 1), att(nAnel, 1), att(nAnel, 1), att(nAnel, 3)];
      for (let i = 0; i < nAnel; i++) {
        const g = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
        ang[i] = Math.random() * Math.PI * 2;
        desv[i] = g * (i % 3 === 0 ? 0.34 : 0.05);
        prof[i] = (Math.random() - 0.5) * 0.35 * (1 - Math.abs(g));
        vel[i] = 0.12 + Math.random() * 0.18;
        tam[i] = 0.6 + Math.random() * 1.6;
        sem[i] = Math.random();
        ini[i * 3] = (Math.random() - 0.5) * 30;
        ini[i * 3 + 1] = (Math.random() - 0.5) * 18;
        ini[i * 3 + 2] = -Math.random() * 25;
      }
      anel.setAttribute("position", new THREE.BufferAttribute(ini, 3));
      anel.setAttribute("aAngulo", new THREE.BufferAttribute(ang, 1));
      anel.setAttribute("aDesvio", new THREE.BufferAttribute(desv, 1));
      anel.setAttribute("aProf", new THREE.BufferAttribute(prof, 1));
      anel.setAttribute("aVel", new THREE.BufferAttribute(vel, 1));
      anel.setAttribute("aTam", new THREE.BufferAttribute(tam, 1));
      anel.setAttribute("aSemente", new THREE.BufferAttribute(sem, 1));
      anel.setAttribute("aInicio", new THREE.BufferAttribute(ini, 3));
      const matPonto = (vs: string) =>
        new THREE.ShaderMaterial({ uniforms, vertexShader: vs, fragmentShader: PONTO_FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      const matAnel = matPonto(ANEL_VS);
      const pontosAnel = new THREE.Points(anel, matAnel);
      pontosAnel.frustumCulled = false;
      grupo.add(pontosAnel);

      // Fluxo de dados atravessando o portal.
      const nFluxo = pequeno ? 2500 : 6000;
      const fluxo = new THREE.BufferGeometry();
      const [fa, fr, fz, fv, ft, fs] = [att(nFluxo, 1), att(nFluxo, 1), att(nFluxo, 1), att(nFluxo, 1), att(nFluxo, 1), att(nFluxo, 1)];
      for (let i = 0; i < nFluxo; i++) {
        fa[i] = Math.random() * Math.PI * 2;
        fr[i] = Math.sqrt(Math.random()) * 0.92;
        fz[i] = Math.random() * 32;
        fv[i] = 1.2 + Math.random() * 2.4;
        ft[i] = 0.5 + Math.random() * 1.2;
        fs[i] = Math.random();
      }
      fluxo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(nFluxo * 3), 3));
      fluxo.setAttribute("aAngulo", new THREE.BufferAttribute(fa, 1));
      fluxo.setAttribute("aR", new THREE.BufferAttribute(fr, 1));
      fluxo.setAttribute("aZ", new THREE.BufferAttribute(fz, 1));
      fluxo.setAttribute("aVel", new THREE.BufferAttribute(fv, 1));
      fluxo.setAttribute("aTam", new THREE.BufferAttribute(ft, 1));
      fluxo.setAttribute("aSemente", new THREE.BufferAttribute(fs, 1));
      const matFluxo = matPonto(FLUXO_VS);
      const pontosFluxo = new THREE.Points(fluxo, matFluxo);
      pontosFluxo.frustumCulled = false;
      grupo.add(pontosFluxo);

      // Interior do portal.
      const matDisco = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: DISCO_VS,
        fragmentShader: DISCO_FS,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const disco = new THREE.Mesh(new THREE.PlaneGeometry(RAIO * 3.2, RAIO * 3.2), matDisco);
      grupo.add(disco);

      // Órbitas finas inclinadas, para dar profundidade.
      const orbitas: InstanceType<typeof THREE.LineLoop>[] = [];
      for (const [raio, inclX, inclY] of [[RAIO * 1.45, 1.15, 0.3], [RAIO * 1.8, 1.35, -0.5]] as const) {
        const pts = Array.from({ length: 160 }, (_, i) => {
          const a = (i / 160) * Math.PI * 2;
          return new THREE.Vector3(Math.cos(a) * raio, Math.sin(a) * raio, 0);
        });
        const linha = new THREE.LineLoop(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ transparent: true, opacity: 0.18, depthWrite: false }),
        );
        linha.rotation.set(inclX, inclY, 0);
        orbitas.push(linha);
        grupo.add(linha);
      }

      const aplicarTema = () => {
        const claro = document.documentElement.dataset.theme === "light";
        const [r, g, b] = corCss(getComputedStyle(document.documentElement).getPropertyValue("--accent").trim());
        uniforms.uCor.value.setRGB(r, g, b, THREE.SRGBColorSpace);
        uniforms.uClaro.value = claro ? 1 : 0;
        const modo = claro ? THREE.NormalBlending : THREE.AdditiveBlending;
        for (const m of [matAnel, matFluxo, matDisco]) {
          m.blending = modo;
          m.needsUpdate = true;
        }
        for (const o of orbitas) (o.material as InstanceType<typeof THREE.LineBasicMaterial>).color.setRGB(r, g, b, THREE.SRGBColorSpace);
      };
      aplicarTema();
      const tema = new MutationObserver(aplicarTema);
      tema.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

      // No desktop o portal fica à direita do texto; no celular, centralizado atrás dele.
      const medir = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const largura = 2 * Math.tan((camera.fov * Math.PI) / 360) * 10 * camera.aspect;
        grupo.position.x = camera.aspect > 1.1 ? largura * 0.25 : 0;
        grupo.scale.setScalar(camera.aspect > 1.1 ? 0.9 : 0.78);
      };
      medir();
      const redimensionar = new ResizeObserver(medir);
      redimensionar.observe(host);

      // Mouse inclina a cena (suavizado), rolagem leva a câmera para dentro do portal.
      const alvo = { x: 0, y: 0 };
      const mover = (e: PointerEvent) => {
        alvo.x = (e.clientX / innerWidth) * 2 - 1;
        alvo.y = (e.clientY / innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", mover, { passive: true });
      const rolagem = { p: 0 };
      const st = reduzir
        ? null
        : ScrollTrigger.create({
            trigger: host.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (s) => (rolagem.p = s.progress),
          });

      const relogio = new THREE.Clock();
      let raf = 0;
      let rodando = false;
      const quadro = () => {
        const t = relogio.getElapsedTime();
        uniforms.uTime.value = t;
        // Entrada amarrada ao relógio (expo.out em 2,6 s), robusta a quadros espaçados.
        if (!reduzir) uniforms.uIntro.value = 1 - Math.pow(2, -10 * Math.min(1, Math.max(0, t - 0.2) / 2.6));
        grupo.rotation.y += (alvo.x * 0.35 - grupo.rotation.y) * 0.04;
        grupo.rotation.x += (alvo.y * 0.22 - grupo.rotation.x) * 0.04;
        orbitas[0].rotation.z += 0.0015;
        orbitas[1].rotation.z -= 0.001;
        camera.position.z = 10 - rolagem.p * 8.5;
        renderer.domElement.style.opacity = String(1 - Math.max(0, rolagem.p - 0.6) * 2.5);
        renderer.render(cena, camera);
      };
      const loop = () => {
        quadro();
        raf = requestAnimationFrame(loop);
      };
      const visivel = new IntersectionObserver(([e]) => {
        if (reduzir) return;
        if (e.isIntersecting && !rodando) {
          rodando = true;
          loop();
        } else if (!e.isIntersecting && rodando) {
          rodando = false;
          cancelAnimationFrame(raf);
        }
      });
      visivel.observe(host);
      quadro();

      limpar = () => {
        cancelAnimationFrame(raf);
        visivel.disconnect();
        redimensionar.disconnect();
        tema.disconnect();
        window.removeEventListener("pointermove", mover);
        st?.kill();
        anel.dispose();
        fluxo.dispose();
        disco.geometry.dispose();
        for (const o of orbitas) o.geometry.dispose();
        for (const m of [matAnel, matFluxo, matDisco]) m.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      desmontado = true;
      limpar();
    };
  }, []);

  return <div ref={ref} aria-hidden className={className} />;
}
