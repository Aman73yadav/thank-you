import { useState } from "react";
import { Download, Loader2, PackageOpen } from "lucide-react";
import { toPng } from "html-to-image";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface StickerRef {
  ref: React.RefObject<HTMLDivElement>;
  label: string;
}

interface BulkDownloadButtonProps {
  stickerRefs: StickerRef[];
}

const BulkDownloadButton = ({ stickerRefs }: BulkDownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleBulkDownload = async () => {
    if (stickerRefs.length === 0) {
      toast.error("No stickers to download");
      return;
    }

    setIsDownloading(true);
    const zip = new JSZip();
    let successCount = 0;

    try {
      for (const { ref, label } of stickerRefs) {
        if (!ref.current) continue;

        try {
          const dataUrl = await toPng(ref.current, {
            quality: 1,
            pixelRatio: 3,
            backgroundColor: "transparent",
          });

          // Convert data URL to blob
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          
          // Add to ZIP with sanitized filename
          const filename = label.toLowerCase().replace(/\s+/g, "-");
          zip.file(`${filename}.png`, blob);
          successCount++;
        } catch (error) {
          console.error(`Failed to capture ${label}:`, error);
        }
      }

      if (successCount === 0) {
        toast.error("Failed to capture any stickers");
        return;
      }

      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "thank-you-stickers.zip";
      link.click();
      URL.revokeObjectURL(url);

      toast.success(`Downloaded ${successCount} stickers as ZIP!`);
    } catch (error) {
      console.error("Bulk download failed:", error);
      toast.error("Failed to create ZIP file");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleBulkDownload}
      disabled={isDownloading}
      className="gap-2"
      size="lg"
    >
      {isDownloading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Creating ZIP...
        </>
      ) : (
        <>
          <PackageOpen className="w-4 h-4" />
          Download All as ZIP
        </>
      )}
    </Button>
  );
};

export default BulkDownloadButton;
