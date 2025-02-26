import { useNavigate } from "react-router-dom";
import HeroSlider from "./ui/hero-slider"; 
import useTheme from "@/hooks/use-theme";
import { selectFile } from "@/utils/file";
import { useParameters } from "@/hooks/use-parameters";
import { useState } from "react";
import { AlertCircle } from 'react-feather';

const slides = [
  "/images/pulmao-b.png",
  "/images/pulmaob.jpg"
];

const HeroSection = () => {
  const { currentColorScheme } = useTheme();
  const navigate = useNavigate();
  const parameters = useParameters();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = selectFile(event);
      if (!file) return;
      parameters.changeDicomFile(file);
      navigate("/segmentation");
    } catch (error) {
      console.error("Deu ruim.");
      if (error instanceof Error) {  // Atualiza a mensagem de erro
        setDialogOpen(true);  // Abre o diálogo de erro
      }
    }
  };

  return (
    <section className="flex items-center justify-between mx-auto w-5/6 text-center py-16 flex-grow">
      <div className="flex justify-between items-center w-full px-12">
        <div className="flex flex-col items-center gap-5 ">
          <div className={`"flex flex-col text-[var(--foreground)] max-w-2xl ${currentColorScheme === "dark" ? "dark" : ""}`}>
            <h1 className={`text-start font-extrabold text-5xl  ${currentColorScheme === "dark" ? "dark" : ""}`}>Segmentação de Pulmões em Imagens de TC</h1>
            <p className="text-justify text-xl max-w-2xl  font-semibold mt-4">Segmentação automática de pulmões em imagens de tomografia computadorizada (TC) utilizando o Algoritmo de Contornos Ativos Crisp Adaptativo 2D. Nosso sistema identifica e otimiza os contornos pulmonares por meio de cálculos de energia interna e externa, garantindo precisão na detecção e eficiência no processamento.</p>
          </div>
          <button className={`btn-blk ${currentColorScheme === "dark" ? "dark" : ""}`}
            onClick={() => document.getElementById("dicom-upload")?.click()}>
            Selecionar
          </button>
        </div>
        <HeroSlider>
          {slides.map((s, index) => (
            <img key={index} src={s} className="w-full h-full object-cover"/>
          ))}
        </HeroSlider>
      </div>
      
      <input
        id="dicom-upload"
        type="file"
        accept=".dcm"
        className="hidden"
        onChange={handleFileSelect}
      />

      {dialogOpen && (
        <div className="fixed px-6 inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm">
          <div className={`flex flex-col items-center rounded-lg shadow-lg max-w-sm w-full py-4 px-4 bg-[var(--background)] ${currentColorScheme === "dark" ? "dark" : ""}`}>
            <AlertCircle className={`" text-[var(--foreground)] ${currentColorScheme === "dark" ? "text-white" : "text-black"}`} size={100}/>
            <h2 className={` text-[var(--foreground)] font-bold text-2xl flex-wrap text-center mt-3 ${currentColorScheme === "dark" ? "dark" : ""}`}>Formato de imagem não suportado</h2>
            <p className={` text-sm mb-7 text-[var(--foreground)] mt-1 ${currentColorScheme === "dark" ? "dark" : ""}`}>Faça o upload de uma imagem no formato DICOM.</p> 
            <button
              onClick={() => setDialogOpen(false)}
              className={`"mt-6 bg-[var(--foreground)] font-semibold text-[var(--background)] py-2 px-4 rounded-xl ${currentColorScheme === "dark" ? "dark" : ""}`}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
