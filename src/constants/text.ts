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

    checkbox: "Caixa de Seleção",
    item1: "Item 1",
    item2: "Item 2",
    item3: "Item 3",

    methodSelection: "Entrada de Texto",
    textInputLabel1: "Item 1:",
    textInputLabel2: "Item 2:",
    textHere: "Escreva aqui",

    contrastSettings: "Configuração de Contraste",
    windowWidth: "Largura da Janela",
    windowCenter: "Centro da Janela",

    radio: "Radio",
    radioOption1: "Opção 1",
    radioOption2: "Opção 2",

    runButton: "Executar",
    chooseImageButton: "Escolher Imagem",

    colorMode: "Modo escuro",

    //terceira tela
    finalResult: "Resultado Final",
    highlight: "Destacar",
    downloadButton: "Baixar",
    onlyContours: "Apenas Contornos",
    preprocessed: "Pré-processada",

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
    zoom: "ZOOM",
    config: "Configurações",
    color: "Cores",
    paint: "Tamanho do Pincel",

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

    checkbox: "Checkbox",
    item1: "Item 1",
    item2: "Item 2",
    item3: "Item 3",

    methodSelection: "Text Input",
    textInputLabel1: "Item 1:",
    textInputLabel2: "Item 2:",
    textHere: "Text here",

    contrastSettings: "Contrast Settings",
    windowWidth: "Window Width",
    windowCenter: "Window Center",

    radio: "Radio",
    radioOption1: "Option 1",
    radioOption2: "Option 2",

    runButton: "Run",
    chooseImageButton: "Choose Image",

    colorMode: "Dark Mode",

    //terceira tela
    finalResult: "Final Result",
    highlight: "Highlight",
    downloadButton: "Download",
    onlyContours: "Only Contours",
    preprocessed: "Preprocessed",

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
    zoom: "ZOOM",
    config: "Settings",
    color: "Colors",
    paint: "Brush Size",

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
