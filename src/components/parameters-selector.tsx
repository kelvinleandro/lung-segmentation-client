import useTheme from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { useContext, useState } from "react";
import { ParametersContext } from "@/context/parameters-context";
import { Button } from "@/components/ui/button";
import { LucideMove, LucidePenTool } from "lucide-react";

const ParametersSelector = () => {
  const { currentColorScheme } = useTheme();
  const parametersContext = useContext(ParametersContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);

  if(!parametersContext) {
    return <div>Loading...</div>;
  }

  const {
    mode,
    setMode,
    segmentationParameters,
    changeDicomFile,
  } = parametersContext;

  const toggleDrawing = () => {
    setIsDrawing(true);
    setIsPanning(false);
  };

  const togglePanning = () => {
    setIsPanning(true);
    setIsDrawing(false);
  }

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

      {/* Tabs de Segmentação e Seleção */}
      <div className="flex space-x-2">
        <Button
        className={`px-4 py-2 border rounded ${mode == "selection" ? "bg-black text-white" : "bg-gray-200"}`}
        onClick={() => setMode("selection")}>Seleção</Button>

        <Button 
        className={`px-4 py-2 border rounded ${mode == "segmentation" ? "bg-black text-white" : "bg-gray-200"}`} 
        onClick={() => setMode("segmentation")}>Segmentação</Button>
      </div>

      {/* Checkbox */}
      <div>
        <h3 className="font-semibold">CHECKBOX</h3>
        {["Item 1", "Item 2", "Item 3"].map((item, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked={index !== 0} />
            <span>{item}</span>
          </label>
        ))}
      </div>

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

      {/* Range */}
      <div>
        <h3 className="font-semibold">CONTRASTE</h3>
        <label>Window Width:</label>
        <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
        <label>Window Center:</label>
        <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
      </div>

      {/* Radio */}
      <div>
        <h3 className="font-semibold">RADIO</h3>
      </div>

      {/* Desenhar e Pan */}
      {mode == "selection" && (
        <div className="flex gap-2">
          <Button variant={isDrawing ? "default" : "outline"} onClick={toggleDrawing}><Paintbrush size={20} className="mr-2"/>Desenhar</Button>
          <Button variant={isPanning ? "default" :  "outline"} onClick={togglePanning}><Move size={20} className="mr-2"/>Pan</Button>
        </div>
      )}

      {/* Dinamicidade de modo */}
      <div className="flex flex-col gap-4">
        {mode == "selection" ? (
          <>
            <label className="text-sm font-semibold">Selecionar Imagem</label>
            <input type="file" className="border p-2 rounded" onChange={(e) => {
              if (e.target.files?.[0]) {
                changeDicomFile(e.target.files[0]);
              }
            }}/>
          </>
        ) : (
          <>
            <label className="text-sm font-semibold">Parâmetros de Segmentação</label>
            <pre className="bg-white text-black p-2 rounded">
              {JSON.stringify(segmentationParameters, null, 2)}
            </pre>
          </>
        )};
      </div>

      {/* Botão de Executar */}
      <Button className="w-full mt-auto">Executar</Button>

    </aside>
  );
};

export default ParametersSelector;
