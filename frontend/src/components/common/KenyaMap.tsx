'use client';

import dynamic from 'next/dynamic';

const MapInner = dynamic(() => import('./KenyaMapInner'), { ssr: false, loading: () => (
  <div
    className="flex h-full w-full items-center justify-center rounded-2xl"
    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
  >
    <div className="flex flex-col items-center gap-3" style={{ color: 'var(--color-text-muted)' }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
      <span className="text-sm">Loading map…</span>
    </div>
  </div>
)});

export function KenyaMap() {
  return <MapInner />;
}
