import { createContext, useRef, useState, useReducer } from "react";
import {
  ApplicationMode,
  SegmentationParameters,
  SelectionParameters,
} from "@/types/parameters";
import { Contours } from "@/types/image";
import { segmentationDefaultValues} from "@/constants/segmentationDefaults.ts";

type ParametersContextType = {
  mode: ApplicationMode;
  selectionParameters: SelectionParameters;
  setSelectionParameters: (params: SelectionParameters) => void;
  segmentationParameters: SegmentationParameters;
  dispatchSegmentation: React.Dispatch<SegmentationAction>;
  resetSegmentationParameters: (method: keyof typeof segmentationDefaultValues) => void;
  setMode: (mode: ApplicationMode) => void;
  dicomFile: File | null;
  changeDicomFile: (file: File) => void;
  clearRef: React.RefObject<HTMLButtonElement> | null;
  contours: Contours | null;
  setContours: (contours: Contours | null) => void;
};

type SegmentationAction =
  | {type: "SET_PARAM"; key: string; value: any}
  | {type: "RESET_PARAMS"; method: keyof typeof segmentationDefaultValues};

const segmentationReducer = (
  state: SegmentationParameters,
  action: SegmentationAction
): SegmentationParameters => {
  switch (action.type) {
    case "SET_PARAM":
      return {...state, [action.key]: action.value};
    case "RESET_PARAMS":
      return segmentationDefaultValues[action.method];
    default:
      return state;
  }
}

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
  const [segmentationParameters, dispatchSegmentation] =
    useReducer(
      segmentationReducer,
      segmentationDefaultValues.CrispParameters
    );
  // clear ref for canvas
  const clearRef = useRef<HTMLButtonElement | null>(null);

  const changeDicomFile = (file: File) => {
    setDicomFile(file);
    setContours(null);
  };

  const resetSegmentationParameters = (method: keyof typeof segmentationDefaultValues) => {
    dispatchSegmentation({ type: "RESET_PARAMS", method});
  };

  return (
    <ParametersContext.Provider
      value={{
        mode,
        setMode,
        dicomFile,
        selectionParameters,
        setSelectionParameters,
        segmentationParameters,
        dispatchSegmentation,
        resetSegmentationParameters,
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
