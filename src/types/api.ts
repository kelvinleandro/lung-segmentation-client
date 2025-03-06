import { Contours } from "./image";

export interface ApiResponse {
  todos_contornos: Contours;
  contornos_validos: Contours;
  preprocessed?: string;
}
