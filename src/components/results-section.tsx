import { useState, useEffect, useMemo } from "react";
import { Download } from "lucide-react";
import { MdOutlineDownloading } from "react-icons/md";
import { useParameters } from "@/hooks/use-parameters";
import { init as coreInit, imageLoader } from "@cornerstonejs/core";
import {
  init as dicomImageLoaderInit,
  wadouri,
} from "@cornerstonejs/dicom-image-loader";
import DICOMViewer from "@/components/dicom-viewer";
import useApi from "@/hooks/use-api";
import {
  applyWindowing,
  drawImageWithContours,
  downloadImage,
  saveContoursAsCSV,
} from "@/utils/image";
import { ImageData } from "@/types/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useLanguage from "@/hooks/use-language";
import useTheme from "@/hooks/use-theme";

coreInit();
dicomImageLoaderInit();

const ResultsSection = () => {
  const [open, setOpen] = useState(false);
  // Desestruturação para obter o dicomFile, os contornos e a função de atualização
  const { dicomFile, contours, setContours } = useParameters();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const { text } = useLanguage();
  const { theme } = useTheme();

  const { sendFileToServer } = useApi();

  // Carrega a imagem DICOM e aplica o windowing
  useEffect(() => {
    const loadDicomImage = async () => {
      if (!dicomFile) return;
      try {
        const imageId = wadouri.fileManager.add(dicomFile);
        const image = await imageLoader.loadImage(imageId);
        const pixelData = image.getPixelData();
        const normalizedPixelData = applyWindowing(pixelData);
        setImageData({
          pixelData: normalizedPixelData,
          width: image.width,
          height: image.height,
        });
      } catch (error) {
        console.error("Error loading DICOM image:", error);
      }
    };

    loadDicomImage();
  }, [dicomFile]);

  useEffect(() => {
    if (dicomFile) {
      handleSendFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dicomFile]);

  const handleSendFile = async () => {
    if (!dicomFile) return;
    try {
      const contoursResponse = await sendFileToServer(dicomFile);
      if (contoursResponse) {
        setContours(contoursResponse);
      }
    } catch (error) {
      console.error("Error sending file:", error);
    }
  };

  // Cria a imagem final com os contornos retornados do backend
  const imageSrc = useMemo(() => {
    if (!imageData) return null;
    return drawImageWithContours(imageData, contours);
  }, [imageData, contours]);

  return (
    <section className="w-full h-full flex gap-40 px-20 pb-2">
      <div className="flex flex-col gap-5 pt-3 w-full">
        <h1 className="font-bold text-3xl font-dm-sans">
          {text.originalImage}
        </h1>
        <div className="w-full h-full rounded-3xl overflow-hidden">
          <DICOMViewer
            imageData={imageData}
            contours={null}
            drawable={false}
            isPanning={false}
            isDrawing={false}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 pt-3 w-full">
        <div className="flex items-center gap-7 justify-between">
          <h1 className="font-bold text-3xl font-dm-sans">
            {text.finalResult}
          </h1>

          <Dialog open={open} onOpenChange={setOpen}>
            {imageSrc && (
              <DialogTrigger asChild>
                <button className="cursor-pointer flex items-center gap-2 border border-gray-500 px-6 py-2 rounded-4xl font-poppins text-[14px] font-medium hover:border-amber-400 hover:text-amber-400 transition-all">
                  <Download />
                  {text.downloadButton}
                </button>
              </DialogTrigger>
            )}
            <DialogContent
              className="max-w-sm [&_svg:not([class*='size-'])]:size-7"
              style={{ backgroundColor: theme.background, color: theme.text }}
            >
              <DialogHeader className="flex flex-col items-center text-center">
                <MdOutlineDownloading className="size-20 mt-2" />
                <DialogTitle className="text-3xl font-bold font-dm-sans">
                  {text.resultDownloadText}
                </DialogTitle>
                <DialogDescription
                  className="mt-2 font-poppins text-[16px]"
                  style={{ color: theme.text }}
                >
                  {text.resultDownloadDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col justify-center items-center gap-4 mt-4">
                <button
                  onClick={() => {
                    if (dicomFile && imageSrc) {
                      const fileName = dicomFile.name.replace(/\.[^/.]+$/, "");
                      downloadImage(imageSrc, `${fileName}_result.png`);
                    }
                  }}
                  className="flex justify-center items-center font-dm-sans font-bold text-[20px] w-[192px] h-[48px] rounded-3xl px-6 py-4 cursor-pointer"
                  style={{
                    backgroundColor: theme.buttonBackground,
                    color: theme.buttonText,
                  }}
                >
                  {text.pngButton}
                </button>
                <button
                  onClick={() => {
                    if (dicomFile && contours) {
                      const fileName = dicomFile.name.replace(/\.[^/.]+$/, "");
                      saveContoursAsCSV(contours, `contours_${fileName}.csv`);
                    }
                  }}
                  className="flex justify-center items-center font-dm-sans font-bold text-[20px] w-[192px] h-[48px] rounded-3xl px-6 py-4 cursor-pointer border border-gray-800"
                  style={{
                    backgroundColor: theme.buttonSecondaryBackground,
                    color: theme.buttonSecondaryText,
                  }}
                >
                  {text.csvButton}
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full h-full rounded-3xl overflow-hidden">
          <DICOMViewer
            imageData={imageData}
            contours={contours}
            drawable={false}
            isPanning={false}
            isDrawing={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
