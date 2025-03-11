export type ApplicationMode = "segmentation" | "selection";

export interface MCACrisp {
  type: "segmentation";
  nPixels: number;
  radius: number;
  wCont: number;
  wAdapt: number;
  dMax: number;
  searchArea: number;
  alpha: number;
  earlyStop: number;
  maxIterations: number;
}

export interface Otsu {
  type: "otsu";
  // nothing
}

export interface RegionGrowing {
  type: "crescimento_regioes_fora";
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

export interface MovingAverage {
  type: "lim_media_mov";
  n: number;
  b: number;
  applyInterpolation: boolean;
}

export interface MultiThresholding {
  type: "lim_multipla";
  hyperLim: [number, number];
  normalLim: [number, number];
  poorLim: [number, number];
  nonLim: [number, number];
  boneLim: [number, number];
  activateHyper: boolean;
  activateNormal: boolean;
  activatePoor: boolean;
  activateNon: boolean;
  activateBone: boolean;
  activateNonClassified: boolean;
}

export interface LocalProperties {
  type: "lim_prop_locais";
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
  type: "divisao_e_fusao";
  varLimit: number;
  meanLimit: number;
  meanReference: number;
}

export type SegmentationParameters =
  | Otsu
  | Watershed
  | MCACrisp
  | MovingAverage
  | MultiThresholding
  | LocalProperties
  | Sauvola
  | DivisionFusion
  | RegionGrowing;

export type SegmentationType = Extract<
  SegmentationParameters,
  { type: string }
>["type"];

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
