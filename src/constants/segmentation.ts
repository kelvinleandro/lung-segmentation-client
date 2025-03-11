import {
  MovingAverage,
  MultiThresholding,
  LocalProperties,
  Sauvola,
  Watershed,
  DivisionFusion,
  Otsu,
  Crisp,
  RegionGrowing,
} from "@/types/parameters";

const MULTI_THRESHOLDING_DEFAULT: MultiThresholding = {
  type: "lim_multipla",
  hyperLim: [0, 8],
  normalLim: [8, 42],
  poorLim: [42, 76],
  nonLim: [76, 93],
  boneLim: [136, 255],
  activateHyper: true,
  activateNormal: true,
  activatePoor: true,
  activateNon: true,
  activateBone: false,
  activateNonClassified: false,
};

const OTSU_DEFAULT: Otsu = { type: "otsu" };

const REGION_GROWING_DEFAULT: RegionGrowing = {
  type: "crescimento_regioes_fora",
};

const CRISP_DEFAULT: Crisp = { type: "crisp" };

export const MA_B_MIN = 0.5;
export const MA_B_MAX = 1.5;
export const MA_B_STEP = 0.1;
export const MA_N_MIN = 50;
export const MA_N_MAX = 200;
export const MA_N_STEP = 5;

const MA_DEFAULT: MovingAverage = {
  type: "lim_media_mov",
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
  type: "lim_prop_locais",
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

export const WSHED_THRESH_MIN = 0;
export const WSHED_THRESH_MAX = 255;
export const WSHED_THRESH_STEP = 1;
export const WSHED_KERNEL_MIN = 3;
export const WSHED_KERNEL_MAX = 9;
export const WSHED_KERNEL_STEP = 2;
export const WSHED_IT_MORPH_MIN = 1;
export const WSHED_IT_MORPH_MAX = 5;
export const WSHED_IT_MORPH_STEP = 1;
export const WSHED_IT_DILAT_MIN = 1;
export const WSHED_IT_DILAT_MAX = 5;
export const WSHED_IT_DILAT_STEP = 1;
export const WSHED_DIST_MIN = 0;
export const WSHED_DIST_MAX = 1;
export const WSHED_DIST_STEP = 0.1;

const WATERSHED_DEFAULT: Watershed = {
  type: "watershed",
  threshold: 60,
  applyInterpolation: true,
  applyMorphology: true,
  kernelSize: 3,
  morphologyIterations: 2,
  dilationIterations: 1,
  distFactor: 0.3,
};

export const DF_VLIM_MIN = 0;
export const DF_VLIM_MAX = 100;
export const DF_VLIM_STEP = 1;
export const DF_MLIM_MIN = 0;
export const DF_MLIM_MAX = 100;
export const DF_MLIM_STEP = 1;
export const DF_MREF_MIN = 0;
export const DF_MREF_MAX = 100;
export const DF_MREF_STEP = 1;

const DIVISION_FUSION_DEFAULT: DivisionFusion = {
  type: "divisao_e_fusao",
  varLimit: 40,
  meanLimit: 40,
  meanReference: 5,
};

export const SEGMENTATION_DEFAULTS = {
  lim_media_mov: MA_DEFAULT,
  lim_multipla: MULTI_THRESHOLDING_DEFAULT,
  lim_prop_locais: LOCAL_PROPERTIES_DEFAULT,
  sauvola: SAUVOLA_DEFAULT,
  watershed: WATERSHED_DEFAULT,
  divisao_e_fusao: DIVISION_FUSION_DEFAULT,
  otsu: OTSU_DEFAULT,
  crescimento_regioes_fora: REGION_GROWING_DEFAULT,
  crisp: CRISP_DEFAULT,
};
