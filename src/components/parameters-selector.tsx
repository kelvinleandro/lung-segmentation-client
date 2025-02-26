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

  const {selectionParameters, setSelectionParameters} = useContext(ParametersContext);
  const handleContrastChange = (param: "windowWidth" | "windowCenter", value: number) => {
    setSelectionParameters((prev) => ({
      ...prev,
      [param]:value,
    }));
  };

  const { segmentationParameters, setSegmentationParameters} = useContext(ParametersContext);
  const handleSegmentationChange = (method: string, isChecked: boolean) => {
    setSegmentationParameters((prev) => ({
      ...prev,
      method: isChecked ? method : "",
    }));
  };

  const {mode, setMode} = useContext(ParametersContext);
  const toggleMode = (newMode: "selection" | "segmentation") => {
    setMode(newMode);
  }

  const changeDicomFile = parametersContext;

  const toggleDrawing = () => {
    setIsDrawing(true);
    setIsPanning(false);
  };

  const togglePanning = () => {
    setIsPanning((prev) => !prev);
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
      <div className="flex">
        <Button
        className={`text-black px-4 py-2 border rounded-l-lg ${mode == "selection" ? "bg-black text-white" : "bg-white"}`}
        onClick={() => setMode("selection")}>Seleção</Button>

        <Button 
        className={`text-black px-4 py-2 border rounded-r-lg ${mode == "segmentation" ? "bg-black text-white" : "bg-white"}`} 
        onClick={() => setMode("segmentation")}>Segmentação</Button>
      </div>

      {/* Radio 1 */}
      <div className="flex flex-col space-y-2 items-center">
        <h3 className="font-semibold">SELECIONE O MÉTODO</h3>
        <label>
          <input type="radio" className="mr-1" checked={segmentationParameters.method === "Metodo1"} onChange={(e) => handleSegmentationChange("Metodo1", e.target.checked)} />
            Método 1
        </label>

        <label>
          <input type="radio" className="mr-1" checked={segmentationParameters.method === "Metodo2"} onChange={(e) => handleSegmentationChange("Metodo2", e.target.checked)} />
            Método 2
        </label>

        <label>
          <input type="radio" className="mr-1" checked={segmentationParameters.method === "Metodo3"} onChange={(e) => handleSegmentationChange("Metodo3", e.target.checked)} />
            Método 3
        </label>
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
        <input type="range" min="0" max="255" value={selectionParameters.windowWidth} onChange={(e) => handleContrastChange("windowWidth", Number(e.target.value))} className="w-full" />
        <label>Window Center:</label>
        <input type="range" min="0" max="255" value={selectionParameters.windowCenter} onChange={(e) => handleContrastChange("windowCenter", Number(e.target.value))} className="w-full" />
      </div>

      {/* Radio 2 */}
      <div>
        <h3 className="font-semibold">RADIO</h3>
        {["Item 1", "Item 2"].map((item, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input type="radio" name="radio-group" defaultChecked={index === 0} />
            <span>{item}</span>
          </label>
        ))}
      </div>

      {/* Interação */}
      <div className="flex space-x-2">
        <Button variant={isDrawing ? "default" : "outline"} className={`${isDrawing ? "text-white" : "text-black"}`} onClick={() => setIsDrawing(true)}>
          <LucidePenTool size={16} />
        </Button>
        <Button variant={!isDrawing ? "default" : "outline"} className={`${!isDrawing ? "text-white" : "text-black"}`} onClick={() => setIsDrawing(false)}>
          <LucideMove size={16} />
        </Button>
      </div>

      {/* Botões principais */}
      <Button className="w-full">Run</Button>
      <Button className="w-full text-black" variant="outline" onClick={() => changeDicomFile(null)}>
        Choose Image
      </Button>
    </aside>
  );
};

export default ParametersSelector;
