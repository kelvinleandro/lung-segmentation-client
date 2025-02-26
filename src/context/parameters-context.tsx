import { createContext, useRef, useState } from "react";
import {
  ApplicationMode,
  SegmentationParameters,
  SelectionParameters,
} from "@/types/parameters";
import { Contours } from "@/types/image";

type ParametersContextType = {
  mode: ApplicationMode;
  selectionParameters: SelectionParameters;
  segmentationParameters: SegmentationParameters;
  setMode: (mode: ApplicationMode) => void;
  dicomFile: File | null;
  changeDicomFile: (file: File) => void;
  clearRef: React.RefObject<HTMLButtonElement> | null;
  contours: Contours | null;
  setContours: (contours: Contours | null) => void;
};

export const ParametersContext = createContext<ParametersContextType | null>(
  null
);

export const ParametersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<ApplicationMode>("segmentation");
  const [dicomFile, setDicomFile] = useState<File | null>(null);
  const [contours, setContours] = useState<Contours | null>(null);
  const [selectionParameters, setSelectionParameters] =
    useState<SelectionParameters>({} as SelectionParameters);
  const [segmentationParameters, setSegmentationParameters] =
    useState<SegmentationParameters>({} as SegmentationParameters);
  // clear ref for canvas
  const clearRef = useRef<HTMLButtonElement | null>(null);

  const changeDicomFile = (file: File) => {
    setDicomFile(file);
    setContours(null);
  };

  return (
    <ParametersContext.Provider
      value={{
        mode,
        setMode,
        dicomFile,
        selectionParameters,
        segmentationParameters,
        changeDicomFile,
        clearRef,
        contours,
        setContours,
      }}
    >
      {children}
    </ParametersContext.Provider>
  );
};