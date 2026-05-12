'use client';

import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import './LogoLoop.css';

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

type LogoItemNode = { node: React.ReactNode; title?: string; href?: string; ariaLabel?: string };
type LogoItemImg  = { src: string; alt?: string; title?: string; href?: string; srcSet?: string; sizes?: string; width?: number; height?: number };
type LogoItem = LogoItemNode | LogoItemImg;

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const toCssLength = (v: number | string | undefined) =>
  typeof v === 'number' ? `${v}px` : (v ?? undefined);

export const LogoLoop = memo(function LogoLoop({
  logos, speed = 120, direction = 'left', width = '100%',
  logoHeight = 28, gap = 32, pauseOnHover, hoverSpeed,
  fadeOut = false, fadeOutColor, scaleOnHover = false,
  ariaLabel = 'Partner logos', className, style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const seqRef       = useRef<HTMLUListElement>(null);
  const [seqWidth, setSeqWidth]   = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    return undefined;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === 'up' || direction === 'down';

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dir = isVertical ? (direction === 'up' ? 1 : -1) : (direction === 'left' ? 1 : -1);
    return mag * dir * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerW = containerRef.current?.clientWidth ?? 0;
    const seqRect = seqRef.current?.getBoundingClientRect();
    const sw = seqRect?.width ?? 0;
    const sh = seqRect?.height ?? 0;
    if (isVertical) {
      const pH = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && pH > 0) containerRef.current.style.height = `${Math.ceil(pH)}px`;
      if (sh > 0) { setSeqHeight(Math.ceil(sh)); setCopyCount(Math.max(MIN_COPIES, Math.ceil((containerRef.current?.clientHeight ?? pH) / sh) + COPY_HEADROOM)); }
    } else if (sw > 0) {
      setSeqWidth(Math.ceil(sw));
      setCopyCount(Math.max(MIN_COPIES, Math.ceil(containerW / sw) + COPY_HEADROOM));
    }
  }, [isVertical]);

  useEffect(() => {
    const els = [containerRef, seqRef].map(r => r.current).filter(Boolean) as Element[];
    if (!window.ResizeObserver) { window.addEventListener('resize', updateDimensions); updateDimensions(); return () => window.removeEventListener('resize', updateDimensions); }
    const observers = els.map(el => { const o = new ResizeObserver(updateDimensions); o.observe(el); return o; });
    updateDimensions();
    return () => observers.forEach(o => o.disconnect());
  }, [updateDimensions, logos, gap, logoHeight, isVertical]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const seqSize = isVertical ? seqHeight : seqWidth;
    let offset = 0;
    let velocity = 0;
    let lastTs: number | null = null;
    let rafId: number;

    const animate = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = Math.max(0, ts - lastTs) / 1000;
      lastTs = ts;
      const target = isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity;
      velocity += (target - velocity) * (1 - Math.exp(-dt / SMOOTH_TAU));
      if (seqSize > 0) {
        offset = ((offset + velocity * dt) % seqSize + seqSize) % seqSize;
        track.style.transform = isVertical ? `translate3d(0,${-offset}px,0)` : `translate3d(${-offset}px,0,0)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(rafId); lastTs = null; };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical]);

  const cssVars = useMemo(() => ({
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
  }), [gap, logoHeight, fadeOutColor]);

  const rootClassName = [
    'logoloop',
    isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
    fadeOut && 'logoloop--fade',
    scaleOnHover && 'logoloop--scale-hover',
    className,
  ].filter(Boolean).join(' ');

  const renderItem = useCallback((item: LogoItem, key: React.Key) => {
    const isNode = 'node' in item;
    const content = isNode
      ? <span className="logoloop__node">{(item as LogoItemNode).node}</span>
      : <img src={(item as LogoItemImg).src} alt={(item as LogoItemImg).alt ?? ''} loading="lazy" draggable={false} />;
    const label = isNode ? (item as LogoItemNode).ariaLabel ?? (item as LogoItemNode).title : (item as LogoItemImg).alt ?? (item as LogoItemImg).title;
    const wrapped = item.href
      ? <a className="logoloop__link" href={item.href} aria-label={label ?? 'logo'} target="_blank" rel="noreferrer noopener">{content}</a>
      : content;
    return <li className="logoloop__item" key={key} role="listitem">{wrapped}</li>;
  }, []);

  const lists = useMemo(() => Array.from({ length: copyCount }, (_, ci) => (
    <ul className="logoloop__list" key={ci} role="list" aria-hidden={ci > 0} ref={ci === 0 ? seqRef : undefined}>
      {logos.map((item, ii) => renderItem(item, `${ci}-${ii}`))}
    </ul>
  )), [copyCount, logos, renderItem]);

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      style={{ width: isVertical ? (toCssLength(width) === '100%' ? undefined : toCssLength(width)) : (toCssLength(width) ?? '100%'), ...cssVars, ...style } as React.CSSProperties}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={() => { if (effectiveHoverSpeed !== undefined) setIsHovered(true); }}
        onMouseLeave={() => { if (effectiveHoverSpeed !== undefined) setIsHovered(false); }}
      >
        {lists}
      </div>
    </div>
  );
});

export default LogoLoop;
