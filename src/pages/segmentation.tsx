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
              <TabsList className="flex border-b">
                <TabsTrigger value="results">Resultados</TabsTrigger>
                <TabsTrigger value="density">Escala de Densidades</TabsTrigger>
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
