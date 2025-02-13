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
};

const DICOMViewer = ({
  imageData,
  contours = null,
  drawable = true,
  tintColor = "#ff0000",
  lineWidth = 2,
  zoom = 1,
  clearRef,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const isPanning = useRef(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const lastTouchDistance = useRef<number | null>(null);

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
    const handleContextMenu = (event: MouseEvent) => {
      if (isPanning.current) {
        event.preventDefault(); // Prevent right-click menu from appearing
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

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
    const getCanvasCoordinates = (event: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      const clientY =
        "touches" in event ? event.touches[0].clientY : event.clientY;

      const x = (clientX - rect.left - panOffset.x) / zoom;
      const y = (clientY - rect.top - panOffset.y) / zoom;
      return { x, y };
    };

    // Start drawing
    const startDrawing = (event: MouseEvent | TouchEvent) => {
      if (!imageSrc || !drawable) return;

      // Only draw if the left mouse button is pressed and panning is not active
      if ("buttons" in event && event.buttons === 1 && !isPanning.current) {
        isDrawing.current = true;
        const { x, y } = getCanvasCoordinates(event);
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    };

    // Draw
    const draw = (event: MouseEvent | TouchEvent) => {
      if (!isDrawing.current || !imageSrc || !drawable || isPanning.current)
        return;
      const { x, y } = getCanvasCoordinates(event);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    // Stop drawing
    const stopDrawing = () => {
      isDrawing.current = false;
      ctx.closePath();
    };

    // Start panning (mouse wheel click or two-finger touch)
    const startPanning = (event: MouseEvent | TouchEvent) => {
      if (zoom <= 1) return; // Only pan if zoom > 1

      if ("buttons" in event && event.buttons === 2) {
        // Right mouse button for panning
        isPanning.current = true;
        event.preventDefault(); // Prevents context menu on right-click
      } else if ("touches" in event && event.touches.length === 2) {
        // Two-finger touch for panning
        isPanning.current = true;
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        lastTouchDistance.current = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
      }
    };

    // Pan (move image/canvas)
    const pan = (event: MouseEvent | TouchEvent) => {
      if (!isPanning.current || zoom <= 1 || isDrawing.current) return;

      if ("movementX" in event) {
        // Mouse right-click + drag
        setPanOffset((prev) => ({
          x: prev.x + event.movementX,
          y: prev.y + event.movementY,
        }));
      } else if ("touches" in event && event.touches.length === 2) {
        // Two-finger touch pan
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        if (lastTouchDistance.current !== null) {
          const deltaX =
            (touch1.clientX + touch2.clientX) / 2 - event.touches[0].clientX;
          const deltaY =
            (touch1.clientY + touch2.clientY) / 2 - event.touches[0].clientY;
          setPanOffset((prev) => ({
            x: prev.x - deltaX,
            y: prev.y - deltaY,
          }));
        }

        lastTouchDistance.current = currentDistance;
      }
    };

    // Stop panning
    const stopPanning = () => {
      isPanning.current = false;
      lastTouchDistance.current = null;

      // Ensure the image stays within bounds after panning
      const container = canvasRef.current?.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (!canvasRect) return;

      setPanOffset((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (canvasRect.left > containerRect.left) {
          newX -= canvasRect.left - containerRect.left;
        }
        if (canvasRect.top > containerRect.top) {
          newY -= canvasRect.top - containerRect.top;
        }
        if (canvasRect.right < containerRect.right) {
          newX += containerRect.right - canvasRect.right;
        }
        if (canvasRect.bottom < containerRect.bottom) {
          newY += containerRect.bottom - canvasRect.bottom;
        }

        return { x: newX, y: newY };
      });
    };

    // Add event listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
    canvas.addEventListener("mousedown", startPanning);
    canvas.addEventListener("mousemove", pan);
    canvas.addEventListener("mouseup", stopPanning);
    canvas.addEventListener("mouseover", stopPanning);
    canvas.addEventListener("touchstart", startPanning);
    canvas.addEventListener("touchmove", pan);
    canvas.addEventListener("touchend", stopPanning);

    return () => {
      // Clean up event listeners
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
      canvas.removeEventListener("mousedown", startPanning);
      canvas.removeEventListener("mousemove", pan);
      canvas.removeEventListener("mouseup", stopPanning);
      canvas.removeEventListener("mouseover", stopPanning);
      canvas.removeEventListener("touchstart", startPanning);
      canvas.removeEventListener("touchmove", pan);
      canvas.removeEventListener("touchend", stopPanning);
    };
  }, [imageSrc, tintColor, lineWidth, drawable, zoom, panOffset]);

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
