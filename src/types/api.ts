import { Contours } from "./image";

export interface ApiResponse {
  todos_os_contornos: Contours;
  contornos_validos: Contours;
  imagem_pre_processada?: string;
}
