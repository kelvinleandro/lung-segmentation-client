import { Separator } from "@/components/ui/separator";
import useLanguage from "@/hooks/use-language";
import useTheme from "@/hooks/use-theme";

const Footer = () => {
  const { theme } = useTheme();
  const { text } = useLanguage();

  return (
    <footer
      className="py-2 px-8 flex items-center justify-between"
      style={{
        backgroundColor: theme.layoutBackground,
        color: theme.layoutText,
      }}
    >
      <div className="flex items-center gap-2 h-full">
        <img src="/images/ufc-crest.png" alt="Logo" className="h-7" />

        <Separator
          orientation="vertical"
          className="mx-4 border-1 data-[orientation=vertical]:h-[1rem]"
          style={{ borderColor: theme.layoutText }}
        />

        <p className="font-bold font-dm-sans text-md">{text.footerCredits}</p>
      </div>
    </footer>
  );
};

export default Footer;
