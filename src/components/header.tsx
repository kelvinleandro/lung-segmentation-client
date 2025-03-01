import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Sun, Moon } from "lucide-react";
import useLanguage from "@/hooks/use-language";
import { Separator } from "./ui/separator";
import useTheme from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const Header = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const { currentColorScheme, toggleColorScheme, theme } = useTheme();
  const { text } = useLanguage();

  return (
    <header
      className="py-3 px-28 flex items-center justify-between"
      style={{
        backgroundColor: theme.layoutBackground,
        color: theme.layoutText,
      }}
    >
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 h-full cursor-pointer"
      >
        <img src="/images/segmentation-logo.png" alt="Logo" className="h-12" />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-[1.5rem] border-1"
          style={{ borderColor: theme.text }}
        />
        <p className="font-bold font-dm-sans text-lg">{text.projectTitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-1 items-center">
          <Sun className="h-5 w-5" />
          <Switch
            checked={currentColorScheme === "dark"}
            onClick={toggleColorScheme}
            className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white cursor-pointer"
          />
          <Moon className="h-5 w-5" />
        </div>

        <Button
          onClick={toggleLanguage}
          variant="outline"
          className={cn(
            "bg-transparent hover:bg-white/20 border-0 font-poppins font-medium cursor-pointer",
            currentColorScheme === "dark"
              ? "hover:text-white"
              : "hover:text-black"
          )}
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
