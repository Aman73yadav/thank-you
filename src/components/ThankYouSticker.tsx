import { Heart, Star, Sparkles } from "lucide-react";
import { forwardRef } from "react";

export type StickerShape = "rounded" | "circular" | "square" | "diecut" | "ticket" | "badge";
export type StickerVariant = "classic" | "modern" | "elegant";

interface ThankYouStickerProps {
  variant?: StickerVariant;
  shape?: StickerShape;
}

const ThankYouSticker = forwardRef<HTMLDivElement, ThankYouStickerProps>(
  ({ variant = "classic", shape = "rounded" }, ref) => {
    const variants = {
      classic: {
        container: "bg-gradient-to-br from-sticker-cream to-card border-2 border-sticker-border shadow-sticker",
        title: "text-primary font-script",
        subtitle: "text-sticker-warm font-medium tracking-wide",
        tagline: "text-muted-foreground italic",
        icon: "text-sticker-accent"
      },
      modern: {
        container: "bg-gradient-to-br from-primary to-sticker-warm shadow-sticker-elevated",
        title: "text-primary-foreground font-bold",
        subtitle: "text-sticker-cream/90 font-semibold tracking-widest uppercase",
        tagline: "text-primary-foreground/80",
        icon: "text-sticker-accent"
      },
      elegant: {
        container: "bg-card border border-sticker-border shadow-sticker-soft",
        title: "text-foreground font-script",
        subtitle: "text-primary font-light tracking-[0.3em] uppercase",
        tagline: "text-muted-foreground font-light",
        icon: "text-sticker-warm"
      }
    };

    const shapeStyles: Record<StickerShape, string> = {
      rounded: "w-72 h-72 rounded-2xl",
      circular: "w-72 h-72 rounded-full",
      square: "w-72 h-72 rounded-lg",
      diecut: "w-80 h-72 rounded-[3rem] rounded-br-lg rounded-tl-lg",
      ticket: "w-80 h-64 rounded-xl ticket-shape",
      badge: "w-72 h-80 badge-shape"
    };

    const style = variants[variant];
    const shapeClass = shapeStyles[shape];

    const IconComponent = shape === "badge" ? Star : shape === "diecut" ? Sparkles : Heart;

    return (
      <div
        ref={ref}
        className={`relative p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-sticker-hover ${style.container} ${shapeClass}`}
      >
        {/* Decorative elements based on shape */}
        {shape === "rounded" && (
          <>
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-current opacity-30 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-current opacity-30 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-current opacity-30 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-current opacity-30 rounded-br-lg" />
          </>
        )}

        {shape === "circular" && (
          <div className="absolute inset-4 rounded-full border border-current opacity-20" />
        )}

        {shape === "badge" && (
          <>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-current opacity-20 rounded-full" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-current opacity-20 rounded-full" />
          </>
        )}

        {shape === "ticket" && (
          <>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-r-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-l-full" />
          </>
        )}

        {/* Icon */}
        <IconComponent className={`w-10 h-10 mb-4 ${style.icon} fill-current animate-pulse-slow`} />

        {/* Line 1 - Main Thank You */}
        <h1 className={`text-4xl mb-2 ${style.title}`}>
          Thank You
        </h1>

        {/* Line 2 - For Your Order */}
        <p className={`text-sm mb-3 ${style.subtitle}`}>
          For Your Order
        </p>

        {/* Line 3 - Personal Touch */}
        <p className={`text-xs ${style.tagline}`}>
          Your support means the world to us ♡
        </p>
      </div>
    );
  }
);

ThankYouSticker.displayName = "ThankYouSticker";

export default ThankYouSticker;
