import { Separator } from "@/components/ui/separator";
import useTheme from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { currentColorScheme } = useTheme();

  return (
    <footer
      className={cn(
        "py-2 px-8 flex items-center justify-between",
        currentColorScheme === "dark"
          ? "bg-black text-[#fcfcfd]"
          : "bg-[#ee6c4d] text-black"
      )}
    >
      <div className="flex items-center gap-2 h-full">
        <img src="/images/ufc-crest.png" alt="Logo" className="h-7" />

        <Separator
          orientation="vertical"
          className={cn(
            "mx-4 border-1 data-[orientation=vertical]:h-[1rem]",
            currentColorScheme === "dark" ? "border-[#fcfcfd]" : "border-black"
          )}
        />

        <p className="font-bold font-dm-sans text-md">
          TI0147 - Fundamentos de Processamento Digital de Imagens - 2024.2 -
          Paulo Cesar Cortez
        </p>
      </div>
    </footer>
  );
};

export default Footer;
