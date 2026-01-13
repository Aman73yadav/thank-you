import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  filename?: string;
}

const DownloadButton = ({ targetRef, filename = "thank-you-sticker" }: DownloadButtonProps) => {
  const handleDownload = async () => {
    if (!targetRef.current) {
      toast.error("Unable to capture sticker");
      return;
    }

    try {
      const dataUrl = await toPng(targetRef.current, {
        quality: 1,
        pixelRatio: 3, // High resolution for printing
        backgroundColor: "transparent",
      });

      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success("Sticker downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download sticker");
    }
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="sm"
      className="mt-3 gap-2 text-xs border-sticker-border hover:bg-sticker-cream hover:text-primary transition-colors"
    >
      <Download className="w-3.5 h-3.5" />
      Download PNG
    </Button>
  );
};

export default DownloadButton;
