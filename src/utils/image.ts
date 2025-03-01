import { ImageData, Contours, ClassDistribution } from "@/types/image";
import { Types } from "@cornerstonejs/core";
import { COLORS } from "@/constants/colors";

/**
 * Applies windowing to an image represented as a pixel data array.
 * Windowing maps pixel values to a specific range defined by `imgMin` and `imgMax`.
 * It also normalizes the resulting pixel values to the range [0, 255].
 *
 * @param imageData - The pixel data array of the image to which windowing will be applied.
 * @param imgMin - The minimum intensity value for clipping (default: -1000).
 * @param imgMax - The maximum intensity value for clipping (default: 2000).
 * @returns A new array with pixel values normalized to the range [0, 255] after windowing.
 */
export const applyWindowing = (
  imageData: Types.PixelDataTypedArray,
  imgMin: number = -1000,
  imgMax: number = 2000
): Types.PixelDataTypedArray => {
  // Clip values to the window range
  const clippedData = imageData.map((val) =>
    Math.min(Math.max(val, imgMin), imgMax)
  );

  // Normalize to [0, 255]
  return clippedData.map((val) => ((val - imgMin) / (imgMax - imgMin)) * 255);
};

/**
 * Draws an image from pixel data and overlays contours if provided.
 *
 * @param imageData - An object containing pixel data, width, and height of the image.
 * @param contours - An optional object where each key represents a contour name,
 *                   and the value is an array of pixel coordinates [x, y].
 * @returns A data URL representing the image with contours drawn or `null` if rendering fails.
 */
export const drawImageWithContours = (
  { pixelData, width, height }: ImageData,
  contours: Contours | null = null
): string | null => {
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
    ctx.globalCompositeOperation = "source-over";

    if (contours) {
      ctx.strokeStyle = `rgba(255, 0, 0, 1)`;
      ctx.lineWidth = 2; // Adjust the thickness of the contour line

      Object.values(contours).forEach((points) => {
        if (points.length > 0) {
          ctx.beginPath();
          ctx.moveTo(points[0][0], points[0][1]);

          points.forEach(([x, y]) => {
            ctx.lineTo(x, y);
          });

          ctx.closePath();
          ctx.stroke();
        }
      });
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
export const downloadImage = (imageSrc: string, fileName: string): void => {
  if (!imageSrc) return;

  const link = document.createElement("a");
  link.href = imageSrc;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Saves contour points as a CSV file, including the contour name and (x, y) coordinates.
 *
 * @param contours - An object where each key represents a contour name,
 *                   and the value is an array of pixel coordinates [x, y].
 * @param fileName - The name of the CSV file to be saved.
 */
export const saveContoursAsCSV = (
  contours: Contours | null = null,
  fileName: string
): void => {
  if (!contours || Object.keys(contours).length === 0) return;

  // Create CSV header
  const csvRows: string[] = ["contour_name,x,y"];

  // Iterate through contours and format data
  Object.entries(contours).forEach(([contourName, points]) => {
    points.forEach(([x, y]) => {
      csvRows.push(`${contourName},${x},${y}`);
    });
  });

  // Convert to CSV format
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a downloadable link
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;

  // Trigger the download
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Processes image pixel data by clipping values to the range [-1000, 2000]
 * and calculating the percentage of pixels in each predefined class.
 *
 * @param pixelData - An array of pixel intensity values representing an image.
 * @returns An object with the percentage distribution of pixel values in each class.
 */
export const computeClassDistribution = (
  pixelData: Types.PixelDataTypedArray
): ClassDistribution => {
  const clippedData = pixelData.map((val) =>
    Math.min(Math.max(val, -1000), 2000)
  );

  const classCounts: ClassDistribution = {
    hyperaerated: 0, // -1000 to -950
    normallyAerated: 0, // -950 to -500
    poorlyAerated: 0, // -500 to -100
    nonAerated: 0, // -100 to 100
    bone: 0, // 600 to 2000
  };

  clippedData.forEach((val) => {
    if (val >= -1000 && val < -950) classCounts.hyperaerated++;
    else if (val >= -950 && val < -500) classCounts.normallyAerated++;
    else if (val >= -500 && val < -100) classCounts.poorlyAerated++;
    else if (val >= -100 && val <= 100) classCounts.nonAerated++;
    else if (val >= 600 && val <= 2000) classCounts.bone++;
  });

  const totalPixels = clippedData.length;

  // Convert counts to percentages
  return {
    hyperaerated: (classCounts.hyperaerated / totalPixels) * 100,
    normallyAerated: (classCounts.normallyAerated / totalPixels) * 100,
    poorlyAerated: (classCounts.poorlyAerated / totalPixels) * 100,
    nonAerated: (classCounts.nonAerated / totalPixels) * 100,
    bone: (classCounts.bone / totalPixels) * 100,
  };
};

/**
 * Converts pixel intensity values to a colorized image based on predefined HU ranges.
 * @param {Types.PixelDataTypedArray} pixelData - The original, unnormalized pixel data.
 * @param {number} width - The width of the image.
 * @param {number} height - The height of the image.
 * @returns {string | null} A data URL representing the colorized image, or null if rendering fails.
 */
export const colorizePixelData = (
  pixelData: Types.PixelDataTypedArray,
  width: number,
  height: number
): string | null => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  const image = ctx.createImageData(width, height);

  for (let i = 0; i < pixelData.length; i++) {
    const val = Math.min(Math.max(pixelData[i], -1000), 2000);
    let color: string;

    if (val >= -1000 && val < -950)
      color = COLORS.light.hyperHU; // Hyperaerated
    else if (val >= -950 && val < -500)
      color = COLORS.light.normalHU; // Normally aerated
    else if (val >= -500 && val < -100)
      color = COLORS.light.badHU; // Poorly aerated
    else if (val >= -100 && val <= 100)
      color = COLORS.light.noHU; // Non-aerated
    else if (val >= 600 && val <= 2000) color = COLORS.light.boneHU; // Bone
    else color = "#000000"; // Default to black for out-of-range values

    const [r, g, b] = hexToRgb(color);
    image.data[i * 4] = r;
    image.data[i * 4 + 1] = g;
    image.data[i * 4 + 2] = b;
    image.data[i * 4 + 3] = 255; // Alpha channel
  }

  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL();
};

/**
 * Converts a hex color string to an RGB array.
 * @param {string} hex - The hex color string.
 * @returns {[number, number, number]} An array containing RGB values.
 */
const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};
