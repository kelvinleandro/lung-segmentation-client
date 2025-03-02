import useTheme from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useParameters } from "@/hooks/use-parameters";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LucideMove, LucidePenTool } from "lucide-react";
import useApi from "@/hooks/use-api";

const ParametersSelector = () => {
  const { currentColorScheme } = useTheme();
  const { mode, setMode, changeDicomFile, segmentationParameters, setSegmentationParameters, selectionParameters, setSelectionParameters} = useParameters();

  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if(file && fileName.endsWith('.dcm')) {
      setFileName(file.name);
      setSelectedFile(file);
      changeDicomFile(file)
    } else {
      setFileName("Choose Image");
      setSelectedFile(null);
    }
  };

  const { sendFileToServer } = useApi();

  const handleRun = async () => {
    if (!selectedFile) {
      console.error("Nenhum arquivo selecionado.");
      return;
    }

    console.log("Enviando arquivo para o servidor...");
    const response = await sendFileToServer(selectedFile);

    if(response) {
      console.log("Contornos Recebidos:", response);
    } else{
      console.error("Erro ao processar a imagem.");
    };
  };

  const handleContrastChange = (param: "windowwidth" | "windowcenter", value: number) => {
    setSelectionParameters((prev) => ({ ...prev, [param]: value}));
    };

  const handleSegmentationChange = (method: string) => {
    setSegmentationParameters((prev) => ({ ...prev, method}));
  };

  return (
    <aside
      className={cn(
        "h-full w-full p-4 space-y-4",
        currentColorScheme == "dark"
          ? "bg-[#001d3d] text-white"
          : "bg-white text-black"
      )}
    >
      <h2 className="text-2xl font-bold">Customising</h2>

      <Tabs value={mode} onValueChange={setMode}>

        {/* Tabs de Segmentação e Seleção */}
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="selection">Seleção</TabsTrigger>
          <TabsTrigger value="segmentation" >Segmentação</TabsTrigger>
        </TabsList>

        {/* Tabs de Métodos */}
        <TabsContent value="segmentation">
          <div>
            <h3 className="font-semibold">Método de Segmentação</h3>
            <label>
              <input type="radio" name="segmentationMethod" value="Metodo1" checked={segmentationParameters === "OtsuParameters"} onChange={() => handleSegmentationChange("Metodo1")} />
              Método 1
            </label>
            <label>
              <input type="radio" name="segmentationMethod" value="Metodo2" checked={segmentationParameters === "WatershedParameters"} onChange={() => handleSegmentationChange("Metodo2")} />
              Método 2
            </label>
            <label>
              <input type="radio" name="segmentationMethod" value="Metodo3" checked={segmentationParameters === "CrispParameters"} onChange={() => handleSegmentationChange("Metodo3")} />
              Método 3
            </label>
          </div>
        </TabsContent>

        {/* Contraste e Interação */}
        <TabsContent value="selection">
        <div>
          <h3 className="font-semibold">CONTRASTE</h3>
          <label>Window Width:</label>
          <input type="range" min="0" max="255" value={selectionParameters.windowWidth} onChange={(e) => handleContrastChange("windowwidth", Number(e.target.value))} className="w-full" />
          <label>Window Center:</label>
          <input type="range" min="0" max="255" value={selectionParameters.windowCenter} onChange={(e) => handleContrastChange("windowcenter", Number(e.target.value))} className="w-full" />
        </div>

        <div>
          <h3 className="font-semibold">Interação</h3>
          <div className="flex space-x-2">
            <Button variant={isDrawing ? "default" : "outline"} onClick={() => setIsDrawing(true)}>
              <LucidePenTool size={16} />
            </Button>
            <Button variant={isDrawing ? "default" : "outline"} onClick={() => setIsDrawing(false)}>
              <LucideMove size={16} />
            </Button>
          </div>
        </div>
        </TabsContent>
      </Tabs>

      {/* Text Input */}
      <div>
        <h3 className="font-semibold">TEXT INPUT</h3>
        {["Item 1", "Item 2"].map((item, index) => (
          <div key={index}>
            <label>{item}:</label>
            <input type="text" placeholder="Text here" className="border p-2 w-full" />
          </div>
        ))}
      </div>

      {/* Botões principais */}
      <Button className="w-full" onClick={handleRun}>Run</Button>
      <input id="file-upload" type="file" accept=".dcm" onChange={handleFileChange} className="hidden" />
      <button onClick={() => document.getElementById('file-upload')?.click()} className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full">
        {fileName ? fileName : 'Choose Image'}
      </button>
    </aside>
  );
};

export default ParametersSelector;
