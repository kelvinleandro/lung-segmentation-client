import { useState, useEffect, useMemo } from "react";
import { init as coreInit, imageLoader } from "@cornerstonejs/core";
import {
  init as dicomImageLoaderInit,
  wadouri,
} from "@cornerstonejs/dicom-image-loader";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ClassDistribution } from "@/types/image";
import { useParameters } from "@/hooks/use-parameters";
import { computeClassDistribution } from "@/utils/image";
import useLanguage from "@/hooks/use-language";
import useTheme from "@/hooks/use-theme";

coreInit();
dicomImageLoaderInit();

const DensityScaleSection = () => {
  const { dicomFile } = useParameters();
  const [classDistribution, setClassDistribution] =
    useState<ClassDistribution | null>(null);
  const { text } = useLanguage();
  const { theme } = useTheme();

  const classDescriptions = useMemo(() => {
    return [
      {
        class: text.densityHyper,
        color: theme.hyperHU,
        name: classDistribution?.hyperaerated
          ? `${text.densityHyper} (${classDistribution.hyperaerated.toFixed(
              2
            )}%)`
          : text.densityHyper,
        limits: text.hyperRange,
        description: text.hyperDescription,
        example: text.hyperExample,
      },
      {
        class: text.densityNormal,
        color: theme.normalHU,
        name: classDistribution?.normallyAerated
          ? `${text.densityNormal} (${classDistribution.normallyAerated.toFixed(
              2
            )}%)`
          : text.densityNormal,
        limits: text.normalRange,
        description: text.normalDescription,
        example: text.normalExample,
      },
      {
        class: text.densityLow,
        color: theme.badHU,
        name: classDistribution?.poorlyAerated
          ? `${text.densityLow} (${classDistribution.poorlyAerated.toFixed(
              2
            )}%)`
          : text.densityLow,
        limits: text.lowRange,
        description: text.lowDescription,
        example: text.lowExample,
      },
      {
        class: text.densityNone,
        color: theme.noHU,
        name: classDistribution?.nonAerated
          ? `${text.densityNone} (${classDistribution.nonAerated.toFixed(2)}%)`
          : text.densityNone,
        limits: text.noneRange,
        description: text.noneDescription,
        example: text.noneExample,
      },
      {
        class: text.densityBone,
        color: theme.boneHU,
        name: classDistribution?.bone
          ? `${text.densityBone} (${classDistribution.bone.toFixed(2)}%)`
          : text.densityBone,
        limits: text.boneRange,
        description: text.boneDescription,
        example: text.boneExample,
      },
    ];
  }, [classDistribution, theme, text]);

  useEffect(() => {
    const loadImageData = async () => {
      if (!dicomFile) return;
      const imageId = wadouri.fileManager.add(dicomFile);

      try {
        const _image = await imageLoader.loadImage(imageId);
        const pixelData = _image.getPixelData();
        const classCounts = computeClassDistribution(pixelData);
        console.log(classCounts);

        setClassDistribution(classCounts);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImageData();
  }, [dicomFile]);

  return (
    <section className="w-full h-full flex flex-col gap-6 items-center">
      <div className="w-[70%] border-2 rounded-xl flex flex-col p-6 gap-4 items-center justify-center">
        <h2 className="text-xl font-poppins font-medium self-start">
          {text.densityScaleTitle}
        </h2>

        <div className="w-full rounded-xl overflow-hidden flex">
          {classDescriptions.map((classDescription, index) => (
            <div
              key={index}
              className="px-3 py-2 font-poppins font-sm flex-1 text-center text-black"
              style={{ backgroundColor: classDescription.color }}
            >
              {classDescription.class}
            </div>
          ))}
        </div>

        <div className="w-full flex justify-between">
          <p className="font-poppins font-medium">{text.lowerLimit}</p>
          <p className="font-poppins font-medium">{text.upperLimit}</p>
        </div>
      </div>

      <ScrollArea className="w-[70%] h-[30vh] 2xl:h-[40vh]">
        {classDescriptions.map((classDescription, index) => (
          <div
            key={index}
            className="mb-4 border-2 rounded-xl flex p-4 items-start gap-2 border-gray-300"
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: classDescription.color }}
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-poppins font-medium">
                {classDescription.name}
              </h3>
              <p className="text-md font-poppins font-medium">
                {classDescription.limits}
              </p>
              <p className="text-sm font-poppins font-medium">
                {classDescription.description}
              </p>
              <p className="text-sm font-poppins font-medium">
                <span className="font-bold">{text.example}:</span>{" "}
                {classDescription.example}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </section>
  );
};

export default DensityScaleSection;
