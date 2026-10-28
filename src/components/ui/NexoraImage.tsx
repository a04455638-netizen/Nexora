"use client";

import React, { useState } from "react";
import { Cpu } from "lucide-react";

interface NexoraImageProps {
  src?: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackCategory?: string;
  fallbackText?: string;
  [key: string]: any;
}

export const NexoraImage: React.FC<NexoraImageProps> = ({
  src,
  alt = "NEXORA Mahsulot",
  className = "",
  fill = false,
  width,
  height,
  priority = false,
  fallbackCategory = "texnika",
  fallbackText,
}) => {
  const [hasError, setHasError] = useState(false);

  // Fallback if image fails to load or empty
  if (hasError || !src || typeof src !== "string" || src.trim() === "") {
    return (
      <div
        className={`w-full h-full min-h-[50px] flex flex-col items-center justify-center bg-[#151515] border border-[#262626] rounded-xl text-zinc-400 p-2 select-none ${className}`}
      >
        <div className="w-7 h-7 rounded-lg bg-[#1F1F1F] border border-[#333] flex items-center justify-center text-[#76B900] mb-1">
          <Cpu className="w-4 h-4" />
        </div>
        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 text-center line-clamp-1 max-w-full">
          {fallbackText || alt}
        </span>
      </div>
    );
  }

  // Render direct resilient image
  return (
    <img
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        setHasError(true);
      }}
      className={`${fill ? "w-full h-full object-contain" : "object-contain"} ${className}`}
    />
  );
};

export default NexoraImage;
