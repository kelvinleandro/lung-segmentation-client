import { InfoIcon, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PageLayout from "@/components/page-layout";
import ParametersSelector from "@/components/parameters-selector";
import ResultsSection from "@/components/results-section";
import DensityScaleSection from "@/components/density-scale-section";
import SelectionSection from "@/components/selection-section";
import useTheme from "@/hooks/use-theme";
import useLanguage from "@/hooks/use-language";
import { useParameters } from "@/hooks/use-parameters";

const SegmentationPage = () => {
  const { mode } = useParameters();
  const { currentColorScheme, theme } = useTheme();
  const { text } = useLanguage();

  return (
    <PageLayout>
      <main
        className="flex w-full flex-1"
        style={{
          backgroundColor: theme.background,
          color: theme.text,
        }}
      >
        <div className="w-[18%]">
          <ParametersSelector />
        </div>
        <div className="w-[82%] border-l-2" style={{ borderColor: theme.text }}>
          {mode === "segmentation" ? (
            <Tabs defaultValue="results" className="w-full h-full">
              <TabsList
                className="flex pl-8 mt-2 justify-start bg-transparent gap-6 border-b-2 w-full rounded-none relative"
                style={{ borderColor: theme.text }}
              >
                <TabsTrigger
                  value="results"
                  className={cn(
                    "cursor-pointer -translate-y-0.5 text-lg rounded-t-lg transition-all duration-300 ease-in-out border-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-4",
                    currentColorScheme === "dark"
                      ? "data-[state=active]:text-white data-[state=active]:border-white data-[state=active]:border-b-[#001d3d]  border-gray-600 border-b-0"
                      : "data-[state=active]:text-black  data-[state=active]:border-black data-[state=active]:border-b-white  border-gray-600 border-b-0"
                  )}
                >
                  <ImageIcon />
                  <p>{text.menuResults}</p>
                </TabsTrigger>
                <TabsTrigger
                  value="density"
                  className={cn(
                    "cursor-pointer -translate-y-0.5 text-lg rounded-t-lg transition-all duration-300 ease-in-out border-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-4",
                    currentColorScheme === "dark"
                      ? "data-[state=active]:text-white data-[state=active]:border-white data-[state=active]:border-b-[#001d3d]  border-gray-600 border-b-0"
                      : "data-[state=active]:text-black  data-[state=active]:border-black data-[state=active]:border-b-white border-gray-600 border-b-0"
                  )}
                >
                  <InfoIcon />
                  <p>{text.menuDensityScale}</p>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="results">
                <ResultsSection />
              </TabsContent>
              <TabsContent value="density">
                <DensityScaleSection />
              </TabsContent>
            </Tabs>
          ) : (
            <SelectionSection />
          )}
        </div>
      </main>
    </PageLayout>
  );
};

export default SegmentationPage;
