'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Color, Mesh, OrthographicCamera, PlaneGeometry, Scene,
  ShaderMaterial, Vector2, Vector3, WebGLRenderer,
} from 'three';
import './PixelSnow.css';

const vertexShader = `void main() { gl_Position = vec4(position, 1.0); }`;

const fragmentShader = `
precision mediump float;
uniform float uTime; uniform vec2 uResolution; uniform float uFlakeSize;
uniform float uMinFlakeSize; uniform float uPixelResolution; uniform float uSpeed;
uniform float uDepthFade; uniform float uFarPlane; uniform vec3 uColor;
uniform float uBrightness; uniform float uGamma; uniform float uDensity;
uniform float uVariant; uniform float uDirection;
#define PI 3.14159265
#define M1 1597334677U
#define M2 3812015801U
#define M3 3299493293U
#define F0 2.3283064e-10
#define hash(n) (n * (n ^ (n >> 15)))
#define coord3(p) (uvec3(p).x * M1 ^ uvec3(p).y * M2 ^ uvec3(p).z * M3)
const vec3 camK = vec3(0.57735027, 0.57735027, 0.57735027);
const vec3 camI = vec3(0.70710678, 0.0, -0.70710678);
const vec3 camJ = vec3(-0.40824829, 0.81649658, -0.40824829);
vec3 hash3(uint n) { uvec3 h = hash(n) * uvec3(1U, 511U, 262143U); return vec3(h) * F0; }
void main() {
  float ps = max(1.0, floor(0.5 + uResolution.x / uPixelResolution));
  vec2 fc = floor(gl_FragCoord.xy / ps); vec2 res = uResolution / ps;
  vec3 ray = normalize(vec3((fc - res * 0.5) / res.x, 1.0));
  ray = ray.x * camI + ray.y * camJ + ray.z * camK;
  float ts = uTime * uSpeed;
  vec3 camPos = (cos(uDirection) * 0.4 * camI + sin(uDirection) * 0.4 * camJ + 0.1 * camK) * ts;
  vec3 pos = camPos;
  vec3 ar = max(abs(ray), vec3(0.001)); vec3 st = 1.0 / ar; vec3 rs = step(ray, vec3(0.0));
  vec3 ph = fract(pos) * st; ph = mix(st - ph, ph, rs);
  float rdc = dot(ray, camK); float inv_dc = 1.0 / rdc; float inv_df = 1.0 / uDepthFade;
  vec3 ta = ts * 0.1 * vec3(7.0, 8.0, 5.0);
  float t = 0.0;
  for (int i = 0; i < 128; i++) {
    if (t >= uFarPlane) break;
    vec3 fp = floor(pos); uint cc = coord3(fp);
    if (hash3(cc).x < uDensity) {
      vec3 h = hash3(cc);
      vec3 flp = 0.5 - 0.5 * cos(4.0 * sin(fp.yzx * 0.073) + 4.0 * sin(fp.zxy * 0.27) + 2.0 * h + ta);
      flp = flp * 0.8 + 0.1 + fp;
      float ti = dot(flp - pos, camK) * inv_dc;
      if (ti > 0.0) {
        vec3 tp = pos + ray * ti - flp;
        float tx = dot(tp, camI); float ty = dot(tp, camJ);
        float depth = dot(flp - camPos, camK);
        float fs = max(uFlakeSize, uMinFlakeSize * depth * 0.5 / res.x);
        float dist = uVariant < 0.5 ? max(abs(tx), abs(ty)) : length(vec2(tx, ty));
        if (dist < fs) {
          float r = uFlakeSize / fs;
          float intensity = exp2(-(t + ti) * inv_df) * min(1.0, r * r) * uBrightness;
          gl_FragColor = vec4(uColor * pow(vec3(intensity), vec3(uGamma)), 1.0);
          return;
        }
      }
    }
    float nx = min(min(ph.x, ph.y), ph.z);
    vec3 sel = step(ph, vec3(nx)); ph = ph - nx + st * sel; t += nx;
    pos = mix(pos + ray * nx, floor(pos + ray * nx + 0.5), sel);
  }
  gl_FragColor = vec4(0.0);
}`;

