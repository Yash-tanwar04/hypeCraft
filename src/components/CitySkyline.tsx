import React from 'react';

export const CitySkyline: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 1. ATMOSPHERIC NIGHT SKY & CITY LIGHT POLLUTION GLOWS */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040e21] via-[#071936] to-[#040e21]">
        {/* Distant city lights horizon glow */}
        <div className="absolute bottom-20 inset-x-0 h-96 bg-gradient-to-t from-[#D9A21B]/15 via-[#1E3B70]/30 to-transparent blur-3xl" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#3B82F6]/10 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/3 w-[800px] h-[500px] bg-[#D9A21B]/10 rounded-full blur-3xl" />
      </div>

      {/* 2. SILHOUETTE SKYLINE LAYER 1 (DISTANT MEGASTRUCTURES & TOWERS) */}
      <div className="parallax-bg-far absolute bottom-12 left-0 w-[550vw] h-[75%] opacity-40 flex items-end will-change-transform transform-gpu">
        <svg
          className="w-full h-full"
          viewBox="0 0 5500 700"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Base Sky Distant Buildings */}
          <path
            d="
              M 0 700 L 0 350 L 120 350 L 120 280 L 220 280 L 220 180 L 300 120 L 380 180 L 380 350 L 520 350 L 520 240 L 680 240 L 680 150 L 710 80 L 740 150 L 740 240 L 880 240 L 880 380 L 1050 380
              L 1050 200 L 1150 140 L 1250 200 L 1250 380 L 1400 380 L 1400 290 L 1500 220 L 1600 290 L 1600 380 L 1750 380 L 1750 160 L 1800 100 L 1850 160 L 1850 380 L 2000 380 L 2000 250
              L 2150 250 L 2150 130 L 2220 60 L 2290 130 L 2290 250 L 2450 250 L 2450 390 L 2600 390 L 2600 210 L 2720 140 L 2840 210 L 2840 390 L 3000 390 L 3000 270 L 3150 200 L 3300 270
              L 3300 390 L 3480 390 L 3480 170 L 3550 90 L 3620 170 L 3620 390 L 3800 390 L 3800 230 L 3950 230 L 3950 120 L 4020 50 L 4090 120 L 4090 230 L 4250 230 L 4250 370 L 4400 370
              L 4400 220 L 4520 150 L 4640 220 L 4640 370 L 4800 370 L 4800 260 L 4950 190 L 5100 260 L 5100 370 L 5300 370 L 5300 220 L 5400 160 L 5500 220 L 5500 700 Z
            "
            fill="#061630"
          />

          {/* Spires and antenna lines */}
          <line x1="300" y1="120" x2="300" y2="40" stroke="#D9A21B" strokeWidth="2" opacity="0.8" />
          <line x1="710" y1="80" x2="710" y2="10" stroke="#EF4444" strokeWidth="2" opacity="0.9" />
          <line x1="1800" y1="100" x2="1800" y2="20" stroke="#D9A21B" strokeWidth="2" opacity="0.8" />
          <line x1="2220" y1="60" x2="2220" y2="5" stroke="#EF4444" strokeWidth="2" opacity="0.9" />
          <line x1="3550" y1="90" x2="3550" y2="15" stroke="#D9A21B" strokeWidth="2" opacity="0.8" />
          <line x1="4020" y1="50" x2="4020" y2="0" stroke="#EF4444" strokeWidth="2" opacity="0.9" />

          {/* Red beacon lights on tower tips */}
          <circle cx="710" cy="10" r="3" fill="#EF4444" className="animate-pulse" />
          <circle cx="2220" cy="5" r="3" fill="#EF4444" className="animate-pulse" />
          <circle cx="4020" cy="0" r="3" fill="#EF4444" className="animate-pulse" />
        </svg>
      </div>

      {/* 3. MIDGROUND HIGH-RISE BUILDINGS WITH LIT WINDOW GRID PATTERNS */}
      <div className="absolute bottom-12 left-0 w-[550vw] h-[65%] opacity-70 flex items-end will-change-transform transform-gpu">
        <svg
          className="w-full h-full"
          viewBox="0 0 5500 600"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Detailed Midground Skyline Profile */}
          <path
            d="
              M 0 600 L 0 280 L 180 280 L 180 200 L 320 200 L 320 280 L 450 280 L 450 150 L 600 150 L 600 280 L 780 280 L 780 180 L 920 180 L 920 280 L 1100 280
              L 1100 160 L 1260 160 L 1260 280 L 1450 280 L 1450 190 L 1600 190 L 1600 280 L 1800 280 L 1800 140 L 1960 140 L 1960 280 L 2150 280
              L 2150 170 L 2320 170 L 2320 280 L 2500 280 L 2500 150 L 2680 150 L 2680 280 L 2880 280 L 2880 180 L 3050 180 L 3050 280 L 3250 280
              L 3250 140 L 3420 140 L 3420 280 L 3620 280 L 3620 190 L 3780 190 L 3780 280 L 3980 280 L 3980 160 L 4150 160 L 4150 280 L 4350 280
              L 4350 180 L 4520 180 L 4520 280 L 4720 280 L 4720 150 L 4900 150 L 4900 280 L 5100 280 L 5100 200 L 5280 200 L 5280 280 L 5500 280 L 5500 600 Z
            "
            fill="#091c3d"
            stroke="#D9A21B"
            strokeWidth="1"
            strokeOpacity="0.2"
          />

          {/* Lit Window Grids across buildings */}
          {[
            { x: 50, y: 300, cols: 6, rows: 12, color: '#D9A21B' },
            { x: 200, y: 220, cols: 5, rows: 14, color: '#FAFAF7' },
            { x: 470, y: 170, cols: 6, rows: 18, color: '#D9A21B' },
            { x: 800, y: 200, cols: 5, rows: 15, color: '#3B82F6' },
            { x: 1120, y: 180, cols: 6, rows: 16, color: '#D9A21B' },
            { x: 1470, y: 210, cols: 5, rows: 14, color: '#FAFAF7' },
            { x: 1820, y: 160, cols: 6, rows: 18, color: '#D9A21B' },
            { x: 2170, y: 190, cols: 5, rows: 15, color: '#3B82F6' },
            { x: 2520, y: 170, cols: 6, rows: 17, color: '#D9A21B' },
            { x: 2900, y: 200, cols: 5, rows: 15, color: '#FAFAF7' },
            { x: 3270, y: 160, cols: 6, rows: 18, color: '#D9A21B' },
            { x: 3640, y: 210, cols: 5, rows: 14, color: '#3B82F6' },
            { x: 4000, y: 180, cols: 6, rows: 16, color: '#D9A21B' },
            { x: 4370, y: 200, cols: 5, rows: 15, color: '#FAFAF7' },
            { x: 4740, y: 170, cols: 6, rows: 17, color: '#D9A21B' },
            { x: 5120, y: 220, cols: 5, rows: 14, color: '#3B82F6' },
          ].map((grid, gIdx) => (
            <g key={gIdx} opacity={gIdx % 2 === 0 ? 0.75 : 0.5}>
              {Array.from({ length: grid.rows }).map((_, r) =>
                Array.from({ length: grid.cols }).map((_, c) => {
                  // Randomly leave some windows dark for realistic city lighting
                  const isLit = (gIdx * 7 + r * 3 + c * 5) % 3 !== 0;
                  if (!isLit) return null;
                  return (
                    <rect
                      key={`${r}-${c}`}
                      x={grid.x + c * 16}
                      y={grid.y + r * 18}
                      width="8"
                      height="10"
                      fill={grid.color}
                      rx="1"
                      opacity={( (gIdx + r + c) % 5 ) * 0.15 + 0.35}
                    />
                  );
                })
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* 4. STREET-LEVEL URBAN FACADES & NEON SIGNS IMMEDIATELY BEHIND THE CARDS */}
      <div className="absolute bottom-0 left-0 w-[550vw] h-[450px] opacity-85 flex items-end">
        <div className="w-full h-full relative">
          {/* Subtle grid facade texture */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'linear-gradient(to right, #D9A21B 1px, transparent 1px), linear-gradient(to bottom, #D9A21B 1px, transparent 1px)',
              backgroundSize: '80px 100px',
            }}
          />

          {/* STREET LAMPS & LIGHT CONES BETWEEN THE BILLBOARDS */}
          {[120, 950, 1780, 2610, 3440, 4270, 5100].map((lampX, lIdx) => (
            <div
              key={lIdx}
              className="absolute bottom-28 z-20 flex flex-col items-center"
              style={{ left: `${lampX}px` }}
            >
              {/* Street Lamp Top Fixture */}
              <div className="relative flex items-center justify-center">
                {/* Glowing Lamp Head */}
                <div className="w-8 h-3 bg-[#D9A21B] rounded-t-full shadow-[0_0_25px_rgba(217,162,27,0.9)] border border-white/40" />
                
                {/* Light Cone Spray onto sidewalk */}
                <div
                  className="absolute top-3 w-48 h-64 opacity-25 pointer-events-none"
                  style={{
                    background:
                      'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
                    backgroundImage:
                      'linear-gradient(to bottom, rgba(217,162,27,0.8), rgba(217,162,27,0.05))',
                    clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
                  }}
                />
              </div>

              {/* Lamp Post Metal Pole */}
              <div className="w-2 h-36 bg-gradient-to-b from-[#132B52] via-[#081B38] to-[#040e21] border-x border-[#D9A21B]/30" />
              <div className="w-5 h-2 bg-[#D9A21B]/40 rounded-xs" />
            </div>
          ))}

          {/* BACKGROUND AMBIENT NEON BRANDING ON CITY WALLS */}
          <div className="absolute top-16 left-[400px] text-[10px] font-mono tracking-[0.4em] text-[#D9A21B]/30 uppercase rotate-90 border-l border-[#D9A21B]/20 pl-2">
            HYPECRAFT DISTRICT 01
          </div>
          <div className="absolute top-16 left-[1250px] text-[10px] font-mono tracking-[0.4em] text-[#3B82F6]/30 uppercase rotate-90 border-l border-[#3B82F6]/20 pl-2">
            STRATEGY MEDIA TOWER
          </div>
          <div className="absolute top-16 left-[2100px] text-[10px] font-mono tracking-[0.4em] text-[#D9A21B]/30 uppercase rotate-90 border-l border-[#D9A21B]/20 pl-2">
            BRANDING STUDIO ARC
          </div>
          <div className="absolute top-16 left-[2950px] text-[10px] font-mono tracking-[0.4em] text-[#EF4444]/30 uppercase rotate-90 border-l border-[#EF4444]/20 pl-2">
            VIDEO CONTENT PLAZA
          </div>
          <div className="absolute top-16 left-[3800px] text-[10px] font-mono tracking-[0.4em] text-[#D9A21B]/30 uppercase rotate-90 border-l border-[#D9A21B]/20 pl-2">
            DESIGN LAB HIGHWAY
          </div>
          <div className="absolute top-16 left-[4650px] text-[10px] font-mono tracking-[0.4em] text-[#D9A21B]/30 uppercase rotate-90 border-l border-[#D9A21B]/20 pl-2">
            CONSULTANCY CENTER
          </div>
        </div>
      </div>
    </div>
  );
};
