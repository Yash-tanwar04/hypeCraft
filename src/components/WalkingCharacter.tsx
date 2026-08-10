import React from 'react';

interface WalkingCharacterProps {
  progress: number; // 0 to 1 continuous scroll progress
  className?: string;
  isReversed?: boolean;
  isLookingAtBillboard?: boolean;
}

export const WalkingCharacter: React.FC<WalkingCharacterProps> = ({
  progress,
  className = '',
  isReversed = false,
  isLookingAtBillboard = true,
}) => {
  // Compute continuous walking cycle phase from progress
  // 1 full stride cycle = 2 steps = 2π phase shift
  // Scale progress so the character takes ~36 natural strides across the full journey
  const strides = progress * 36;
  const phase = strides * Math.PI * 2;

  // Kinematic calculations for human walking gait:
  // Leg 1 (Front leg relative to camera) & Leg 2 (Back leg)
  const leg1Angle = Math.sin(phase) * 32; // degrees
  const leg2Angle = Math.sin(phase + Math.PI) * 32;

  // Knee flexes when leg swings forward
  const knee1Flex = Math.max(0, Math.sin(phase - 0.4)) * 26;
  const knee2Flex = Math.max(0, Math.sin(phase + Math.PI - 0.4)) * 26;

  // Arms swing opposite to legs
  const arm1Angle = Math.sin(phase + Math.PI) * 24; // Front arm
  const arm2Angle = Math.sin(phase) * 24; // Back arm

  // Vertical body bob (hip height oscillates twice per stride cycle)
  const verticalBob = Math.abs(Math.sin(phase)) * 5;

  // Coat sway (flares slightly backwards as character walks forward)
  const coatSway = Math.sin(phase * 0.8) * 5 + 4;

  // Head tilt: when approaching/passing a billboard, head turns slightly up (-18deg) to look at billboard above
  const headRotation = isLookingAtBillboard ? -18 + Math.sin(phase * 0.5) * 3 : 0;
  const headLiftY = isLookingAtBillboard ? -3 : 0;

  // Shadow stretch & opacity modulation
  const shadowScaleX = 1 + Math.sin(phase * 2) * 0.12;
  const shadowOpacity = 0.4 + Math.cos(phase * 2) * 0.08;

  return (
    <div
      className={`relative pointer-events-none select-none transition-transform duration-75 ${className}`}
      style={{
        transform: `translateY(${-verticalBob}px) ${isReversed ? 'scaleX(-1)' : 'scaleX(1)'}`,
      }}
    >
      {/* GROUND CAST SHADOW ON SIDEWALK */}
      <svg
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-10 overflow-visible"
        viewBox="0 0 160 30"
      >
        <ellipse
          cx="80"
          cy="15"
          rx={42 * shadowScaleX}
          ry="7"
          fill="#040e21"
          opacity={shadowOpacity}
          filter="blur(3px)"
        />
        {/* Foot contact shadows */}
        <ellipse
          cx={80 + Math.sin(phase) * 20}
          cy="18"
          rx="12"
          ry="3"
          fill="#000"
          opacity="0.6"
          filter="blur(1.5px)"
        />
        <ellipse
          cx={80 - Math.sin(phase) * 20}
          cy="18"
          rx="12"
          ry="3"
          fill="#000"
          opacity="0.5"
          filter="blur(1.5px)"
        />
      </svg>

      {/* CHARACTER SVG (EDITORIAL FIGURE IN TRENCH COAT) */}
      <svg
        width="110"
        height="220"
        viewBox="0 0 110 220"
        className="overflow-visible drop-shadow-md"
      >
        <defs>
          <linearGradient id="coatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B234A" />
            <stop offset="60%" stopColor="#071936" />
            <stop offset="100%" stopColor="#030A17" />
          </linearGradient>
          <linearGradient id="pantGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1A2536" />
            <stop offset="100%" stopColor="#09111D" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D2A37B" />
            <stop offset="100%" stopColor="#B8855F" />
          </linearGradient>
          <linearGradient id="goldAcc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D77F" />
            <stop offset="100%" stopColor="#D9A21B" />
          </linearGradient>
        </defs>

        <g transform="translate(15, 10)">
          {/* BACK ARM (Layer 1) */}
          <g transform={`rotate(${arm2Angle}, 42, 55)`}>
            {/* Upper arm */}
            <rect x="39" y="55" width="8" height="28" rx="4" fill="#040e21" />
            {/* Forearm */}
            <rect x="39" y="80" width="7" height="26" rx="3.5" fill="#071936" />
            {/* Hand */}
            <circle cx="42.5" cy="108" r="3.5" fill="url(#skinGrad)" />
          </g>

          {/* BACK LEG (Layer 2) */}
          <g transform={`rotate(${leg2Angle}, 42, 115)`}>
            {/* Thigh */}
            <rect x="37" y="115" width="11" height="42" rx="5" fill="url(#pantGrad)" />
            {/* Lower leg & knee flex */}
            <g transform={`rotate(${knee2Flex}, 42, 155)`}>
              <rect x="38" y="155" width="9" height="38" rx="4" fill="#071936" />
              {/* Shoe (White sole sneaker) */}
              <path d="M35 190 H50 Q52 190 52 194 V197 H34 V192 Z" fill="#FAFAF7" />
              <path d="M35 190 H48 V194 H35 Z" fill="#071936" />
              <path d="M34 195 H52 V197 H34 Z" fill="#D9A21B" opacity="0.8" />
            </g>
          </g>

          {/* TORSO & TRENCH COAT BODY (Layer 3) */}
          <g id="torso">
            {/* Inner shirt / tie accent */}
            <polygon points="40,38 46,38 44,58 41,58" fill="#FAFAF7" />
            <polygon points="42,42 44,42 43,56" fill="url(#goldAcc)" />

            {/* Back Flap of Coat (Swinging backward) */}
            <path
              d={`M32 60 Q${22 - coatSway} 95 ${18 - coatSway * 1.5} 132 L38 128 L42 85 Z`}
              fill="#030A17"
            />

            {/* Main Coat Body */}
            <path
              d="M32 40 C32 36 50 36 52 40 L56 75 L50 126 C44 128 34 126 30 122 L28 75 Z"
              fill="url(#coatGrad)"
            />

            {/* Coat Lapels & Collar */}
            <path d="M32 40 L40 58 L34 60 Z" fill="#0F2D5E" />
            <path d="M52 40 L44 58 L50 60 Z" fill="#081E40" />

            {/* Coat Belt & Gold Buckle */}
            <rect x="30" y="72" width="25" height="5" fill="#030A17" rx="1" />
            <rect x="40" y="71" width="6" height="7" fill="url(#goldAcc)" rx="1" />
          </g>

          {/* FRONT LEG (Layer 4) */}
          <g transform={`rotate(${leg1Angle}, 42, 115)`}>
            {/* Thigh */}
            <rect x="36" y="115" width="12" height="42" rx="5" fill="url(#pantGrad)" />
            {/* Lower leg & knee flex */}
            <g transform={`rotate(${knee1Flex}, 42, 155)`}>
              <rect x="37" y="155" width="10" height="38" rx="4" fill="#0A182E" />
              {/* Shoe (White sole sneaker) */}
              <path d="M35 190 H51 Q53 190 53 194 V197 H34 V192 Z" fill="#FAFAF7" />
              <path d="M35 190 H49 V194 H35 Z" fill="#071936" />
              <path d="M34 195 H53 V197 H34 Z" fill="#D9A21B" />
            </g>
          </g>

          {/* FRONT ARM (Layer 5) */}
          <g transform={`rotate(${arm1Angle}, 34, 52)`}>
            {/* Shoulder / Sleeve */}
            <path d="M28 42 Q26 55 28 78 L36 78 Q36 55 36 42 Z" fill="url(#coatGrad)" />
            {/* Forearm sleeve */}
            <rect x="27" y="76" width="8" height="26" rx="4" fill="#081E40" />
            {/* Cuff */}
            <rect x="26.5" y="100" width="9" height="2" fill="url(#goldAcc)" />
            {/* Hand */}
            <circle cx="31" cy="106" r="3.8" fill="url(#skinGrad)" />
          </g>

          {/* HEAD & NECK (Layer 6) - TILTED TO LOOK AT BILLBOARD ABOVE */}
          <g
            id="head"
            transform={`translate(0, ${-2 + headLiftY}) rotate(${headRotation}, 42, 28)`}
          >
            {/* Neck */}
            <rect x="39" y="28" width="7" height="12" fill="url(#skinGrad)" />
            {/* Head Contour (Profile facing Right & Looking Up) */}
            <path
              d="M34 16 C34 9 40 6 46 8 C51 10 53 15 53 22 C53 28 48 31 43 31 C37 31 34 26 34 16 Z"
              fill="url(#skinGrad)"
            />
            {/* Nose & Jaw definition */}
            <path d="M51 18 L55 21 L51 24 L50 29 L44 31" fill="none" stroke="#B8855F" strokeWidth="1" />
            {/* Dark Hair / Haircut */}
            <path
              d="M33 16 C33 8 40 4 48 5 C52 6 54 10 54 14 C51 13 46 12 41 15 C38 17 35 22 35 25 Z"
              fill="#030A17"
            />
            {/* Sunglasses / Glasses accent angled up towards billboard */}
            <rect x="45" y="14" width="8" height="4" rx="1" fill="#071936" opacity="0.9" />
            <rect x="47" y="15" width="5" height="1.5" fill="#D9A21B" opacity="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
};
