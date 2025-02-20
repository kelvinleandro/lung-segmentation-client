import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PageLayout from "@/components/page-layout";
import ParametersSelector from "@/components/parameters-selector";
import ResultsSection from "@/components/results-section";
import DensityScaleSection from "@/components/density-scale-section";
import SelectionSection from "@/components/selection-section";
import { ApplicationMode } from "@/types/parameters";
import useTheme from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const SegmentationPage = () => {
  const mode: ApplicationMode = "segmentation";
  const { currentColorScheme } = useTheme();

  return (
    <PageLayout>
      <main className="flex w-full flex-1">
        <ParametersSelector />
        <div className="w-full">
          {mode === "segmentation" ? (
            <Tabs defaultValue="results" className="w-full h-full">
              <TabsList className="flex mt-1 ml-1">
                {/* <TabsList className="flex overflow-hidden border border-black mt-1 ml-1"> */}
                <TabsTrigger
                  value="results"
                  className={cn(
                    "data-[state=active]:border-b-2 hover:bg-black/10 border-b-2 border-black text-lg",
                    currentColorScheme === "dark"
                      ? "data-[state=active]:text-[#ff0000] data-[state=active]:border-[#ff0000]"
                      : "data-[state=active]:text-[#0000ff] data-[state=active]:border-[#0000ff]"
                  )}
                  // className={cn(
                  //   "bg-background text-black text-lg",
                  //   currentColorScheme === "dark"
                  //     ? "data-[state=active]:text-white data-[state=active]:bg-black hover:bg-black hover:text-white"
                  //     : "data-[state=active]:text-white data-[state=active]:bg-blue-800 hover:bg-blue-800 hover:text-white"
                  // )}
                >
                  Resultados
                </TabsTrigger>
                <TabsTrigger
                  value="density"
                  className={cn(
                    "data-[state=active]:border-b-2 hover:bg-black/10 border-b-2 border-black text-lg",
                    currentColorScheme === "dark"
                      ? "data-[state=active]:text-[#ff0000] data-[state=active]:border-[#ff0000]"
                      : "data-[state=active]:text-[#0000ff] data-[state=active]:border-[#0000ff]"
                  )}
                  // className={cn(
                  //   "bg-background text-black text-lg",
                  //   currentColorScheme === "dark"
                  //     ? "data-[state=active]:text-white data-[state=active]:bg-black hover:bg-black hover:text-white"
                  //     : "data-[state=active]:text-white data-[state=active]:bg-blue-800 hover:bg-blue-800 hover:text-white"
                  // )}
                >
                  Escala de Densidades
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
