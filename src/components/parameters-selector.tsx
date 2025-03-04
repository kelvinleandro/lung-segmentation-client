import useTheme from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useParameters } from "@/hooks/use-parameters";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LucideMove, LucidePenTool } from "lucide-react";
import useApi from "@/hooks/use-api";
import { ApplicationMode } from "@/types/parameters";
import { ScrollArea } from "@/components/ui/scroll-area";

const ParametersSelector = () => {
  const { currentColorScheme } = useTheme();
  const { mode, setMode, changeDicomFile, segmentationParameters, setSegmentationParameters, selectionParameters, setSelectionParameters} = useParameters();

  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const { dicomFile } = useParameters();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if(file && file.name.endsWith('.dcm')) {
      setFileName(file.name);
      setSelectedFile(file);
      changeDicomFile(file)
    } else {
      setFileName("Choose Image");
      setSelectedFile(null);
    }
  };

  const { sendFileToServer } = useApi();

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

      <Tabs value={mode} onValueChange={(value) => setMode(value as ApplicationMode)}>

        {/* Tabs de Segmentação e Seleção */}
        <TabsList className={cn("grid grid-cols-2", currentColorScheme == "dark" ? "bg-[#001d3d]" : "bg-white")}>
          <TabsTrigger value="selection" className={cn("w-full rounded-l-lg border-2 border-r-0", mode == "selection" && currentColorScheme == "dark"  ? "bg-white text-black border-white" : "", mode != "selection" && currentColorScheme == "dark"  ? "bg-[#001d3d] text-white border-white" : "", mode == "selection" && currentColorScheme != "dark" ? "bg-black text-white border-black" : "", mode != "selection" && currentColorScheme != "dark"  ? "text-black border-black" : "" )}>Seleção</TabsTrigger>
          <TabsTrigger value="segmentation" className={cn("w-full rounded-r-lg border-2 border-l-0", mode == "segmentation" && currentColorScheme == "dark"  ? "bg-white text-black border-white" : "", mode != "segmentation" && currentColorScheme == "dark"  ? "bg-[#001d3d] text-white border-white" : "", mode == "segmentation" && currentColorScheme != "dark"  ? "bg-black text-white border-black" : "", mode != "segmentation" && currentColorScheme != "dark"  ? "text-black border-black" : "" )}>Segmentação</TabsTrigger>
        </TabsList>

        {/* Segmentação */}
        <TabsContent value="segmentation">

          <ScrollArea className="h-[60vh]">
            <div className="flex flex-col">
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

            <div>
              <h3 className="font-semibold">TEXT INPUT</h3>
              {["Item 1", "Item 2"].map((item, index) => (
                <div key={index}>
                  <label>{item}:</label>
                  <input type="text" placeholder="Text here" className="border p-2 w-full" />
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-semibold">CONTRASTE</h3>
              <label>Window Width:</label>
              <input type="range" min="0" max="255" value={selectionParameters.windowWidth} onChange={(e) => handleContrastChange("windowwidth", Number(e.target.value))} className={cn("w-full", currentColorScheme == "dark" ? "accent-white" : "accent-black")} />
              <label>Window Center:</label>
              <input type="range" min="0" max="255" value={selectionParameters.windowCenter} onChange={(e) => handleContrastChange("windowcenter", Number(e.target.value))} className={cn("w-full", currentColorScheme == "dark" ? "accent-white" : "accent-black")} />
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
          </ScrollArea>
          
        </TabsContent>

        {/* Interação */}
        <TabsContent value="selection">
  
        </TabsContent>
      </Tabs>

      {/* Botões principais */}
      <Button className={cn("w-full", currentColorScheme == "dark" ? "bg-white text-black" : "bg-black text-white")} onClick={async () => {
        console.log("Arquivo selecionado para envio:", selectedFile);

        if(!selectedFile) {
          console.error("Nenhum arquivo Dicom selecionado!");
          return;
        }

        console.log("Enviando arquivo para o servidor...");
        const contours = await sendFileToServer(selectedFile);
        console.log("Resposta do servidor", contours)


        if(contours) {
          console.log("Contornos recebidos:", contours);
        } else {
          console.error("Erro ao processar a imagem");
        }
      }}>Run</Button>
      <input id="file-upload" type="file" accept=".dcm" onChange={handleFileChange} className="hidden" />
      <Button onClick={() => document.getElementById('file-upload')?.click()} className={cn("w-full rounded-lg", currentColorScheme == "dark" ? "bg-white text-black" : "bg-black text-white")}>
        {fileName ? fileName : 'Choose Image'}
      </Button>
    </aside>
  );
};

export default ParametersSelector;
