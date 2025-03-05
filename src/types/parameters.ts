export type ApplicationMode = "segmentation" | "selection";

export interface Otsu {
  type: "otsu";
  // nothing
}

export interface Watershed {
  type: "watershed";
  threshold: number;
  applyInterpolation: boolean;
  applyMorphology: boolean;
  kernelSize: number;
  morphologyIterations: number;
  dilationIterations: number;
  distFactor: number;
}

export interface Crisp {
  type: "crisp";
}

export interface MovingAverage {
  type: "movingAverage";
  n: number;
  b: number;
  applyInterpolation: boolean;
}

export interface MultiThresholding {
  type: "multiThresholding";
  // nothing
}

export interface LocalProperties {
  type: "localProperties";
  windowSize: number;
  a: number; // std
  b: number; // mu
  useGlobalMean: boolean;
  applyInterpolation: boolean;
}

export interface Sauvola {
  type: "sauvola";
  windowSize: number;
  k: number;
  applyInterpolation: boolean;
  applyMorphology: boolean;
  kernelSize: number;
  morphologyIterations: number;
}

export interface DivisionFusion {
  type: "divisionFusion";
  varLimit: number;
  meanLimit: number;
  meanReference: number;
}

export type SegmentationParameters =
  | Otsu
  | Watershed
  | Crisp
  | MovingAverage
  | MultiThresholding
  | LocalProperties
  | Sauvola
  | DivisionFusion;

export interface SelectionParameters {
  lineWidth: number;
  color: string;
  zoom: number;
  isPanning: boolean;
  isDrawing: boolean;
}

export interface PreprocessingParameters {
  type: "preprocessing";
  applyMeanBlur: boolean;
  applyGaussianBlur: boolean;
  applyMedianBlur: boolean;
  kernelSize: number;
  sigma: number;
}

export interface PostprocessingParameters {
  type: "postprocessing";
  minArea: number;
}
