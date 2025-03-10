import {
  SegmentationParameters,
  PreprocessingParameters,
  PostprocessingParameters,
} from "@/types/parameters";

export const prepareParamsToSend = (
  params:
    | SegmentationParameters
    | PreprocessingParameters
    | PostprocessingParameters
    | undefined
) => {
  if (!params) return {};
  let transformed = {}; // default for otsu

  if (params.type === "preprocessing") {
    // preprocessing params
    transformed = {
      aplicar_desfoque_gaussiano: params.applyGaussianBlur,
      aplicar_desfoque_media: params.applyMeanBlur,
      aplicar_desfoque_mediana: params.applyMedianBlur,
      tamanho_kernel: params.kernelSize,
      sigma: params.sigma,
    };
  } else if (params.type === "lim_media_mov") {
    // moving average limiarization
    transformed = {
      n: params.n,
      b: params.b,
      aplicar_interpolacao: params.applyInterpolation,
    };
  } else if (params.type === "lim_prop_locais") {
    // local properties limiarization
    transformed = {
      tamanho_janela: params.windowSize,
      a: params.a,
      b: params.b,
      usar_media_global: params.useGlobalMean,
      aplicar_interpolacao: params.applyInterpolation,
    };
  } else if (params.type === "sauvola") {
    // sauvola
    transformed = {
      tamanho_janela: params.windowSize,
      k: params.k,
      aplicar_interpolacao: params.applyInterpolation,
      aplicar_morfologia: params.applyMorphology,
      tamanho_kernel: params.kernelSize,
      iteracoes_morfologia: params.morphologyIterations,
    };
  } else if (params.type === "watershed") {
    // watershed
    transformed = {
      limiar: params.threshold,
      aplicar_interpolacao: params.applyInterpolation,
      aplicar_morfologia: params.applyMorphology,
      tamanho_kernel: params.kernelSize,
      iteracoes_morfologia: params.morphologyIterations,
      iteracoes_dilatacao: params.dilationIterations,
      fator_dist_transform: params.distFactor,
    };
  } else if (params.type === "divisao_e_fusao") {
    // division fusion
    transformed = {
      limite_var: params.varLimit,
      limite_media: params.meanLimit,
      referencia_media: params.meanReference,
    };
  } else if (params.type === "lim_multipla") {
    transformed = {
      lim_hiperaeradas: params.hyperLim,
      lim_normalmente_aeradas: params.normalLim,
      lim_pouco_aeradas: params.poorLim,
      lim_nao_aeradas: params.nonLim,
      lim_osso: params.boneLim,
      ativacao_hiperaeradas: params.activateHyper,
      ativacao_normalmente_aeradas: params.activateNormal,
      ativacao_pouco_aeradas: params.activatePoor,
      ativacao_nao_aeradas: params.activateNon,
      ativacao_osso: params.activateBone,
      ativacao_nao_classificado: params.activateNonClassified,
    };
  } else if (params.type === "postprocessing") {
    // postprocessing
    transformed = {
      area_minima: params.minArea,
    };
  }

  return transformed;
};
