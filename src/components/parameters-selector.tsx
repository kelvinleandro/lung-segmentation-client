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
        {["Item 1", "Item 2"].map((item, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input type="radio" name="radio-group" defaultChecked={index === 0} />
            <span>{item}</span>
          </label>
        ))}
      </div>

      {/* Interação */}
      <div className="flex space-x-2">
        <Button variant={isDrawing ? "default" : "outline"} onClick={() => setIsDrawing(true)}>
          <LucidePenTool size={16} />
        </Button>
        <Button variant={!isDrawing ? "default" : "outline"} onClick={() => setIsDrawing(false)}>
          <LucideMove size={16} />
        </Button>
      </div>

      {/* Botões principais */}
      <Button className="w-full">Run</Button>
      <Button className="w-full" variant="outline" onClick={() => changeDicomFile(null)}>
        Choose Image
      </Button>
    </aside>
  );
};

export default ParametersSelector;
