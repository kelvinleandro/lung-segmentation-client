// import { SegmentationParameters, PreprocessingParameters } from "@/types/parameters";

// export const prepareParamsToSend = (params: SegmentationParameters | PreprocessingParameters) => {
export const prepareParamsToSend = (params: any) => {
  let transformed = {};

  if ("sigma" in params) {
    // preprocessing params
    transformed = {
      aplicar_desfoque_gaussiano: params.applyGaussianBlur,
      aplicar_desfoque_media: params.applyMeanBlur,
      aplicar_desfoque_mediana: params.applyMedianBlur,
      tamanho_kernel: params.kernelSize,
      sigma: params.sigma,
    };
  } else if ("applyInterpolation" in params) {
    // moving average limiarization
    transformed = {
      n: params.n,
      b: params.b,
      aplicar_interpolacao: params.applyInterpolation,
    };
  }

  return transformed;
};
