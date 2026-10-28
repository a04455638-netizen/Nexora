"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Cpu, Smartphone, Laptop, Tv, Monitor, Headphones, Gamepad2, Keyboard, HardDrive, Sparkles } from "lucide-react";

interface NexoraImageProps {
  src?: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  fallbackCategory?: string;
  fallbackText?: string;
  [key: string]: any;
}

function getCategoryIcon(cat?: string) {
  const c = (cat || "").toLowerCase();
  if (c.includes("smartfon") || c.includes("phone")) return <Smartphone className="w-5 h-5 text-[#76B900]" />;
  if (c.includes("noutbuk") || c.includes("laptop")) return <Laptop className="w-5 h-5 text-[#76B900]" />;
  if (c.includes("televizor") || c.includes("tv")) return <Tv className="w-5 h-5 text-[#76B900]" />;
  if (c.includes("monitor")) return <Monitor className="w-5 h-5 text-[#76B900]" />;
  if (c.includes("quloqchin") || c.includes("headphone")) return <Headphones className="w-5 h-5 text-[#76B900]" />;
  if (c.includes("gaming") || c.includes("geympad") || c.includes("playstation") || c.includes("xbox")) {
    return <Gamepad2 className="w-5 h-5 text-[#76B900]" />;
  }
  if (c.includes("klaviatura") || c.includes("sichqoncha") || c.includes("mouse") || c.includes("keyboard")) {
    return <Keyboard className="w-5 h-5 text-[#76B900]" />;
  }
  if (c.includes("storage") || c.includes("router") || c.includes("saqlash")) {
    return <HardDrive className="w-5 h-5 text-[#76B900]" />;
  }
  if (c.includes("videokarta") || c.includes("protsessor") || c.includes("cpu") || c.includes("gpu")) {
    return <Cpu className="w-5 h-5 text-[#76B900]" />;
  }
  return <Sparkles className="w-5 h-5 text-[#76B900]" />;
}

export const NexoraImage: React.FC<NexoraImageProps> = ({
  src,
  alt = "NEXORA Mahsuloti",
  className = "",
  fill = false,
  width,
  height,
  priority = false,
  sizes,
  fallbackCategory = "texnika",
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // If no source or error occurred, show the professional category-appropriate fallback
  if (hasError || !src || typeof src !== "string" || src.trim() === "") {
    return (
      <div
        className={`w-full h-full min-h-[90px] flex flex-col items-center justify-center bg-[#121216] border border-[#262630] rounded-xl text-zinc-400 p-3 select-none text-center ${className}`}
      >
        <div className="w-10 h-10 rounded-xl bg-[#1A1A22] border border-[#333342] flex items-center justify-center mb-2 shadow-neon-sm">
          {getCategoryIcon(fallbackCategory)}
        </div>
        <span className="text-[11px] font-bold text-zinc-200 line-clamp-1 max-w-[90%] mb-0.5">
          {fallbackText || alt}
        </span>
        <span className="text-[9px] font-mono uppercase tracking-wider text-[#76B900] bg-[#76B900]/10 border border-[#76B900]/30 px-2 py-0.5 rounded-full">
          Mahsulot rasmi mavjud emas
        </span>
      </div>
    );
  }

  const isSvg = src.endsWith(".svg") || src.includes(".svg?") || src.startsWith("data:image/svg+xml");
  const isLocal = src.startsWith("/");

  // If dimensions not provided and not fill, provide sensible defaults for Next.js Image
  const imgWidth = !fill ? (width || 600) : undefined;
  const imgHeight = !fill ? (height || 450) : undefined;

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={imgWidth}
      height={imgHeight}
      priority={priority}
      sizes={sizes || (fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined)}
      unoptimized={isSvg}
      onError={() => setHasError(true)}
      className={`${fill ? "w-full h-full object-contain" : "object-contain"} ${className}`}
      {...props}
    />
  );
};

export default NexoraImage;
