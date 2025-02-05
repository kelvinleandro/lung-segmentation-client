import { ImageData, PixelCoordinate } from "@/types/image";
import { Types } from "@cornerstonejs/core";

/**
 * Applies windowing to an image represented as a pixel data array.
 * Windowing maps pixel values to a specific range defined by window center and window width.
 * It also normalizes the resulting pixel values to the range [0, 255].
 *
 * @param imageData - The pixel data array of the image to which windowing will be applied.
 * @param windowCenter - The center of the window for intensity mapping.
 * @param windowWidth - The width of the window for intensity mapping.
 * @returns A new array with pixel values normalized to the range [0, 255] after windowing.
 */
export const applyWindowing = (
  imageData: Types.PixelDataTypedArray,
  windowCenter: number,
  windowWidth: number
) => {
  const imgMin = windowCenter - windowWidth / 2;
  const imgMax = windowCenter + windowWidth / 2;

  // Clip values to the window range
  const clippedData = imageData.map((val) =>
    Math.min(Math.max(val, imgMin), imgMax)
  );

  // Normalize to [0, 255]
  return clippedData.map((val) => ((val - imgMin) / (imgMax - imgMin)) * 255);
};

/**
 * Draws an image from pixel data onto a canvas and optionally overlays red points on the image.
 * The points represent coordinates that can be used to highlight specific areas.
 * The overlay can be customized with an opacity level.
 *
 * @param param0 - An object containing the image data and its dimensions:
 *   - `pixelData` - An array of pixel data representing a grayscale image. Each pixel value is used for the R, G, and B channels, with full opacity (255) applied.
 *   - `width` - The width of the image (in pixels).
 *   - `height` - The height of the image (in pixels).
 * @param points - Optional array of pixel coordinates ({ x, y }) to be drawn as red points on the image. If not provided, no points will be overlaid.
 * @param fillOpacity - Opacity level for the segmentation overlay (points). A value between 0 (transparent) and 1 (fully opaque). Defaults to 0.
 * @returns A data URL string representing the image with or without the overlay, or `null` if there is an error creating the image.
 */
export const drawImageWithOverlay = (
  { pixelData, width, height }: ImageData,
  points: PixelCoordinate[] | null = null,
  fillOpacity: number = 0
) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const image = ctx.createImageData(width, height);
    for (let i = 0; i < pixelData.length; i++) {
      image.data[i * 4] = pixelData[i]; // R
      image.data[i * 4 + 1] = pixelData[i]; // G
      image.data[i * 4 + 2] = pixelData[i]; // B
      image.data[i * 4 + 3] = 255; // Alpha
    }
    ctx.putImageData(image, 0, 0);

    if (points && points.length > 1) {
      ctx.strokeStyle = `rgba(255, 0, 0, 1)`;
      ctx.fillStyle = `rgba(255, 0, 0, ${fillOpacity})`; // Set a lighter color for filling
      ctx.lineWidth = 2; // Adjust the thickness of the contour line

      // Begin the path
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      // Connect the points with lines
      points.forEach(({ x, y }) => {
        ctx.lineTo(x, y);
      });

      // Close the contour
      ctx.closePath();

      // Fill the polygon (the area inside the connected points)
      ctx.fill();

      // Draw the line
      ctx.stroke();
    }
    return canvas.toDataURL();
  }

  return null;
};

/**
 * Triggers a download of an image from a given source URL.
 * The image is downloaded with the specified file name.
 *
 * @param imageSrc - The source URL of the image to be downloaded.
 * @param fileName - The name to be used for the downloaded file, including the file extension (e.g., "image.png").
 * @returns void
 */
export const downloadImage = (imageSrc: string, fileName: string) => {
  if (!imageSrc) return;

  const link = document.createElement("a");
  link.href = imageSrc;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};