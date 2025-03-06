import { createContext, useRef, useState, useReducer } from "react";
import {
  ApplicationMode,
  PostprocessingParameters,
  PreprocessingParameters,
  SegmentationParameters,
  SegmentationType,
  SelectionParameters,
} from "@/types/parameters";
import { SEGMENTATION_DEFAULTS } from "@/constants/segmentation";
import { SELECTION_DEFAULT } from "@/constants/selection";
import { PREPROCESSING_DEFAULT } from "@/constants/preprocessing";
import { POST_PROCESSING_DEFAULT } from "@/constants/postprocessing";
import { ApiResponse } from "@/types/api";

type ParametersContextType = {
  mode: ApplicationMode;
  setMode: (mode: ApplicationMode) => void;
  // selection
  selectionParameters: SelectionParameters;
  setSelectionParameters: React.Dispatch<
    React.SetStateAction<SelectionParameters>
  >;
  // preprocessing
  preprocessingParameters: PreprocessingParameters;
  setPreprocessingParameters: React.Dispatch<
    React.SetStateAction<PreprocessingParameters>
  >;
  // postprocessing
  postprocessingParameters: PostprocessingParameters;
  setPostprocessingParameters: React.Dispatch<
    React.SetStateAction<PostprocessingParameters>
  >;
  // segmentation
  segmentationParameters: SegmentationParameters;
  dispatchSegmentation: React.Dispatch<SegmentationAction>;
  resetSegmentationParameters: (method: SegmentationType) => void;
  // responses
  dicomFile: File | null;
  changeDicomFile: (file: File) => void;
  clearRef: React.RefObject<HTMLButtonElement> | null;
  apiResponse: ApiResponse | null;
  setApiResponse: (response: ApiResponse | null) => void;
};

export type SegmentationAction =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: "SET_PARAM"; key: string; value: any }
  | { type: "RESET_PARAMS"; method: SegmentationType };

const segmentationReducer = (
  state: SegmentationParameters,
  action: SegmentationAction
): SegmentationParameters => {
  switch (action.type) {
    case "SET_PARAM":
      return { ...state, [action.key]: action.value };
    case "RESET_PARAMS":
      return SEGMENTATION_DEFAULTS[action.method];
    default:
      return state;
  }
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
  const [selectionParameters, setSelectionParameters] =
    useState<SelectionParameters>(SELECTION_DEFAULT);
  const [preprocessingParameters, setPreprocessingParameters] =
    useState<PreprocessingParameters>(PREPROCESSING_DEFAULT);
  const [postprocessingParameters, setPostprocessingParameters] =
    useState<PostprocessingParameters>(POST_PROCESSING_DEFAULT);
  const [segmentationParameters, dispatchSegmentation] = useReducer(
    segmentationReducer,
    SEGMENTATION_DEFAULTS.watershed
  );
  // clear ref for canvas
  const clearRef = useRef<HTMLButtonElement | null>(null);
  // api response
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const changeDicomFile = (file: File | null) => {
    setDicomFile(file);
    setApiResponse(null);
    setSelectionParameters((prev) => ({ ...prev, zoom: 1 }));
    clearRef.current?.click();
  };

  const resetSegmentationParameters = (method: SegmentationType) => {
    dispatchSegmentation({ type: "RESET_PARAMS", method });
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
        preprocessingParameters,
        setPreprocessingParameters,
        postprocessingParameters,
        setPostprocessingParameters,
        apiResponse,
        setApiResponse,
      }}
    >
      {children}
    </ParametersContext.Provider>
  );
};
