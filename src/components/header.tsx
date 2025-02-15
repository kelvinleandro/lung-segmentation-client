import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import useLanguage from "@/hooks/use-language";
import { Separator } from "./ui/separator";

const Header = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <header className="bg-black text-white py-2 px-8 flex items-center justify-between">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 h-full cursor-pointer"
      >
        <img src="/images/segmentation-logo.png" alt="Logo" className="h-10" />
        <Separator orientation="vertical" className="h-full border-1" />
        <p className="font-bold font-dm-sans text-lg">Lorem Ipsum</p>
      </div>

      <div className="flex items-center ">
        <Button
          onClick={toggleLanguage}
          variant="outline"
          className="bg-black hover:bg-white/20 hover:text-white border-0"
        >
          <img
            src={
              currentLanguage === "pt"
                ? "/images/brazil-flag.png"
                : "/images/us-flag.png"
            }
            alt={currentLanguage === "pt" ? "Brazil Flag" : "US Flag"}
            className="h-4 w-6"
          />
          {currentLanguage === "pt" ? "PT-BR" : "EN-US"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
