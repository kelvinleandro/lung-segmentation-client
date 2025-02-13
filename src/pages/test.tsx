import { useState, useMemo } from "react";
import { init as coreInit, imageLoader } from "@cornerstonejs/core";
import {
  init as dicomImageLoaderInit,
  wadouri,
} from "@cornerstonejs/dicom-image-loader";
import DICOMViewer from "@/components/dicomviewer";
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

const TestPage = () => {
  const [dicomFile, setDicomFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [contours, setContours] = useState<Contours | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { sendFileToServer } = useApi();

  const imageSrc = useMemo(() => {
    if (!imageData) return null;
    return drawImageWithContours(imageData, contours);
  }, [imageData, contours]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("File selected:", file);

    setDicomFile(file);
    setContours(null);

    const imageId = wadouri.fileManager.add(file);
    console.log("Image ID:", imageId);

    try {
      const _image = await imageLoader.loadImage(imageId);
      console.log("Loaded image:", _image);

      const pixelData = _image.getPixelData();
      const normalizedPixelData = applyWindowing(pixelData);

      setImageData({
        pixelData: normalizedPixelData,
        width: _image.width,
        height: _image.height,
      });
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  const handleSendFile = async () => {
    if (!dicomFile) return;

    try {
      setIsSubmitting(true);
      const contours = await sendFileToServer(dicomFile);
      if (contours) {
        setContours(contours);
      }
    } catch (error) {
      console.error("Error sending file:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log(imageData);
  return (
    <div className="bg-gray-300 h-screen w-full flex flex-row items-center justify-center py-8 gap-8 flex-wrap">
      <div className="flex flex-col w-[45%] items-center justify-center gap-8">
        <div className="cursor-pointer border-gray-400 w-[512px] h-[512px] transition-colors border-2 border-dashed">
          <DICOMViewer
            imageData={imageData}
            contours={contours}
            drawable={false}
          />
          <input
            id="dicom-upload"
            type="file"
            accept=".dcm"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
        <button
          onClick={() => document.getElementById("dicom-upload")?.click()}
          className="py-1 px-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Selecionar Imagem
        </button>
        <button
          onClick={handleSendFile}
          disabled={!dicomFile || isSubmitting}
          className="py-1 px-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Segmentar imagem
        </button>

        <button
          onClick={() => {
            if (dicomFile) {
              if (contours) {
                const fileName = dicomFile.name.replace(/\.[^/.]+$/, "");
                saveContoursAsCSV(contours, `contours_${fileName}.csv`);
              } else {
                alert(
                  "A segmentação precisa ser feita antes de exportar o CSV."
                );
              }
            } else {
              alert("Nenhum arquivo selecionado.");
            }
          }}
          className="py-1 px-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer "
        >
          Gerar CSV
        </button>
      </div>
      <div className="w-[512px] h-[512px] border-2 border-gray-400 border-dashed">
        <DICOMViewer imageData={imageData} drawable />
      </div>

      <div className="w-[38%] flex flex-col items-start">
        {contours && (
          <button
            onClick={() => {
              if (dicomFile) {
                const fileName = dicomFile.name.replace(/\.[^/.]+$/, "");
                downloadImage(imageSrc!, `${fileName}.png`);
              } else {
                alert("Nenhum arquivo selecionado");
              }
            }}
            className="py-1 px-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
};

export default TestPage;
