import { useRef, useEffect, useMemo, useState } from "react";
import { ImageData, PixelCoordinate } from "@/types/image";
import { drawImageWithOverlay } from "@/utils/image";

type Props = {
  imageData: ImageData | null;
  segmentationPoints?: PixelCoordinate[] | null;
  fillOpacity?: number;
  drawable?: boolean;
};

const DICOMViewer = ({
  imageData,
  segmentationPoints = null,
  fillOpacity = 0,
  drawable = true,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const [color, setColor] = useState("#ff0000"); // Cor padrão: vermelho
  const [lineWidth, setLineWidth] = useState(2); // Espessura padrão

  const imageSrc = useMemo(() => {
    if (!imageData) return null;
    return drawImageWithOverlay(imageData, segmentationPoints, fillOpacity);
  }, [imageData, segmentationPoints, fillOpacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const startDrawing = (event: MouseEvent) => {
      if (!imageSrc || !drawable) return;
      isDrawing.current = true;
      ctx.beginPath();
      ctx.moveTo(event.offsetX, event.offsetY);
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing.current || !imageSrc || !drawable) return;
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
    };

    const stopDrawing = () => {
      isDrawing.current = false;
      ctx.closePath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, [imageSrc, color, lineWidth, drawable]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <div className="relative w-full h-full">
        {imageSrc ? (
          <img src={imageSrc} alt="Imagem DICOM" className="w-full h-full" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 w-full h-full" />
        )}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full z-10"
          width={512}
          height={512}
        />
      </div>

      <div className={`flex gap-4 items-center ${drawable ? "" : "hidden"}`}>
        <label className="flex items-center gap-2">
          Cor:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-8 border rounded"
          />
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
      </div>
      <button
        onClick={clearCanvas}
        className={`py-1 px-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 ${
          drawable ? "" : "hidden"
        }`}
      >
        Apagar Rabisco
      </button>
    </div>
  );
};

export default DICOMViewer;
