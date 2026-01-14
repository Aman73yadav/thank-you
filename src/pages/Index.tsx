import { useState, useRef, createRef } from "react";
import StickerCard, { StickerCardRef } from "@/components/StickerCard";
import CustomizationPanel from "@/components/CustomizationPanel";
import BulkDownloadButton from "@/components/BulkDownloadButton";
import { StickerShape, StickerVariant, StickerCustomization, defaultCustomization } from "@/components/ThankYouSticker";

const stickerConfigs: { shape: StickerShape; variant: StickerVariant; label: string }[] = [
  { shape: "rounded", variant: "classic", label: "Rounded Classic" },
  { shape: "circular", variant: "elegant", label: "Circular Elegant" },
  { shape: "square", variant: "modern", label: "Square Modern" },
  { shape: "diecut", variant: "classic", label: "Die-Cut Classic" },
  { shape: "ticket", variant: "elegant", label: "Ticket Style" },
  { shape: "badge", variant: "modern", label: "Badge Modern" },
];

const Index = () => {
  const [customization, setCustomization] = useState<StickerCustomization>(defaultCustomization);
  const stickerCardRefs = useRef<React.RefObject<StickerCardRef>[]>(
    stickerConfigs.map(() => createRef<StickerCardRef>())
  );

  const getStickerRefs = () => {
    return stickerConfigs.map((config, index) => ({
      ref: { current: stickerCardRefs.current[index].current?.getStickerRef() || null } as React.RefObject<HTMLDivElement>,
      label: config.label,
    }));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3 font-script">
            Thank You Stickers
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Create beautiful, personalized thank you stickers for your ecommerce business. 
            Customize colors, fonts, and messages, then download as high-resolution PNG.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* Customization Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <CustomizationPanel 
              customization={customization} 
              onChange={setCustomization} 
            />
          </div>

          {/* Sticker Grid */}
          <div className="flex-1">
            {/* Bulk Download Button */}
            <div className="flex justify-center mb-8">
              <BulkDownloadButton stickerRefs={getStickerRefs()} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
              {stickerConfigs.map((config, index) => (
                <StickerCard
                  key={`${config.shape}-${config.variant}`}
                  ref={stickerCardRefs.current[index]}
                  variant={config.variant}
                  shape={config.shape}
                  label={config.label}
                  customization={customization}
                />
              ))}
            </div>
          </div>
        </div>

        {/* The 5 Lines Section */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Your Custom 5-Line Message
          </h2>
          <div 
            className="rounded-xl p-8 max-w-md mx-auto border-2 shadow-sticker-soft"
            style={{
              backgroundColor: customization.bgColor,
              borderColor: customization.accentColor 
            }}
          >
            <p 
              className={`text-3xl mb-2 ${customization.fontStyle === 'script' ? 'font-script' : customization.fontStyle === 'modern' ? 'font-sans font-bold' : 'font-serif'}`}
              style={{ color: customization.primaryColor }}
            >
              {customization.line1}
            </p>
            <p 
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: customization.accentColor }}
            >
              {customization.line2}
            </p>
            <div className="w-16 h-px mx-auto mb-2" style={{ backgroundColor: customization.accentColor }} />
            <p 
              className="text-sm mb-1"
              style={{ color: customization.primaryColor }}
            >
              {customization.line3}
            </p>
            <p 
              className="text-xs tracking-wide mb-1"
              style={{ color: customization.accentColor }}
            >
              {customization.line4}
            </p>
            <p 
              className="text-lg"
              style={{ color: customization.accentColor }}
            >
              {customization.line5}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
