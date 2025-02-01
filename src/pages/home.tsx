import { useState, useRef } from "react";
import axios from "axios";
import * as cornerstone from "@cornerstonejs/core";
import * as cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader";

cornerstone.init();
cornerstoneDICOMImageLoader.init();

const HomePage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [dicomFile, setDicomFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Arquivo selecionado:", file);

    setDicomFile(file);

    const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(file);

    try {
      const _image = await cornerstone.imageLoader.loadImage(imageId);

      console.log("Image loaded:", _image);
      
    } catch (error) {
      console.error("Error loading DICOM image:", error);
    }

    // pelo jeito era p funcionar no pacote antigo
    // cornerstone.loadImage(imageId).then((image) => {
    //   console.log("Dentro do loadImage");

    //   if (imageRef.current) {
    //     cornerstone.enable(imageRef.current);
    //     cornerstone.displayImage(imageRef.current, image);
    //     setImage(imageId); // Set the image ID for reference
    //   }
    // });
  };

  const sendFileToServer = async () => {
    if (!dicomFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(dicomFile);
    reader.onload = async () => {
      const base64 = reader.result as string;

      try {
        const response = await axios.post("/api/upload-dicom", {
          file: base64,
        });
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
  };

  return (
    <div className="bg-gray-300 h-screen w-full flex flex-col gap-8 items-center justify-center py-8">
      <div
        onClick={() => document.getElementById("dicom-upload")?.click()}
        className="border-2 border-dashed rounded-lg p-6 cursor-pointer border-gray-400 h-40 w-40 transition-colors"
      >
        {image ? (
          <div className="relative">
            <div ref={imageRef} className="w-full h-full">
              {/* Cornerstone will render the DICOM image here */}
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">
              Clique para mudar a imagem
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-500">
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
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        Enviar
      </button>
    </div>
  );
};

export default HomePage;