interface PixelSnowProps {
  color?: string;
  flakeSize?: number;
  minFlakeSize?: number;
  pixelResolution?: number;
  speed?: number;
  depthFade?: number;
  farPlane?: number;
  brightness?: number;
  gamma?: number;
  density?: number;
  variant?: 'square' | 'round';
  direction?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function PixelSnow({
  color = '#DB1A1A', flakeSize = 0.01, minFlakeSize = 1.25,
  pixelResolution = 150, speed = 0.8, depthFade = 8,
  farPlane = 20, brightness = 0.8, gamma = 0.4545,
  density = 0.2, variant = 'round', direction = 125,
  className = '', style = {},
}: PixelSnowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const isVisibleRef = useRef(true);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);

  const variantValue = useMemo(() => variant === 'round' ? 1.0 : 0.0, [variant]);
  const colorVector = useMemo(() => { const c = new Color(color); return new Vector3(c.r, c.g, c.b); }, [color]);

  const handleResize = useCallback(() => {
    const container = containerRef.current;
    const renderer = rendererRef.current;
    const material = materialRef.current;
    if (!container || !renderer || !material) return;
    const w = container.offsetWidth; const h = container.offsetHeight;
    renderer.setSize(w, h);
    material.uniforms.uResolution.value.set(w, h);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([e]) => { isVisibleRef.current = e.isIntersecting; }, { threshold: 0 });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new WebGLRenderer({ antialias: false, alpha: true, premultipliedAlpha: false, powerPreference: 'high-performance', stencil: false, depth: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const material = new ShaderMaterial({
      vertexShader, fragmentShader, transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vector2(container.offsetWidth, container.offsetHeight) },
        uFlakeSize: { value: flakeSize }, uMinFlakeSize: { value: minFlakeSize },
        uPixelResolution: { value: pixelResolution }, uSpeed: { value: speed },
        uDepthFade: { value: depthFade }, uFarPlane: { value: farPlane },
        uColor: { value: colorVector.clone() }, uBrightness: { value: brightness },
        uGamma: { value: gamma }, uDensity: { value: density },
        uVariant: { value: variantValue }, uDirection: { value: (direction * Math.PI) / 180 },
      },
    });
    materialRef.current = material;
    scene.add(new Mesh(new PlaneGeometry(2, 2), material));
    window.addEventListener('resize', handleResize);
    const start = performance.now();
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (isVisibleRef.current) { material.uniforms.uTime.value = (performance.now() - start) * 0.001; renderer.render(scene, camera); }
    };
    animate();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose(); renderer.forceContextLoss();
      material.dispose(); rendererRef.current = null; materialRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleResize]);

  useEffect(() => {
    const m = materialRef.current;
    if (!m) return;
    m.uniforms.uFlakeSize.value = flakeSize; m.uniforms.uMinFlakeSize.value = minFlakeSize;
    m.uniforms.uPixelResolution.value = pixelResolution; m.uniforms.uSpeed.value = speed;
    m.uniforms.uDepthFade.value = depthFade; m.uniforms.uFarPlane.value = farPlane;
    m.uniforms.uBrightness.value = brightness; m.uniforms.uGamma.value = gamma;
    m.uniforms.uDensity.value = density; m.uniforms.uVariant.value = variantValue;
    m.uniforms.uDirection.value = (direction * Math.PI) / 180;
    m.uniforms.uColor.value.copy(colorVector);
  }, [flakeSize, minFlakeSize, pixelResolution, speed, depthFade, farPlane, brightness, gamma, density, variantValue, direction, colorVector]);

  return <div ref={containerRef} className={`pixel-snow-container ${className}`} style={style} />;
}
