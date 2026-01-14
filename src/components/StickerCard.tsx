import { forwardRef, useImperativeHandle, useRef } from "react";
import ThankYouSticker, { StickerShape, StickerVariant, StickerCustomization } from "./ThankYouSticker";
import DownloadButton from "./DownloadButton";

interface StickerCardProps {
  variant: StickerVariant;
  shape: StickerShape;
  label: string;
  customization: StickerCustomization;
}

export interface StickerCardRef {
  getStickerRef: () => HTMLDivElement | null;
}

const StickerCard = forwardRef<StickerCardRef, StickerCardProps>(({ variant, shape, label, customization }, ref) => {
  const stickerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getStickerRef: () => stickerRef.current,
  }));

  return (
    <div className="flex flex-col items-center">
      <ThankYouSticker 
        stickerRef={stickerRef} 
        variant={variant} 
        shape={shape} 
        customization={customization}
      />
      <span className="mt-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <DownloadButton 
        targetRef={stickerRef} 
        filename={`thank-you-${shape}-${variant}`} 
      />
    </div>
  );
});

StickerCard.displayName = "StickerCard";

export default StickerCard;
