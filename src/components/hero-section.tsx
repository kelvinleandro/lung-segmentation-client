import { useNavigate } from "react-router-dom";
import HeroSlider from "./ui/hero-slider";
import useTheme from "@/hooks/use-theme";
import { selectFile } from "@/utils/file";
import { useParameters } from "@/hooks/use-parameters";
import { useState } from "react";
import { AlertCircle } from "react-feather";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useLanguage from "@/hooks/use-language";

const slides = ["/images/pulmao-b.png", "/images/pulmaob.jpg"];

const HeroSection = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const parameters = useParameters();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { text } = useLanguage();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = selectFile(event);
      console.log("File selected:", file);
      if (!file) return;
      parameters.changeDicomFile(file);
      navigate("/segmentation");
    } catch (error) {
      console.error("Deu ruim.", error);
      if (error instanceof Error) {
        setDialogOpen(true);
      }
    }
  };

  const handleDialogChange = () => {
    setDialogOpen((prev) => !prev);
  };

  return (
    <section
      className="flex items-center justify-between mx-auto w-5/6 text-center py-16 flex-grow"
      style={{ color: theme.text }}
    >
      <div className="flex justify-between items-center w-full px-12">
        <div className="flex flex-col items-start gap-5 ">
          <div className="flex flex-col max-w-2xl">
            <h1 className="text-start font-extrabold text-5xl font-dm-sans">
              {text.heroTitle}
            </h1>
            <p className="text-justify text-xl max-w-2xl font-normal mt-4 font-poppins">
              {text.heroDescription}
            </p>
          </div>
          <button
            className="font-dm-sans btn-blk font-semibold"
            style={{
              backgroundColor: theme.buttonBackground,
              color: theme.buttonText,
            }}
            onClick={() => document.getElementById("dicom-upload")?.click()}
          >
            {text.uploadButton}
          </button>
          <p className="text-sm -mt-1 font-poppins">*{text.uploadNote}</p>
        </div>
        <HeroSlider>
          {slides.map((s, index) => (
            <img key={index} src={s} className="w-full h-full object-cover" />
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

      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent
          className="aria-describedby=[undefined] flex flex-col items-center rounded-lg shadow-lg max-w-sm w-full py-4 px-4"
          style={{ backgroundColor: theme.background, color: theme.text }}
        >
          <AlertCircle size={100} />
          <h2 className="font-bold text-2xl flex-wrap text-center mt-3">
            {text.imageErrorText}
          </h2>
          <p className="text-sm mb-5 mt-1">{text.imageErrorDescription}</p>
          <button
            onClick={() => setDialogOpen(false)}
            className="font-semibold py-2 px-4 rounded-xl cursor-pointer"
            style={{
              backgroundColor: theme.buttonBackground,
              color: theme.buttonText,
            }}
          >
            {text.closeButton}
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
