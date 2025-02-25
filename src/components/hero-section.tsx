import { useNavigate } from "react-router-dom";
import HeroSlider from "./ui/hero-slider"; 
import useTheme from "@/hooks/use-theme";
import { selectFile } from "@/utils/file";
import { useParameters } from "@/hooks/use-parameters";

const slides = [
  "/images/pulmao-b.png",
  "/images/pulmaob.jpg"
];

const HeroSection = () => {
  const { currentColorScheme } = useTheme();
  const navigate = useNavigate();
  const parameters = useParameters();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = selectFile(event);
      if (!file) return;
      parameters.changeDicomFile(file);
      navigate("/segmentation");
    } catch (error) {
      console.error("Deu ruim.");
    }
  };

  return (
    <section className="flex items-center justify-between mx-auto w-5/6 text-center py-16 flex-grow">
      <div className="flex justify-between items-center w-full px-12">
        <div className="flex flex-col items-center gap-5 ">
          <div className={`"flex flex-col text-[var(--foreground)] max-w-2xl ${currentColorScheme === "dark" ? "dark" : ""}`}>
            <h1 className={`text-start font-extrabold text-5xl  ${currentColorScheme === "dark" ? "dark" : ""}`}>Segmentação de Pulmões em Imagens de TC</h1>
            <p className="text-justify font-semibold mt-4">Segmentação automática de pulmões em imagens de tomografia computadorizada (TC) utilizando o Algoritmo de Contornos Ativos Crisp Adaptativo 2D. Nosso sistema identifica e otimiza os contornos pulmonares por meio de cálculos de energia interna e externa, garantindo precisão na detecção e eficiência no processamento.</p>
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
    </section>
  );
};

export default HeroSection;
