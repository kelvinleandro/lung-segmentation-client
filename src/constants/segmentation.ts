import {
  MovingAverage,
  MultiThresholding,
  LocalProperties,
  Sauvola,
} from "@/types/parameters";

const MULTI_THRESHOLDING_DEFAULT: MultiThresholding = {
  type: "multiThresholding",
};

export const MA_B_MIN = 0.5;
export const MA_B_MAX = 1.5;
export const MA_B_STEP = 0.1;
export const MA_N_MIN = 50;
export const MA_N_MAX = 200;
export const MA_N_STEP = 5;

const MA_DEFAULT: MovingAverage = {
  type: "movingAverage",
  n: 170,
  b: 0.5,
  applyInterpolation: true,
};

export const LOCAL_AB_MIN = 0.5;
export const LOCAL_AB_MAX = 1.5;
export const LOCAL_AB_STEP = 0.1;
export const LOCAL_WIN_MIN = 51;
export const LOCAL_WIN_MAX = 191;
export const LOCAL_WIN_STEP = 20;

const LOCAL_PROPERTIES_DEFAULT: LocalProperties = {
  type: "localProperties",
  windowSize: 151,
  a: 1,
  b: 0.5,
  useGlobalMean: false,
  applyInterpolation: true,
};

export const SAUVOLA_KERNEL_MIN = 3;
export const SAUVOLA_KERNEL_MAX = 9;
export const SAUVOLA_KERNEL_STEP = 2;
export const SAUVOLA_K_MIN = 0.01;
export const SAUVOLA_K_MAX = 0.1;
export const SAUVOLA_K_STEP = 0.01;
export const SAUVOLA_MORPHOLOGY_MIN = 1;
export const SAUVOLA_MORPHOLOGY_MAX = 5;
export const SAUVOLA_MORPHOLOGY_STEP = 1;

const SAUVOLA_DEFAULT: Sauvola = {
  type: "sauvola",
  windowSize: 151,
  k: 0.02,
  applyInterpolation: true,
  applyMorphology: false,
  kernelSize: 3,
  morphologyIterations: 1,
};

export const SEGMENTATION_DEFAULTS = {
  movingAverage: MA_DEFAULT,
  multiThresholding: MULTI_THRESHOLDING_DEFAULT,
  localProperties: LOCAL_PROPERTIES_DEFAULT,
  sauvola: SAUVOLA_DEFAULT,
};
