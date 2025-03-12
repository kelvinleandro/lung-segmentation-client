import { PreprocessingParameters } from "@/types/parameters";

export const PREPROCESSING_DEFAULT: PreprocessingParameters = {
  type: "preprocessing",
  applyMeanBlur: false,
  applyGaussianBlur: false,
  applyMedianBlur: false,
  kernelSize: 5,
  sigma: 0,
};

export const PRE_KERNEL_SIZE_MIN = 3;
export const PRE_KERNEL_SIZE_MAX = 9;
export const PRE_KERNEL_SIZE_STEP = 2;

export const PRE_SIGMA_MIN = 0;
export const PRE_SIGMA_MAX = 5;
export const PRE_SIGMA_STEP = 0.2;
