import useTheme from "@/hooks/use-theme";
import { init as coreInit, imageLoader } from "@cornerstonejs/core";
import {init as dicomImageLoaderInit, wadouri} from "@cornerstonejs/dicom-image-loader";
import { cn } from "@/lib/utils";
import React, { useState} from "react";
import { useParameters } from "@/hooks/use-parameters";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LucideMove, LucidePenTool } from "lucide-react";
import useApi from "@/hooks/use-api";
import DICOMViewer from "@/components/dicom-viewer";
import { ImageData, Contours } from "@/types/image";
import { applyWindowing } from "@/utils/image";
import { ApplicationMode } from "@/types/parameters";
import { ScrollArea } from "@/components/ui/scroll-area";

coreInit();
dicomImageLoaderInit();

const ParametersSelector = () => {
  const { currentColorScheme } = useTheme();
  const { mode, setMode, selectionParameters} = useParameters();

  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [contours, setContours] = useState<Contours | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [color, setColor] = useState("#ff0000");
  const [lineWidth, setLineWidth] = useState(2);
  const [zoom, setZoom] = useState(1);
  const { dicomFile, setDicomFile } = useParameters();
  const { sendFileToServer } = useApi();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("File selected:", file);

    setDicomFile(file);
    setContours(null);

    const imageId = wadouri.fileManager.add(file);
    console.log("Image ID:", imageId);

    try {
      const _image = await imageLoader.loadImage(imageId);
      console.log("Loaded image:", _image);

      const pixelData = _image.getPixelData();
      const normalizedPixelData = applyWindowing(pixelData);

      setImageData({
        pixelData: normalizedPixelData,
        width: _image.width,
        height: _image.height,
      });
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  const handleSendFile = async () => {
    if (!dicomFile) return;

    try {
      setIsSubmitting(true);
      const contours = await sendFileToServer(dicomFile);
      if (contours) {
        setContours(contours);
      }
    } catch (error) {
      console.error("Error sending file:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside
      className={cn(
        "h-full w-full p-4 space-y-4",
        currentColorScheme == "dark"
          ? "bg-[#001d3d] text-white"
          : "bg-white text-black"
      )}>
      <h2 className="text-2xl font-bold">Customising</h2>

      <Tabs value={mode} onValueChange={(value) => setMode(value as ApplicationMode)}>

        {/* Tabs de Segmentação e Seleção */}
        <TabsList className={cn("grid grid-cols-2 mb-2", currentColorScheme == "dark" ? "bg-[#001d3d]" : "bg-white")}>
          <TabsTrigger value="selection" className={cn("w-full rounded-l-lg border-2 border-r-0", mode == "selection" && currentColorScheme == "dark"  ? "bg-white text-black border-white" : "", mode != "selection" && currentColorScheme == "dark"  ? "bg-[#001d3d] text-white border-white" : "", mode == "selection" && currentColorScheme != "dark" ? "bg-black text-white border-black" : "", mode != "selection" && currentColorScheme != "dark"  ? "text-black border-black" : "" )}>Seleção</TabsTrigger>
          <TabsTrigger value="segmentation" className={cn("w-full rounded-r-lg border-2 border-l-0", mode == "segmentation" && currentColorScheme == "dark"  ? "bg-white text-black border-white" : "", mode != "segmentation" && currentColorScheme == "dark"  ? "bg-[#001d3d] text-white border-white" : "", mode == "segmentation" && currentColorScheme != "dark"  ? "bg-black text-white border-black" : "", mode != "segmentation" && currentColorScheme != "dark"  ? "text-black border-black" : "" )}>Segmentação</TabsTrigger>
        </TabsList>

        {/* Segmentação */}
        <TabsContent value="segmentation">

          <ScrollArea className="h-[60vh] mb-2">
            <div className="flex flex-col mb-5">
              <h3 className="font-semibold mb-2">Método de Segmentação</h3>
              <label>
                <input className="mr-2" type="radio" name="segmentationMethod" value="Metodo1" />
                  Método 1
              </label>
              <label>
                <input className="mr-2" type="radio" name="segmentationMethod" value="Metodo2" />
                  Método 2
              </label>
              <label>
                <input className="mr-2" type="radio" name="segmentationMethod" value="Metodo3" />
                  Método 3
              </label>
            </div>

            <div className="mb-5">
              <h3 className="font-semibold mb-2">TEXT INPUT</h3>
              {["Item 1", "Item 2"].map((item, index) => (
                <div key={index} className="mb-3">
                  <label>{item}:</label>
                  <input type="text" placeholder="Text here" className="border p-2 w-full mt-1" />
                </div>
              ))}
            </div>

            <div className="mb-5">
              <h3 className="font-semibold mb-2">CONTRASTE</h3>
              <label>Window Width:</label>
              <input type="range" min="0" max="255" value={selectionParameters.windowWidth} className={cn("w-full mb-3", currentColorScheme == "dark" ? "accent-white" : "accent-black")} />
              <label>Window Center:</label>
              <input type="range" min="0" max="255" value={selectionParameters.windowCenter} className={cn("w-full", currentColorScheme == "dark" ? "accent-white" : "accent-black")} />
            </div>
          </ScrollArea>
          
        </TabsContent>

        {/* Seleção */}
        <TabsContent value="selection">
          <div>
            <DICOMViewer
            imageData={imageData}
            drawable
            zoom={zoom}
            lineWidth={lineWidth}
            tintColor={color}
            isPanning={isPanning}
            isDrawing={isDrawing}
            />
          </div>

          <div>
            <label className="flex items-center gap-2">
            Zoom:
            <input
              type="range"
              min="1"
              max="3"
              step="0.2"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-24"
            />
            {zoom}
            </label>

            <label className="flex items-center gap-2">
            Espessura:
            <input
              type="range"
              min="1"
              max="10"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-24"
            />
            {lineWidth}px
            </label>

            <label className="flex items-center gap-2">
            Cor:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-8 border rounded"
            />
            </label>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Interação</h3>
            <div className="flex space-x-4 mb-3">
              <Button variant={isDrawing ? "default" : "outline"} onClick={() => setIsDrawing(true)} className={cn(isDrawing == true ? "bg-black text-white" : "bg-white text-black")}>
                <LucidePenTool size={16} />
              </Button>
              <Button variant={isDrawing ? "outline" : "default"} onClick={() => setIsDrawing(false)} className={cn(isDrawing == false ? "bg-black text-white" : "bg-white text-black")}>
                <LucideMove size={16} />
              </Button>
            </div>
          </div>
              
        </TabsContent>
      </Tabs>

      {/* Botões principais */}
      <Button className={cn("w-full", currentColorScheme == "dark" ? "bg-white text-black" : "bg-black text-white")} onClick={handleSendFile} disabled={!dicomFile || isSubmitting}>Run</Button>

      <input id="file-upload" type="file" accept=".dcm" onChange={handleFileSelect} className="hidden" />
      <Button onClick={() => document.getElementById('file-upload')?.click()} className={cn("w-full rounded-lg", currentColorScheme == "dark" ? "bg-white text-black" : "bg-black text-white")}>
        Choose Image
      </Button>
    </aside>
  );
};

export default ParametersSelector;
