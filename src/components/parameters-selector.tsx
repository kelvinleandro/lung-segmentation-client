import useTheme from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const ParametersSelector = () => {
  const { currentColorScheme } = useTheme();
  return (
    <aside
      className={cn(
        "h-full w-full",
        currentColorScheme == "dark"
          ? "bg-[#001d3d] text-white"
          : "bg-white text-black"
      )}
    >
      Parameters Selector
    </aside>
  );
};

export default ParametersSelector;
