import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/page-layout";
import { selectFile } from "@/utils/file";
import { useParameters } from "@/hooks/use-parameters";
import React from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const parameters = useParameters();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = selectFile(event);
      if (!file) return;
      parameters.changeDicomFile(file);
      navigate("/segmentation");
    } catch (error) {
      console.error("Deu ruim.");
    }
  };

  return (
    <PageLayout>
      <main className="flex flex-1">
        Home Page
        <button
          onClick={() => document.getElementById("dicom-upload")?.click()}
        >
          Selecionar
        </button>
        <input
          id="dicom-upload"
          type="file"
          accept=".dcm"
          className="hidden"
          onChange={handleFileSelect}
        />
      </main>
    </PageLayout>
  );
};

export default HomePage;
