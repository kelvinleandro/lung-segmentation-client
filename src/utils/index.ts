import { Types } from "@cornerstonejs/core";

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
