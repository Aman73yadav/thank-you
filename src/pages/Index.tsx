import ThankYouSticker from "@/components/ThankYouSticker";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Thank You Sticker Designs
          </h1>
          <p className="text-muted-foreground">
            Choose your perfect ecommerce thank you sticker
          </p>
        </div>

        {/* Sticker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
          {/* Classic Variant */}
          <div className="flex flex-col items-center gap-4">
            <ThankYouSticker variant="classic" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Classic
            </span>
          </div>

          {/* Modern Variant */}
          <div className="flex flex-col items-center gap-4">
            <ThankYouSticker variant="modern" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Modern
            </span>
          </div>

          {/* Elegant Variant */}
          <div className="flex flex-col items-center gap-4">
            <ThankYouSticker variant="elegant" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Elegant
            </span>
          </div>
        </div>

        {/* The 3 Lines */}
        <div className="mt-20 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            The 3 Best Lines
          </h2>
          <div className="bg-card rounded-xl p-8 max-w-md mx-auto border border-border shadow-sm">
            <p className="text-2xl font-script text-primary mb-2">Thank You</p>
            <p className="text-sm font-medium text-sticker-warm tracking-wide mb-2">FOR YOUR ORDER</p>
            <p className="text-sm text-muted-foreground italic">Your support means the world to us ♡</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
