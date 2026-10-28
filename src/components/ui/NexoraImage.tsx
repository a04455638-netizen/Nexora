"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Cpu } from "lucide-react";

interface NexoraImageProps extends Omit<ImageProps, "onError"> {
  fallbackCategory?: string;
  fallbackText?: string;
}

export const NexoraImage: React.FC<NexoraImageProps> = ({
  src,
  alt,
  className = "",
  fallbackCategory = "tech",
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback UI when remote image fails to load
  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-[#151515] border border-[#262626] rounded-xl overflow-hidden p-4 select-none ${className}`}
        style={{ minHeight: "180px" }}
      >
        {/* Subtle tech grid background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#76B900_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-lg bg-[#1F1F1F] border border-[#333333] flex items-center justify-center text-[#76B900] mb-2 shadow-neon-sm">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            {fallbackText || alt || "NEXORA Tech"}
          </span>
          <span className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest font-mono">
            {fallbackCategory}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#161616] animate-pulse z-10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#76B900] border-t-transparent animate-spin opacity-50" />
        </div>
      )}
      <Image
        src={src}
        alt={alt || "NEXORA Tech Product"}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
        className={`transition-all duration-500 ease-out ${
          isLoading ? "scale-105 blur-sm opacity-0" : "scale-100 blur-0 opacity-100"
        } ${props.fill ? "object-contain" : ""}`}
        {...props}
      />
    </div>
  );
};

export default NexoraImage;
