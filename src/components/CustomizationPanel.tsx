import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StickerCustomization } from "./ThankYouSticker";
import { Palette, Type, MessageSquare, Upload, X } from "lucide-react";

interface CustomizationPanelProps {
  customization: StickerCustomization;
  onChange: (customization: StickerCustomization) => void;
}

const fontOptions = [
  { value: "script", label: "Script (Elegant)" },
  { value: "modern", label: "Modern (Bold)" },
  { value: "classic", label: "Classic (Serif)" },
] as const;

const presetColors = [
  { name: "Warm Brown", primary: "#8B5A2B", accent: "#D4A574", bg: "#FDF8F3" },
  { name: "Rose Gold", primary: "#B76E79", accent: "#E8B4BC", bg: "#FFF5F6" },
  { name: "Forest", primary: "#2D5A3D", accent: "#7BA889", bg: "#F4F9F5" },
  { name: "Navy", primary: "#1E3A5F", accent: "#5C7A9C", bg: "#F5F8FB" },
  { name: "Plum", primary: "#5D3A6E", accent: "#9B7AAC", bg: "#F9F5FB" },
  { name: "Coral", primary: "#CD5C5C", accent: "#F08080", bg: "#FFF8F7" },
];

const CustomizationPanel = ({ customization, onChange }: CustomizationPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = <K extends keyof StickerCustomization>(
    field: K,
    value: StickerCustomization[K]
  ) => {
    onChange({ ...customization, [field]: value });
  };

  const applyPreset = (preset: typeof presetColors[0]) => {
    onChange({
      ...customization,
      primaryColor: preset.primary,
      accentColor: preset.accent,
      bgColor: preset.bg,
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateField("logo", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 w-full max-w-md shadow-sticker-soft">
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <Palette className="w-5 h-5 text-primary" />
        Customize Your Sticker
      </h3>

      {/* Logo Upload */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Upload className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Brand Logo</span>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
          id="logo-upload"
        />
        
        {customization.logo ? (
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <img 
              src={customization.logo} 
              alt="Uploaded logo" 
              className="w-12 h-12 object-contain rounded"
            />
            <span className="text-sm text-foreground flex-1">Logo uploaded</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeLogo}
              className="text-destructive hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Logo
          </Button>
        )}
      </div>

      {/* Text Lines */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Message Lines</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="line1" className="text-xs text-muted-foreground">Main Heading</Label>
            <Input
              id="line1"
              value={customization.line1}
              onChange={(e) => updateField("line1", e.target.value)}
              className="mt-1"
              placeholder="Thank You"
            />
          </div>
          
          <div>
            <Label htmlFor="line2" className="text-xs text-muted-foreground">Subheading</Label>
            <Input
              id="line2"
              value={customization.line2}
              onChange={(e) => updateField("line2", e.target.value)}
              className="mt-1"
              placeholder="For Your Order"
            />
          </div>
          
          <div>
            <Label htmlFor="line3" className="text-xs text-muted-foreground">Personal Message</Label>
            <Input
              id="line3"
              value={customization.line3}
              onChange={(e) => updateField("line3", e.target.value)}
              className="mt-1"
              placeholder="Your support means the world"
            />
          </div>
          
          <div>
            <Label htmlFor="line4" className="text-xs text-muted-foreground">Social/CTA</Label>
            <Input
              id="line4"
              value={customization.line4}
              onChange={(e) => updateField("line4", e.target.value)}
              className="mt-1"
              placeholder="Follow us @yourstore"
            />
          </div>
          
          <div>
            <Label htmlFor="line5" className="text-xs text-muted-foreground">Emoji/Symbol</Label>
            <Input
              id="line5"
              value={customization.line5}
              onChange={(e) => updateField("line5", e.target.value)}
              className="mt-1"
              placeholder="♡"
            />
          </div>
        </div>
      </div>

      {/* Font Style */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Type className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Font Style</span>
        </div>
        <div className="flex gap-2">
          {fontOptions.map((font) => (
            <button
              key={font.value}
              onClick={() => updateField("fontStyle", font.value)}
              className={`flex-1 py-2 px-3 text-xs rounded-lg border transition-all ${
                customization.fontStyle === font.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50"
              }`}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Presets */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Color Presets</span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {presetColors.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="w-10 h-10 rounded-lg border-2 border-border hover:border-primary transition-all hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${preset.primary}, ${preset.accent})` }}
              title={preset.name}
            />
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-foreground">Custom Colors</span>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label htmlFor="primaryColor" className="text-xs text-muted-foreground">Primary</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                id="primaryColor"
                value={customization.primaryColor}
                onChange={(e) => updateField("primaryColor", e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0"
              />
              <Input
                value={customization.primaryColor}
                onChange={(e) => updateField("primaryColor", e.target.value)}
                className="flex-1 text-xs font-mono"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="accentColor" className="text-xs text-muted-foreground">Accent</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                id="accentColor"
                value={customization.accentColor}
                onChange={(e) => updateField("accentColor", e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0"
              />
              <Input
                value={customization.accentColor}
                onChange={(e) => updateField("accentColor", e.target.value)}
                className="flex-1 text-xs font-mono"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="bgColor" className="text-xs text-muted-foreground">Background</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                id="bgColor"
                value={customization.bgColor}
                onChange={(e) => updateField("bgColor", e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0"
              />
              <Input
                value={customization.bgColor}
                onChange={(e) => updateField("bgColor", e.target.value)}
                className="flex-1 text-xs font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
