import useLanguage from "@/hooks/use-language";
import { useParameters } from "@/hooks/use-parameters";
import DICOMViewer from "./dicom-viewer";
import { init as coreInit, imageLoader } from "@cornerstonejs/core";
import {
  init as dicomImageLoaderInit,
  wadouri,
} from "@cornerstonejs/dicom-image-loader";
import { useEffect, useState } from "react";
import { applyWindowing } from "@/utils/image";
import { ImageData } from "@/types/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

coreInit();
dicomImageLoaderInit();

const SelectionSection = () => {
  const { dicomFile, selectionParameters, clearRef } = useParameters();
  const { text } = useLanguage();
  const [imageData, setImageData] = useState<ImageData | null>(null);

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

  return (
    <section className="w-full h-full flex flex-col pt-4 pl-4 items-center justify-start">
      <div className="font-dm-sans text-lg 2xl:text-4xl space-x-2 flex items-center self-start">
        <h1 className="font-bold">{text.manualSelection}</h1>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="bg-gray-300 text-xl rounded-full h-8 w-8">
              ?
            </TooltipTrigger>
            <TooltipContent className="text-lg">
              <p className="font-bold">{text.helpTitle}</p>
              <p>{text.help1}</p>
              <p>{text.help2}</p>
              <p>{text.help3}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="w-[350px] h-[350px] 2xl:w-[512px] 2xl:h-[512px] relative overflow-hidden border">
        <DICOMViewer
          imageData={imageData}
          drawable={imageData !== null}
          zoom={selectionParameters.zoom}
          lineWidth={selectionParameters.lineWidth}
          tintColor={selectionParameters.color}
          clearRef={clearRef!}
          isPanning={selectionParameters.isPanning}
          isDrawing={selectionParameters.isDrawing}
        />
      </div>
    </section>
  );
};

export default SelectionSection;
