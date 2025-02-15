import { Types } from "@cornerstonejs/core";

export type PixelCoordinate = [number, number];

export interface Contours {
  [key: string]: PixelCoordinate[];
}

export interface ImageData {
  pixelData: Types.PixelDataTypedArray;
  width: number;
  height: number;
}

export interface ClassDistribution {
  hyperaerated: number;
  normallyAerated: number;
  poorlyAerated: number;
  nonAerated: number;
  bone: number;
}
