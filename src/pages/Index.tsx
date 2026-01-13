import StickerCard from "@/components/StickerCard";
import { StickerShape, StickerVariant } from "@/components/ThankYouSticker";

const stickerConfigs: { shape: StickerShape; variant: StickerVariant; label: string }[] = [
  { shape: "rounded", variant: "classic", label: "Rounded Classic" },
  { shape: "circular", variant: "elegant", label: "Circular Elegant" },
  { shape: "square", variant: "modern", label: "Square Modern" },
  { shape: "diecut", variant: "classic", label: "Die-Cut Classic" },
  { shape: "ticket", variant: "elegant", label: "Ticket Style" },
  { shape: "badge", variant: "modern", label: "Badge Modern" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-3 font-script">
            Thank You Stickers
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Beautiful sticker designs for your ecommerce business. Click download to save as high-resolution PNG.
          </p>
        </div>

        {/* Sticker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center mb-20">
          {stickerConfigs.map((config) => (
            <StickerCard
              key={`${config.shape}-${config.variant}`}
              variant={config.variant}
              shape={config.shape}
              label={config.label}
            />
          ))}
        </div>

        {/* The 3 Lines Section */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            The Perfect 3-Line Message
          </h2>
          <div className="bg-card rounded-xl p-8 max-w-md mx-auto border border-border shadow-sticker-soft">
            <p className="text-3xl font-script text-primary mb-3">Thank You</p>
            <p className="text-sm font-semibold text-sticker-warm tracking-widest uppercase mb-3">
              For Your Order
            </p>
            <p className="text-sm text-muted-foreground italic">
              Your support means the world to us ♡
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
