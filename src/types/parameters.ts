export type ApplicationMode = "segmentation" | "selection";

export interface OtsuParameters {}

export interface WatershedParameters {}

export interface CrispParameters {}

export type SegmentationParameters =
  | OtsuParameters
  | WatershedParameters
  | CrispParameters;

export interface SelectionParameters {
  lineWidth: number;
  color: string;
  zoom: number;
  isPanning: boolean;
  isDrawing: boolean;
}

export type PreprocessingParameters = {
  applyMeanBlur: boolean;
  applyGaussianBlur: boolean;
  applyMedianBlur: boolean;
  kernelSize: number;
  sigma: number;
}