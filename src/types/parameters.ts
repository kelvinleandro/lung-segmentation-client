export type ApplicationMode = "segmentation" | "selection";

export interface Otsu {
  type: "otsu";
}

export interface Watershed {
  type: "watershed";
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

export type SegmentationParameters =
  | Otsu
  | Watershed
  | Crisp
  | MovingAverage
  | MultiThresholding
  | LocalProperties
  | Sauvola;

export interface SelectionParameters {
  lineWidth: number;
  color: string;
  zoom: number;
  isPanning: boolean;
  isDrawing: boolean;
}
