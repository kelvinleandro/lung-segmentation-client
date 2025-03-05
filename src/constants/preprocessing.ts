import { PreprocessingParameters } from "@/types/parameters";

export const PREPROCESSING_DEFAULT: PreprocessingParameters = {
    applyMeanBlur: false,
    applyGaussianBlur: false,
    applyMedianBlur: false,
    kernelSize: 5,
    sigma: 0,
};

export const KERNEL_SIZE_MIN = 3;
export const KERNEL_SIZE_MAX = 9;
export const KERNEL_SIZE_STEP = 2;

export const SIGMA_MIN = 0;
export const SIGMA_MAX = 5;
export const SIGMA_STEP = 1;