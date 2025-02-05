import { Types } from "@cornerstonejs/core";

export interface PixelCoordinate {
  x: number;
  y: number;
}

export interface ImageData {
  pixelData: Types.PixelDataTypedArray;
  width: number;
  height: number;
}
