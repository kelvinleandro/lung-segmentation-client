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
    </aside>
  );
};

export default ParametersSelector;
