import {
  SegmentationParameters,
  PreprocessingParameters,
  PostprocessingParameters,
} from "@/types/parameters";

/**
 * Converts a tuple of two numbers into a string.
 * The resulting string represents the numbers separated by a comma.
 *
 * @param tuple - A tuple containing two numbers.
 * @returns A string representing the two numbers separated by a comma.
 *
 * @example
 * const result = tupleToString([5, 10]);
 * console.log(result); // Output: "5,10"
 */
export const tupleToString = (tuple: [number, number]) =>
  `${tuple[0]},${tuple[1]}`;

/**
 * Prepares a set of parameters to be sent for processing, transforming them into
 * an appropriate format depending on the type of parameters provided.
 *
 * The function handles different types of parameter objects (Segmentation,
 * Preprocessing, Postprocessing, etc.) and converts them into a standardized
 * format that can be used in further processing.
 *
 * @param params - The parameters to transform, which can be one of the following types:
 *   - SegmentationParameters
 *   - PreprocessingParameters
 *   - PostprocessingParameters
 *   - `undefined`
 *
 * @returns An object containing the transformed parameters, or an empty object if `params` is undefined.
 */
export const prepareParamsToSend = (
  params:
    | SegmentationParameters
    | PreprocessingParameters
    | PostprocessingParameters
    | undefined
) => {
  if (!params) return {};
  let transformed = {}; // default for otsu / growth of regions

  if (params.type === "preprocessing") {
    // preprocessing params
    transformed = {
      aplicar_desfoque_gaussiano: params.applyGaussianBlur,
      aplicar_desfoque_media: params.applyMeanBlur,
      aplicar_desfoque_mediana: params.applyMedianBlur,
      tamanho_kernel: params.kernelSize,
      sigma: params.sigma,
    };
  } else if (params.type === "segmentation") {
    // main segmentation method
    transformed = {
      quantidade_pixels: params.nPixels,
      raio: params.radius,
      w_cont: params.wCont,
      w_adapt: params.wAdapt,
      d_max: params.dMax,
      area_de_busca: params.searchArea,
      alpha: params.alpha,
      early_stop: params.earlyStop,
      max_iterations: params.maxIterations,
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
    // multi threshold
    transformed = {
      lim_hiperaeradas: tupleToString(params.hyperLim),
      lim_normalmente_aeradas: tupleToString(params.normalLim),
      lim_pouco_aeradas: tupleToString(params.poorLim),
      lim_nao_aeradas: tupleToString(params.nonLim),
      lim_osso: tupleToString(params.boneLim),
      ativacao_hiperaeradas: params.activateHyper,
      ativacao_normalmente_aeradas: params.activateNormal,
      ativacao_pouco_aeradas: params.activatePoor,
      ativacao_nao_aeradas: params.activateNon,
      ativacao_osso: params.activateBone,
      ativacao_nao_classificado: params.activateNonClassified,
    };
  } else if (params.type === "lim_global_simples") {
    // simple global thresholding
    transformed = {
      limiar: params.threshold,
      delta_limiar: params.deltaThreshold,
    };
  } else if (params.type === "postprocessing") {
    // postprocessing
    transformed = {
      area_minima: params.minArea,
    };
  }

  return transformed;
};
