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
      <h1 className="text-4xl font-dm-sans font-bold self-start">
        {text.manualSelection}
      </h1>

      <div className="w-[512px] h-[512px] relative overflow-hidden">
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
