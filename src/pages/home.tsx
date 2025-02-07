import { useState, useMemo } from "react";
import { init as coreInit, imageLoader } from "@cornerstonejs/core";
import {
  init as dicomImageLoaderInit,
  wadouri,
} from "@cornerstonejs/dicom-image-loader";
import { Upload } from "lucide-react";
import useApi from "@/hooks/use-api";
import {
  applyWindowing,
  drawImageWithOverlay,
  downloadImage,
} from "@/utils/image";
import { ImageData, PixelCoordinate } from "@/types/image";

coreInit();
dicomImageLoaderInit();

const DEFAULT_OPACITY = 0;

const HomePage = () => {
  const [segmentationOpacity, setSegmentationOpacity] =
    useState<number>(DEFAULT_OPACITY);
  const [dicomFile, setDicomFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [segmentationPoints, setSegmentationPoints] = useState<
    PixelCoordinate[] | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { sendFileToServer } = useApi();

  const imageSrc = useMemo(() => {
    if (!imageData) return null;
    return drawImageWithOverlay(
      imageData,
      segmentationPoints,
      segmentationOpacity
    );
  }, [imageData, segmentationPoints, segmentationOpacity]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("File selected:", file);

    setDicomFile(file);
    setSegmentationPoints(null);

    const imageId = wadouri.fileManager.add(file);
    console.log("Image ID:", imageId);

    try {
      const _image = await imageLoader.loadImage(imageId);
      console.log("Loaded image:", _image);

      const pixelData = _image.getPixelData();
      const normalizedPixelData = applyWindowing(pixelData, 500, 3000);

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
      const coordinates = await sendFileToServer(dicomFile);
      if (coordinates) {
        setSegmentationPoints(coordinates);
      }
    } catch (error) {
      console.error("Error sending file:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-300 h-screen w-full flex flex-row items-center justify-center py-8">
      <div className="flex flex-col w-[60%] items-center justify-center gap-8">
        <div
          onClick={() => document.getElementById("dicom-upload")?.click()}
          className="cursor-pointer border-gray-400 w-[512px] h-[512px] transition-colors"
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Imagem DICOM"
              className="w-[512px] h-[512px]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 w-[512px] h-[512px] border-2 border-dashed rounded-lg">
              <Upload size={40} />
              <p className="text-md font-semibold text-center text-gray-500">
                Clique para selecionar imagem DICOM
              </p>
            </div>
          )}
          <input
            id="dicom-upload"
            type="file"
            accept=".dcm"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        <button
          onClick={handleSendFile}
          disabled={!dicomFile || isSubmitting}
          className="py-1 px-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Segmentar imagem
        </button>

        <button className="py-1 px-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer ">
          Gerar CSV
        </button>
      </div>

      <div className="w-[38%] flex flex-col items-start">
        {segmentationPoints && (
          <>
            <label>
              Opacidade: {Math.round(segmentationOpacity * 100)}%
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={segmentationOpacity}
                onChange={(e) =>
                  setSegmentationOpacity(parseFloat(e.target.value))
                }
              />
            </label>
            <button
              onClick={() => {
                if (dicomFile) {
                  const fileName = dicomFile.name.replace(/\.[^/.]+$/, ""); 
                  downloadImage(imageSrc!, `points_${fileName}.png`);
                } else {
                  alert("Nenhum arquivo selecionado");
                }
              }}
              className="py-1 px-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
