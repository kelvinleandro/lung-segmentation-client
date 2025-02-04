import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { init as coreInit, RenderingEngine, imageLoader, Types, Enums} from "@cornerstonejs/core";
import {init as dicomImageLoaderInit, wadouri} from "@cornerstonejs/dicom-image-loader";
import { Upload } from "lucide-react";

coreInit();
dicomImageLoaderInit();

const renderingEngineId = "myRenderingEngine";
const viewportId = "dicomViewport";

const HomePage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [dicomFile, setDicomFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const renderingEngineRef = useRef<RenderingEngine | null>(null);

  useEffect(() => {
    return () => {
      if (renderingEngineRef.current) {
        renderingEngineRef.current.destroy();
      }
    };
  }, []);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Arquivo selecionado:", file);

    setDicomFile(file);

    const imageId = wadouri.fileManager.add(file);
    console.log("ID da imagem:", imageId);
    setImage(imageId);

    try {
      const _image = await imageLoader.loadImage(imageId);
      console.log("Imagem carregada:", _image);
      console.log("Pixel Data:", _image.getPixelData?.());
      console.log("Min Pixel Value:", _image.minPixelValue);
      console.log("Max Pixel Value:", _image.maxPixelValue);

      if (!imageRef.current) {
        console.error("imageRef.current é null");
        return;
      }

      if (!renderingEngineRef.current) {
        renderingEngineRef.current = new RenderingEngine(renderingEngineId);
      }

      const renderingEngine = renderingEngineRef.current;

      const viewportInput = {
        viewportId,
        type: Enums.ViewportType.STACK,
        element: imageRef.current,
      }

      renderingEngine.enableElement(viewportInput);
      const viewport = renderingEngine.getViewport(viewportId) as Types.IStackViewport;
      await viewport.setStack([imageId]);
      viewport.setProperties({
        voiRange: { lower: -1024, upper: 3072 }, // Adjust this based on the DICOM metadata
      });
      viewport.render();
      setTimeout(function(){ const metadata = viewport.getImageData(); console.log('Metadados:', metadata);  }, 5000);

    } catch (error) {
      console.error("Erro ao carregar imagem DICOM:", error);
    }
  };

  const sendFileToServer = async () => {
    if (!dicomFile) return;
    const formData = new FormData();
    formData.append("dicom", dicomFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob", // Expecting a binary response (DICOM file)
      });

      console.log("Resposta do servidor:", response.data);

      const blob = new Blob([response.data], { type: "application/dicom" });

      // Create a downloadable URL
      const downloadUrl = URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "rotated_image.dcm";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Free memory
      URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      console.error("Erro ao enviar arquivo DICOM:", error);
    }
  };

  return (
    <div className="bg-gray-300 h-screen w-full flex flex-col gap-8 items-center justify-center py-8">
      <div
        onClick={() => document.getElementById("dicom-upload")?.click()}
        className="border-2 border-dashed rounded-lg cursor-pointer border-gray-400 h-[512px] w-[512px] transition-colors"
      >
        {image ? (
          <div className="relative w-full h-full">
            <div ref={imageRef} className="w-[512px] h-[512px]">
              {/* Cornerstone will render the DICOM image here */}
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">
              Clique para mudar a imagem
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
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
        onClick={sendFileToServer}
        disabled={!dicomFile}
        className="py-1 text-lg w-18 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        Enviar
      </button>

    </div>
  );
};

export default HomePage;
