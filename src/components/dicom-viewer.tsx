import { useRef, useEffect, useMemo, useState } from "react";
import { Contours, ImageData } from "@/types/image";
import { drawImageWithContours } from "@/utils/image";

type Props = {
  imageData: ImageData | null;
  contours?: Contours | null;
  drawable?: boolean;
  tintColor?: string;
  lineWidth?: number;
  zoom?: number;
  clearRef?: React.RefObject<HTMLButtonElement>;
  isPanning: boolean;
  isDrawing: boolean;
};

const DICOMViewer = ({
  imageData,
  contours = null,
  drawable = true,
  tintColor = "#ff0000",
  lineWidth = 2,
  zoom = 1,
  clearRef,
  isPanning,
  isDrawing,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const lastMousePosition = useRef<{ x: number; y: number } | null>(null);

  const imageSrc = useMemo(() => {
    if (!imageData) return null;
    return drawImageWithContours(imageData, contours);
  }, [imageData, contours]);

  // Reset pan offset when zoom level changes
  useEffect(() => {
    if (zoom == 1) {
      setPanOffset({ x: 0, y: 0 });
    }
  }, [zoom]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set drawing styles
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tintColor;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Convert screen coordinates to canvas coordinates
    const getCanvasCoordinates = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      return {
        x: (event.clientX - rect.left - panOffset.x) / zoom,
        y: (event.clientY - rect.top - panOffset.y) / zoom,
      };
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        if (isDrawing && drawable) {
          const { x, y } = getCanvasCoordinates(event);
          ctx.beginPath();
          ctx.moveTo(x, y);
        } else if (isPanning && zoom > 1) {
          lastMousePosition.current = { x: event.clientX, y: event.clientY };
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (event.buttons !== 1) return;

      if (isDrawing && drawable) {
        const { x, y } = getCanvasCoordinates(event);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (isPanning && lastMousePosition.current && zoom > 1) {
        const deltaX = event.clientX - lastMousePosition.current.x;
        const deltaY = event.clientY - lastMousePosition.current.y;
        setPanOffset((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
        lastMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseUp = () => {
      ctx.closePath();
      lastMousePosition.current = null;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [
    imageSrc,
    tintColor,
    lineWidth,
    drawable,
    zoom,
    panOffset,
    isDrawing,
    isPanning,
  ]);

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="relative w-full h-full">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Imagem DICOM"
          // className="w-full h-full transition-transform duration-300 ease-in-out"
          className="absolute top-0 left-0 z-0"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            transformOrigin: "top left",
          }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full" />
      )}
      <canvas
        ref={canvasRef}
        // className="absolute top-0 left-0 w-full h-full z-10 transition-transform duration-300 ease-in-out"
        className="absolute top-0 left-0"
        width={512}
        height={512}
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
          transformOrigin: "top left",
        }}
      />
      <button ref={clearRef} onClick={clearCanvas} className="hidden" />
    </div>
  );
};

export default DICOMViewer;
