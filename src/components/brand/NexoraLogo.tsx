"use client";

import React from "react";
import Link from "next/link";

interface NexoraLogoProps {
  variant?: "full" | "icon" | "favicon";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  withLink?: boolean;
}

export const NexoraLogo: React.FC<NexoraLogoProps> = ({
  variant = "full",
  size = "md",
  className = "",
  withLink = true,
}) => {
  // Dimensions mapping
  const sizeMap = {
    sm: { icon: 28, height: 28, textH: 18, fontSize: "text-lg" },
    md: { icon: 38, height: 38, textH: 22, fontSize: "text-2xl" },
    lg: { icon: 48, height: 48, textH: 28, fontSize: "text-3xl" },
    xl: { icon: 64, height: 64, textH: 38, fontSize: "text-4xl" },
  };

  const currentSize = sizeMap[size];

  // Original Geometric "N" Symbol:
  // Features a futuristic faceted chevron structure with 3 precision polygonal facets in #76B900 and gradient tech green.
  const GeometricNSymbol = (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        {/* Neon Gradient */}
        <linearGradient id="nexoraNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#95EB00" />
          <stop offset="50%" stopColor="#76B900" />
          <stop offset="100%" stopColor="#4D7A00" />
        </linearGradient>

        {/* Dark Tech Facet Gradient */}
        <linearGradient id="nexoraDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>

        {/* Glow Filter */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Hexagonal Tech Backplate Accent (Subtle) */}
      <polygon
        points="50,4 88,25 88,75 50,96 12,75 12,25"
        fill="#121212"
        stroke="#222222"
        strokeWidth="2"
      />

      {/* Outer Hex Glow Ring Segment */}
      <path
        d="M 50 4 L 88 25 L 88 55"
        stroke="#76B900"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 50 96 L 12 75 L 12 45"
        stroke="#76B900"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Left Pillar of Geometric 'N' */}
      <polygon
        points="22,74 22,26 36,18 36,66"
        fill="url(#nexoraNeonGrad)"
        filter="url(#neonGlow)"
      />

      {/* Center Diagonal Slash of 'N' - Dynamic Hyper-Speed Beam */}
      <polygon
        points="36,24 74,78 64,84 26,30"
        fill="#76B900"
      />
      <polygon
        points="42,26 78,74 72,78 36,30"
        fill="#A3F700"
        opacity="0.8"
      />

      {/* Right Pillar of Geometric 'N' */}
      <polygon
        points="64,34 64,82 78,74 78,26"
        fill="url(#nexoraNeonGrad)"
      />

      {/* Core Laser Cutout Accent (Center diamond highlight) */}
      <polygon
        points="50,42 56,50 50,58 44,50"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </svg>
  );

  if (variant === "icon" || variant === "favicon") {
    if (withLink) {
      return (
        <Link
          href="/"
          className={`inline-flex items-center justify-center group ${className}`}
          aria-label="NEXORA Bosh sahifa"
        >
          {GeometricNSymbol}
        </Link>
      );
    }
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {GeometricNSymbol}
      </div>
    );
  }

  // Full Logo Variant: Geometric N + NEXORA typographic wordmark
  const fullContent = (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {GeometricNSymbol}

      <div className="flex flex-col justify-center">
        <div className="flex items-center tracking-[0.22em] font-extrabold leading-none">
          <span className={`${currentSize.fontSize} font-black text-white dark:text-white text-zinc-900 group-hover:text-nexora-green transition-colors`}>
            NEX
          </span>
          <span className={`${currentSize.fontSize} font-black text-nexora-green group-hover:text-white transition-colors`}>
            ORA
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#76B900] dark:text-[#76B900] font-semibold mt-0.5 opacity-90">
          PREMIUM TECH
        </span>
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="inline-block" aria-label="NEXORA Bosh sahifa">
        {fullContent}
      </Link>
    );
  }

  return fullContent;
};

export default NexoraLogo;
