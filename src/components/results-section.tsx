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
import { ImageData, Contours } from "@/types/image";

coreInit();
dicomImageLoaderInit();

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ResultsSection = () => {
  const [open, setOpen] = useState(false);
  // Desestruturação para obter o dicomFile, os contornos e a função de atualização
  const { dicomFile, contours, setContours } = useParameters();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
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
  }, [dicomFile]);

  const handleSendFile = async () => {
    if (!dicomFile) return;
    try {
      setIsSubmitting(true);
      const contoursResponse = await sendFileToServer(dicomFile);
      if (contoursResponse) {
        setContours(contoursResponse);
      }
    } catch (error) {
      console.error("Error sending file:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cria a imagem final com os contornos retornados do backend
  const imageSrc = useMemo(() => {
    if (!imageData) return null;
    return drawImageWithContours(imageData, contours);
  }, [imageData, contours]);

  return (
    <section className="w-full h-full flex gap-40 pl-40">
      <div className="flex flex-col gap-9 pt-5">
        <h1 className="font-bold text-[32px] font-dm-sans">Original Image</h1>
        <div className="w-[512px] h-[512px] rounded-3xl overflow-hidden">
          <DICOMViewer
            imageData={imageData}
            contours={null}
            drawable={false}
            isPanning={false}
            isDrawing={false}
          />
        </div>
      </div>

      <div className="flex flex-col gap-9 pt-5">
        <div className="flex items-center gap-7">
          <h1 className="font-bold text-[32px] font-dm-sans">Result Image</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="ml-28 cursor-pointer flex items-center gap-2 border border-gray-500 px-6 py-2 rounded-4xl font-poppins text-[14px] font-medium hover:border-amber-400 hover:text-amber-400 transition-all">
                <Download />
                Download
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-sm [&_svg:not([class*='size-'])]:size-7">
              <DialogHeader className="flex flex-col items-center text-center">
                <MdOutlineDownloading className="size-20 mt-2" />
                <DialogTitle className="text-[32px] font-bold font-dm-sans">
                  Download de Resultado
                </DialogTitle>
                <DialogDescription className="mt-2 text-gray-900 font-poppins text-[16px]">
                  Selecione o formato que deseja fazer o download:
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
                  className="bg-[#141416] flex justify-center items-center text-[#FCFCFD] font-dm-sans font-bold text-[20px] w-[192px] h-[48px] rounded-3xl px-6 py-4 cursor-pointer"
                >
                  .PNG
                </button>
                <button
                  onClick={() => {
                    if (dicomFile && contours) {
                      const fileName = dicomFile.name.replace(/\.[^/.]+$/, "");
                      saveContoursAsCSV(contours, `contours_${fileName}.csv`);
                    }
                  }}
                  className="bg-[#FCFCFD] flex justify-center items-center text-black font-dm-sans font-bold text-[20px] w-[192px] h-[48px] rounded-3xl px-6 py-4 cursor-pointer border border-gray-800"
                >
                  .CSV
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-[512px] h-[512px] rounded-3xl overflow-hidden">
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
