export const INTERFACE_TEXT = {
  portuguese: {
    //primeira tela
    projectTitle: "Lungs Segmentation",

    heroTitle: "Segmentação de Pulmões em imagens de TC",
    heroDescription:
      "Segmentação automática de pulmões em imagens de tomografia computadorizada (TC) utilizando o Algoritmo de Contornos Ativos Crisp Adaptativo 2D. Nosso sistema identifica e otimiza os contornos pulmonares por meio de cálculos de energia interna e externa, garantindo precisão na detecção e eficiência no processamento.",

    uploadButton: "Selecionar imagem",
    uploadNote: "Formato de imagem DICOM",

    //segunda tela
    projectName: "Nome Fictício do Projeto",
    menuResults: "Resultados",
    menuDensityScale: "Escala de Densidades",

    originalImage: "Imagem Original",

    customizeTitle: "Customização",
    customizeSelection: "Seleção",
    customizeSegmentation: "Segmentação",
    method: "Método",

    divisionFusion: "Divisão e Fusão",
    localProperties: "Propriedades Locais",
    movingAverage: "Média Movel",
    multiThresholding: "Limiarização Múltipla",

    parameters: "Parâmetros",
    postprocessing: "Pós-processamento",

    // pre processamento
    preprocessing: "Pre-processamento",
    gaussianBlur: "Desfoque Gaussiano",
    medianBlur: "Desfoque Mediano",
    meanBlur: "Desfoque da Média",
    kernelSize: "Tamanho do Kernel",
    sigma: "Sigma",

    // limiarização com media movel
    numberPoints: "Número de Pontos",
    adjustFactor: "Fator de Ajuste",
    applyInterpolation: "Aplicar Interpolação",

    // limiarização com propriedades locais
    useGlobalMean: "Usar Media Global",
    windowSize: "Tamanho da Janela",

    // sauvola
    applyMorphology: "Aplicar Morfologia",
    iterationsMorphology: "Iterações Morfologia",

    // multi thresholding
    noParameters: "Não há parâmetros para esse algoritmo",

    // watershed
    threshold: "Limiar",
    distFactor: "Fator multiplicador",
    iterationsDilation: "Iterações dilatação",

    // divisao e fusao
    varLimit: "Limite da Variância",
    meanLimit: "Limite da Média",
    meanReference: "Referência da Média",

    // pos processamento
    minArea: "Área Mínima",

    runButton: "Executar",
    chooseImageButton: "Escolher Imagem",

    colorMode: "Modo escuro",

    //terceira tela
    finalResult: "Resultado Final",
    highlight: "Destacar",
    downloadButton: "Baixar",
    onlyContours: "Apenas Contornos",
    preprocessed: "Pré-processada",
    allContours: "Todos os contornos",

    //quarta tela
    densityScaleTitle: "Escala de Densidades (HU)",
    densityHyper: "Hiperaeradas",
    densityNormal: "Normalmente aeradas",
    densityLow: "Pouco aeradas",
    densityNone: "Não aeradas",
    densityBone: "Osso",

    lowerLimit: "-1000 HU",
    upperLimit: "2000 HU",

    hyperRange: "-1000 a -950 HU",
    hyperDescription: "Regiões com muito ar, como espaços aéreos no pulmão.",
    hyperExample: "Cavidades aéreas, bronquíolos.",

    normalRange: "-950 a -500 HU",
    normalDescription:
      "Tecido pulmonar normal, densidade típica do pulmão saudável.",
    normalExample: "Parênquima pulmonar normal.",

    lowRange: "-500 a -100 HU",
    lowDescription: "Regiões com menos ar que o normal.",
    lowExample: "Áreas de atelectasia parcial.",

    noneRange: "-100 a 100 HU",
    noneDescription: "Regiões sem ar, possível consolidação.",
    noneExample: "Consolidação, derrame pleural.",

    boneRange: "600 a 2000 HU",
    boneDescription: "Estruturas ósseas, densidade muito alta.",
    boneExample: "Costelas, vértebras.",

    example: "Exemplo",

    //quinta
    zoom: "Zoom",
    config: "Configurações",
    color: "Cor",
    paint: "Tamanho do Pincel",
    interaction: "Interação",

    manualSelection: "Seleção manual",
    imageSelectionText: "Selecione uma imagem",

    //sexta
    imageErrorText: "Formato de imagem não suportado",
    imageErrorDescription: "Faça o upload de uma imagem no formato DICOM",
    closeButton: "Fechar",

    //oitava tela
    resultDownloadText: "Download de resultado",
    resultDownloadDescription:
      "Selecione o formato que deseja fazer o download:",
    pngButton: ".PNG",
    csvButton: ".CSV",

    //décima tela
    helpTitle: "Como usar a ferramenta de seleção",
    help1: "1. Selecione uma imagem para trabalhar",
    help2: "2. Use o zoom para ajustar a visualização",
    help3: "3. Clique para criar pontos ao redor do pulmão",

    //décima primeira tela
    error404: "Ops, parece que você está perdido!",
    homeButton: "Ir para a página inicial",

    footerCredits:
      "TI0147 - Fundamentos de Processamento Digital de Imagens - 2024.2 - Paulo Cesar Cortez",
  },

  english: {
    //primeira tela
    projectTitle: "Lungs Segmentation",

    heroTitle: "Lung Segmentation in CT Images",
    heroDescription:
      "Automatic lung segmentation in computed tomography (CT) images using the Adaptive Crisp Active Contour Algorithm 2D. Our system identifies and optimizes lung contours through internal and external energy calculations, ensuring precise detection and efficient processing.",

    uploadButton: "Upload Image",
    uploadNote: "DICOM image format",

    //segunda tela
    projectName: "Fictional Project Name",
    menuResults: "Results",
    menuDensityScale: "Density Scale",

    originalImage: "Original Image",

    customizeTitle: "Customization",
    customizeSelection: "Selection",
    customizeSegmentation: "Segmentation",
    method: "Method",

    divisionFusion: "Division and Fusion",
    localProperties: "Local Properties",
    movingAverage: "Moving Average",
    multiThresholding: "Multi Thresholding",

    parameters: "Parâmetros",
    postprocessing: "Pós-processamento",

    // pre processamento
    preprocessing: "Preprocessing",
    gaussianBlur: "Gaussian Blur",
    medianBlur: "Median Blur",
    meanBlur: "Mean Blur",
    kernelSize: "Kernel Size",
    sigma: "Sigma",

    // limiarização com media movel
    numberPoints: "Number of points",
    adjustFactor: "Adjust Factor",
    applyInterpolation: "Apply Interpolation",

    // limiarização com propriedades locais
    useGlobalMean: "Use Global Mean",
    windowSize: "Window Size",

    // sauvola
    applyMorphology: "Apply Morphology",
    iterationsMorphology: "Iterations Morphology",

    // multi thresholding
    noParameters: "There are no parameters for this algorithm",

    // watershed
    threshold: "Threshold",
    distFactor: "Dist Factor",
    iterationsDilation: "Iterations Dilation",

    // divisao e fusao
    varLimit: "Var Limit",
    meanLimit: "Mean Limit",
    meanReference: "Mean Reference",

    // pos processamento
    minArea: "Minimum Area",

    runButton: "Run",
    chooseImageButton: "Choose Image",

    colorMode: "Dark Mode",

    //terceira tela
    finalResult: "Final Result",
    highlight: "Highlight",
    downloadButton: "Download",
    onlyContours: "Only Contours",
    preprocessed: "Preprocessed",
    allContours: "Todos os contornos",

    //quarta tela
    densityScaleTitle: "Density Scale (HU)",
    densityHyper: "Hyper-aerated",
    densityNormal: "Normally Aerated",
    densityLow: "Poorly Aerated",
    densityNone: "Non-Aerated",
    densityBone: "Bone",

    lowerLimit: "-1000 HU",
    upperLimit: "2000 HU",

    hyperRange: "-1000 to -950 HU",
    hyperDescription:
      "Regions with a lot of air, such as air spaces in the lungs.",
    hyperExample: "Air cavities, bronchioles.",

    normalRange: "-950 to -500 HU",
    normalDescription: "Normal lung tissue, typical density of healthy lungs.",
    normalExample: "Normal pulmonary parenchyma.",

    lowRange: "-500 to -100 HU",
    lowDescription: "Regions with less air than normal.",
    lowExample: "Areas of partial atelectasis.",

    noneRange: "-100 to 100 HU",
    noneDescription: "Regions without air, possible consolidation.",
    noneExample: "Consolidation, pleural effusion.",

    boneRange: "600 to 2000 HU",
    boneDescription: "Bone structures, very high density.",
    boneExample: "Ribs, vertebrae.",

    example: "Example",

    //quinta tela
    zoom: "Zoom",
    config: "Settings",
    color: "Color",
    paint: "Brush Size",
    interaction: "Interaction",

    manualSelection: "Manual Selection",
    imageSelectionText: "Select an image",

    //sexta tela
    imageErrorText: "Unsupported Image Format",
    imageErrorDescription: "Upload an image in DICOM format",
    closeButton: "Close",

    //oitava tela
    resultDownloadText: "Download Result",
    resultDownloadDescription: "Select the format you want to download:",
    pngButton: ".PNG",
    csvButton: ".CSV",

    //décima tela
    helpTitle: "How to Use the Selection Tool",
    help1: "1. Select an image to work with",
    help2: "2. Use zoom to adjust the view",
    help3: "3. Click to create points around the lung",

    //décima primeira tela
    error404: "Oops, looks like you're lost!",
    homeButton: "Go to Homepage",

    footerCredits:
      "TI0147 - Fundamentals of Digital Image Processing - 2024.2 - Paulo Cesar Cortez",
  },
};
