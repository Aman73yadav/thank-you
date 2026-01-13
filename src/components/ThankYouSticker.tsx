import { Heart } from "lucide-react";

interface ThankYouStickerProps {
  variant?: "classic" | "modern" | "elegant";
}

const ThankYouSticker = ({ variant = "classic" }: ThankYouStickerProps) => {
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

  const style = variants[variant];

  return (
    <div className={`relative w-80 h-80 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-sticker-hover ${style.container}`}>
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-current opacity-30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-current opacity-30 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-current opacity-30 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-current opacity-30 rounded-br-lg" />

      {/* Icon */}
      <Heart className={`w-10 h-10 mb-4 ${style.icon} fill-current animate-pulse-slow`} />

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
};

export default ThankYouSticker;
