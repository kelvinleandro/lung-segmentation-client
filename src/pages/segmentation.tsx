import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PageLayout from "@/components/page-layout";
import ParametersSelector from "@/components/parameters-selector";
import ResultsSection from "@/components/results-section";
import DensityScaleSection from "@/components/density-scale-section";
import SelectionSection from "@/components/selection-section";
import { ApplicationMode } from "@/types/parameters";

const SegmentationPage = () => {
  const mode: ApplicationMode = "segmentation";

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
                  className="data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 hover:bg-black/10 border-b-2 border-black text-lg"
                  // className="data-[state=active]:text-white data-[state=active]:bg-black bg-white text-black hover:bg-black hover:text-white text-lg"
                >
                  Resultados
                </TabsTrigger>
                <TabsTrigger
                  value="density"
                  className="data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 hover:bg-black/10 border-b-2 border-black text-lg"
                  // className="data-[state=active]:text-white data-[state=active]:bg-black bg-white text-black hover:bg-black hover:text-white text-lg"
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
