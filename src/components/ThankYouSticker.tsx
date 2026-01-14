import React from "react";
import { Heart, Star, Sparkles } from "lucide-react";

export type StickerShape = "rounded" | "circular" | "square" | "diecut" | "ticket" | "badge";
export type StickerVariant = "classic" | "modern" | "elegant";

export interface StickerCustomization {
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  line5: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  fontStyle: "script" | "modern" | "classic";
  logo: string | null;
}

interface ThankYouStickerProps {
  variant?: StickerVariant;
  shape?: StickerShape;
  stickerRef?: React.RefObject<HTMLDivElement>;
  customization?: StickerCustomization;
}

export const defaultCustomization: StickerCustomization = {
  line1: "Thank You",
  line2: "For Your Order",
  line3: "Your support means the world to us",
  line4: "Follow us @yourstore",
  line5: "♡",
  primaryColor: "#8B5A2B",
  accentColor: "#D4A574",
  bgColor: "#FDF8F3",
  fontStyle: "script",
  logo: null,
};

const ThankYouSticker = ({ 
  variant = "classic", 
  shape = "rounded", 
  stickerRef,
  customization = defaultCustomization 
}: ThankYouStickerProps) => {
  const fontStyles = {
    script: "font-script",
    modern: "font-sans font-bold",
    classic: "font-serif",
  };

  const shapeStyles: Record<StickerShape, string> = {
    rounded: "w-72 h-80 rounded-2xl",
    circular: "w-80 h-80 rounded-full",
    square: "w-72 h-80 rounded-lg",
    diecut: "w-80 h-80 rounded-[3rem] rounded-br-lg rounded-tl-lg",
    ticket: "w-80 h-72 rounded-xl ticket-shape",
    badge: "w-72 h-80 badge-shape"
  };

  const shapeClass = shapeStyles[shape];
  const IconComponent = shape === "badge" ? Star : shape === "diecut" ? Sparkles : Heart;

  const containerStyle = {
    background: variant === "modern" 
      ? `linear-gradient(135deg, ${customization.primaryColor}, ${customization.accentColor})`
      : customization.bgColor,
    borderColor: customization.accentColor,
  };

  const textColor = variant === "modern" ? "#FFFFFF" : customization.primaryColor;
  const subtleColor = variant === "modern" ? "rgba(255,255,255,0.8)" : customization.accentColor;

  return (
    <div
      ref={stickerRef}
      style={containerStyle}
      className={`relative p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 border-2 shadow-sticker hover:shadow-sticker-hover ${shapeClass}`}
    >
      {/* Decorative elements based on shape */}
      {shape === "rounded" && (
        <>
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 opacity-30 rounded-tl-lg" style={{ borderColor: textColor }} />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 opacity-30 rounded-tr-lg" style={{ borderColor: textColor }} />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 opacity-30 rounded-bl-lg" style={{ borderColor: textColor }} />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 opacity-30 rounded-br-lg" style={{ borderColor: textColor }} />
        </>
      )}

      {shape === "circular" && (
        <div className="absolute inset-4 rounded-full border opacity-20" style={{ borderColor: textColor }} />
      )}

      {shape === "badge" && (
        <>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-0.5 opacity-30 rounded-full" style={{ backgroundColor: textColor }} />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-0.5 opacity-30 rounded-full" style={{ backgroundColor: textColor }} />
        </>
      )}

      {shape === "ticket" && (
        <>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-r-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-l-full" />
        </>
      )}

      {/* Logo or Icon */}
      {customization.logo ? (
        <img 
          src={customization.logo} 
          alt="Brand logo" 
          className="w-16 h-16 mb-2 object-contain"
        />
      ) : (
        <IconComponent 
          className="w-8 h-8 mb-2 fill-current animate-pulse-slow" 
          style={{ color: subtleColor }}
        />
      )}

      {/* Line 1 - Main Thank You */}
      <h1 
        className={`text-3xl mb-1 ${fontStyles[customization.fontStyle]}`}
        style={{ color: textColor }}
      >
        {customization.line1}
      </h1>

      {/* Line 2 - For Your Order */}
      <p 
        className="text-xs font-semibold tracking-widest uppercase mb-2"
        style={{ color: subtleColor }}
      >
        {customization.line2}
      </p>

      {/* Decorative line */}
      <div className="w-16 h-px mb-2" style={{ backgroundColor: subtleColor }} />

      {/* Line 3 - Personal Touch */}
      <p 
        className="text-xs mb-1 max-w-[200px]"
        style={{ color: variant === "modern" ? "rgba(255,255,255,0.9)" : customization.primaryColor }}
      >
        {customization.line3}
      </p>

      {/* Line 4 - Social/CTA */}
      <p 
        className="text-[10px] tracking-wide mb-1"
        style={{ color: subtleColor }}
      >
        {customization.line4}
      </p>

      {/* Line 5 - Heart/Emoji */}
      <p 
        className="text-lg"
        style={{ color: subtleColor }}
      >
        {customization.line5}
      </p>
    </div>
  );
};

export default ThankYouSticker;
