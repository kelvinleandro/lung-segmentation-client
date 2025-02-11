import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "@/components/page-layout";
import ParametersSelector from "@/components/parameters-selector";

const SegmentationPage = () => {
  const location = useLocation();
  const [dicomFile, setDicomFile] = useState<File | null>(null);

  useEffect(() => {
    if (location.state && location.state.file) {
      setDicomFile(location.state.file);
    }
  }, [location.state]);

  return (
    <PageLayout>
      <main className="flex w-full flex-1">
        <ParametersSelector />
        <div className="bg-red-300 w-full">Segmentation Page</div>
      </main>
    </PageLayout>
  );
};

export default SegmentationPage;
