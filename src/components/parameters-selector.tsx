import useTheme from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useParameters } from "@/hooks/use-parameters";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LucideMove, LucidePenTool } from "lucide-react";
import useApi from "@/hooks/use-api";
import { ApplicationMode, SegmentationType } from "@/types/parameters";
import { selectFile } from "@/utils/file";
import useLanguage from "@/hooks/use-language";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PreprocessingForm from "./forms/preprocessing-form";
import SegmentationForm from "./forms/segmentation-form";
import PostprocessingForm from "./forms/postprocessing-form";

const ParametersSelector = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { currentColorScheme, theme } = useTheme();
  const { text } = useLanguage();
  const {
    mode,
    setMode,
    selectionParameters,
    setSelectionParameters,
    changeDicomFile,
    dicomFile,
    preprocessingParameters,
    setPreprocessingParameters,
    postprocessingParameters,
    setPostprocessingParameters,
    segmentationParameters,
    dispatchSegmentation,
    resetSegmentationParameters,
    setApiResponse,
    clearRef,
  } = useParameters();
  const { sendFileToServer } = useApi();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = selectFile(event);
      console.log("File selected:", file);
      if (!file) return;
      changeDicomFile(file);
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleSendFile = async () => {
    if (!dicomFile) return;

    try {
      setIsSubmitting(true);
      const response = await sendFileToServer(
        dicomFile,
        preprocessingParameters,
        segmentationParameters,
        postprocessingParameters
      );
      if (response) {
        setApiResponse(response);
      }
    } catch (error) {
      console.error("Error sending file:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside
      className="h-full w-full p-4 space-y-4 font-poppins"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <h2 className="text-lg 2xl:text-2xl font-bold">{text.customizeTitle}</h2>

      <Tabs
        value={mode}
        onValueChange={(value) => setMode(value as ApplicationMode)}
      >
        <TabsList
          className={cn(
            "mb-2 overflow-hidden flex w-full rounded-full border",
            currentColorScheme == "dark"
              ? "bg-[#001d3d] border-white"
              : "bg-white border-black"
          )}
        >
          <TabsTrigger
            value="segmentation"
            className={cn(
              "bg-background text-black flex-1 h-full",
              currentColorScheme === "dark"
                ? "border-white data-[state=active]:text-[#001d3d] data-[state=active]:bg-white bg-[#001d3d] text-white hover:bg-white hover:text-[#001d3d]"
                : "border-black data-[state=active]:text-white data-[state=active]:bg-black bg-white text-black hover:bg-black hover:text-white"
            )}
          >
            {text.customizeSegmentation}
          </TabsTrigger>
          <TabsTrigger
            value="selection"
            className={cn(
              "bg-background text-black flex-1 h-full",
              currentColorScheme === "dark"
                ? "border-white data-[state=active]:text-[#001d3d] data-[state=active]:bg-white bg-[#001d3d] text-white hover:bg-white hover:text-[#001d3d]"
                : "border-black data-[state=active]:text-white data-[state=active]:bg-black bg-white text-black hover:bg-black hover:text-white"
            )}
          >
            {text.customizeSelection}
          </TabsTrigger>
        </TabsList>

        {/* Segmentation */}
        <TabsContent value="segmentation">
          <div className="h-[40vh] mb-2 overflow-y-auto scrollbar-hidden">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-semibold">{text.method}</h3>

              <select
                value={segmentationParameters.type}
                onChange={(e) =>
                  resetSegmentationParameters(
                    e.target.value as SegmentationType
                  )
                }
                className="cursor-pointer border-2 border-dashed"
                style={{ color: theme.text, backgroundColor: theme.background }}
                disabled={isSubmitting}
              >
                <option value="segmentation">MCACrisp</option>
                <option value="watershed">Watershed</option>
                <option value="otsu">Otsu</option>
                <option value="sauvola">Sauvola</option>
                <option value="divisao_e_fusao">{text.divisionFusion}</option>
                <option value="lim_prop_locais">{text.localProperties}</option>
                <option value="lim_media_mov">{text.movingAverage}</option>
                <option value="lim_global_simples">{text.simpleGlobal}</option>
                <option value="lim_multipla">{text.multiThresholding}</option>
                <option value="crescimento_regioes_fora">
                  {text.regionGrowing}
                </option>
              </select>
            </div>
            <Accordion className="w-full" type="single" collapsible>
              <AccordionItem value="preprocessing">
                <AccordionTrigger className="font-semibold uppercase">
                  {text.preprocessing}
                </AccordionTrigger>
                <AccordionContent>
                  <PreprocessingForm
                    state={preprocessingParameters}
                    setState={setPreprocessingParameters}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="parameters">
                <AccordionTrigger className="font-semibold uppercase">
                  {text.parameters}
                </AccordionTrigger>
                <AccordionContent>
                  <SegmentationForm
                    state={segmentationParameters}
                    dispatcher={dispatchSegmentation}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="postprocessing">
                <AccordionTrigger className="font-semibold uppercase">
                  {text.postprocessing}
                </AccordionTrigger>
                <AccordionContent>
                  <PostprocessingForm
                    state={postprocessingParameters}
                    setState={setPostprocessingParameters}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>

        {/* Selection */}
        <TabsContent value="selection">
          <div className="flex flex-col gap-2">
            <label className="flex flex-col gap-0.5">
              <p>{text.zoom}:</p>
              <div className="flex items-center justify-between">
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.2"
                  value={selectionParameters.zoom}
                  onChange={(e) =>
                    setSelectionParameters((prev) => ({
                      ...prev,
                      zoom: Number(e.target.value),
                    }))
                  }
                />
                {selectionParameters.zoom}
              </div>
            </label>

            <label className="flex flex-col gap-0.5">
              <p>{text.paint}:</p>
              <div className="flex items-center justify-between">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={selectionParameters.lineWidth}
                  onChange={(e) =>
                    setSelectionParameters((prev) => ({
                      ...prev,
                      lineWidth: Number(e.target.value),
                    }))
                  }
                />
                <p>{selectionParameters.lineWidth}px</p>
              </div>
            </label>

            <label className="flex items-center justify-between">
              <p>{text.color}:</p>
              <input
                type="color"
                value={selectionParameters.color}
                onChange={(e) =>
                  setSelectionParameters((prev) => ({
                    ...prev,
                    color: e.target.value,
                  }))
                }
                className="border rounded"
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">{text.interaction}</h3>

            <div className="flex space-x-4">
              <Button
                onClick={() => {
                  setSelectionParameters((prev) => ({
                    ...prev,
                    isDrawing: true,
                    isPanning: false,
                  }));
                }}
                className="cursor-pointer"
                style={{
                  backgroundColor: selectionParameters.isDrawing
                    ? theme.buttonBackground
                    : theme.buttonSecondaryBackground,
                  color: selectionParameters.isDrawing
                    ? theme.buttonText
                    : theme.buttonSecondaryText,
                }}
              >
                <LucidePenTool size={16} />
              </Button>
              <Button
                onClick={() => {
                  setSelectionParameters((prev) => ({
                    ...prev,
                    isPanning: true,
                    isDrawing: false,
                  }));
                }}
                className="cursor-pointer"
                style={{
                  backgroundColor: selectionParameters.isPanning
                    ? theme.buttonBackground
                    : theme.buttonSecondaryBackground,
                  color: selectionParameters.isPanning
                    ? theme.buttonText
                    : theme.buttonSecondaryText,
                }}
              >
                <LucideMove size={16} />
              </Button>
            </div>

            <button
              onClick={() => clearRef?.current?.click()}
              className="font-medium py-1 rounded-lg cursor-pointer"
              style={{
                backgroundColor: theme.buttonBackground,
                color: theme.buttonText,
              }}
            >
              Limpar
            </button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Main buttons */}
      <Button
        onClick={() => document.getElementById("file-upload")?.click()}
        className="w-full rounded-lg cursor-pointer"
        style={{
          backgroundColor: theme.buttonBackground,
          color: theme.buttonText,
        }}
      >
        {text.imageSelectionText}
      </Button>
      <input
        id="file-upload"
        type="file"
        accept=".dcm"
        onChange={handleFileSelect}
        className="hidden"
      />
      {mode === "segmentation" && (
        <Button
          className="w-full rounded-lg cursor-pointer"
          style={{
            backgroundColor: theme.buttonBackground,
            color: theme.buttonText,
          }}
          onClick={handleSendFile}
          disabled={!dicomFile || isSubmitting}
        >
          {isSubmitting ? text.processing : text.runButton}
        </Button>
      )}
    </aside>
  );
};

export default ParametersSelector;
