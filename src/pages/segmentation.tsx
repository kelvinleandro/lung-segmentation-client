import { InfoIcon, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PageLayout from "@/components/page-layout";
import ParametersSelector from "@/components/parameters-selector";
import ResultsSection from "@/components/results-section";
import DensityScaleSection from "@/components/density-scale-section";
import SelectionSection from "@/components/selection-section";
import { ApplicationMode } from "@/types/parameters";
import useTheme from "@/hooks/use-theme";

const SegmentationPage = () => {
  const mode: ApplicationMode = "segmentation";
  const { currentColorScheme } = useTheme();

  return (
    <PageLayout>
      <main
        className={cn(
          "flex w-full flex-1",
          currentColorScheme == "dark"
            ? "bg-[#001d3d] text-white"
            : "bg-white text-black"
        )}
      >
        <div className="flex-2">
          <ParametersSelector />
        </div>
        <div
          className={cn(
            "flex-12 border-l-2",
            currentColorScheme === "dark" ? "border-white" : "border-black"
          )}
        >
          {mode === "segmentation" ? (
            <Tabs defaultValue="results" className="w-full h-full">
              <TabsList
                className={cn(
                  "flex pl-8 mt-2 justify-start bg-transparent gap-6 border-b-2 w-full rounded-none relative",
                  currentColorScheme === "dark"
                    ? "border-white"
                    : "border-black"
                )}
              >
                {/* <TabsList className="flex overflow-hidden border border-black mt-1 ml-1"> */}
                <TabsTrigger
                  value="results"
                  className={cn(
                    "-translate-y-0.5 text-lg rounded-t-lg transition-all duration-300 ease-in-out border-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-4",
                    currentColorScheme === "dark"
                      ? "data-[state=active]:text-white data-[state=active]:border-white data-[state=active]:border-b-[#001d3d]  border-gray-600 border-b-0"
                      : "data-[state=active]:text-black  data-[state=active]:border-black data-[state=active]:border-b-white  border-gray-600 border-b-0"
                  )}
                  // className={cn(
                  //   "bg-background text-black text-lg",
                  //   currentColorScheme === "dark"
                  //     ? "data-[state=active]:text-white data-[state=active]:bg-black hover:bg-black hover:text-white"
                  //     : "data-[state=active]:text-white data-[state=active]:bg-blue-800 hover:bg-blue-800 hover:text-white"
                  // )}
                >
                  <ImageIcon />
                  <p>Resultados</p>
                </TabsTrigger>
                <TabsTrigger
                  value="density"
                  className={cn(
                    "-translate-y-0.5 text-lg rounded-t-lg transition-all duration-300 ease-in-out border-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-4",
                    currentColorScheme === "dark"
                      ? "data-[state=active]:text-white data-[state=active]:border-white data-[state=active]:border-b-[#001d3d]  border-gray-600 border-b-0"
                      : "data-[state=active]:text-black  data-[state=active]:border-black data-[state=active]:border-b-white border-gray-600 border-b-0"
                  )}
                  // className={cn(
                  //   "bg-background text-black text-lg",
                  //   currentColorScheme === "dark"
                  //     ? "data-[state=active]:text-white data-[state=active]:bg-black hover:bg-black hover:text-white"
                  //     : "data-[state=active]:text-white data-[state=active]:bg-blue-800 hover:bg-blue-800 hover:text-white"
                  // )}
                >
                  <InfoIcon />
                  <p>Escala de Densidades</p>
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
