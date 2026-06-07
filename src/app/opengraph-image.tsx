import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FindWatchParty — World Cup 2026 Watch Parties in NYC & NJ';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0ea5e9',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 96, marginBottom: 24 }}>⚽</div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-1px',
            marginBottom: 16,
          }}
        >
          FindWatchParty
        </div>
        <div
          style={{
            fontSize: 30,
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 500,
          }}
        >
          World Cup 2026 Watch Parties · NYC &amp; NJ
        </div>
        <div
          style={{
            marginTop: 32,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 999,
            padding: '10px 28px',
            fontSize: 22,
            color: 'white',
            fontWeight: 600,
          }}
        >
          161 venues · findwatchparty.com
        </div>
      </div>
    ),
    size
  );
}
