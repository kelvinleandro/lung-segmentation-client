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

coreInit();
dicomImageLoaderInit();

const DensityScaleSection = () => {
  const { dicomFile } = useParameters();
  const [classDistribution, setClassDistribution] =
    useState<ClassDistribution | null>(null);

  const classDescriptions = useMemo(() => {
    return [
      {
        class: "Hiperareadas",
        color: "#3B82F6",
        name: classDistribution?.hyperaerated
          ? `Hiperareadas (${classDistribution.hyperaerated.toFixed(2)}%)`
          : "Hiperareadas",
        limits: "-1000 a -950 HU",
        description: "Regiões com muito ar, como espaços aéreos no pulmão.",
        example: "Cavidades aéreas, bronquíolos.",
      },
      {
        class: "Normalmente areadas",
        color: "#27E23D",
        name: classDistribution?.normallyAerated
          ? `Normalmente areadas (${classDistribution.normallyAerated.toFixed(
              2
            )}%)`
          : "Normalmente areadas",
        limits: "-950 a -500 HU",
        description:
          "Tecido pulmonar normal, densidade típica do pulmão saudável.",
        example: "Parênquima pulmonar normal.",
      },
      {
        class: "Pouco areadas",
        color: "#E78421",
        name: classDistribution?.poorlyAerated
          ? `Pouco areadas (${classDistribution.poorlyAerated.toFixed(2)}%)`
          : "Pouco areadas",
        limits: "-500 a -100 HU",
        description: "Regiões com menos ar que o normal.",
        example: "Áreas de atelectasia parcial.",
      },
      {
        class: "Não areadas",
        color: "#DC2626",
        name: classDistribution?.nonAerated
          ? `Não areadas (${classDistribution.nonAerated.toFixed(2)}%)`
          : "Não areadas",
        limits: "-100 a 100 HU",
        description: "Regiões sem ar, possível consolidação.",
        example: "Consolidação, derrame pleural.",
      },
      {
        class: "Osso",
        color: "#D9D9D9",
        name: classDistribution?.bone
          ? `Osso (${classDistribution.bone.toFixed(2)}%)`
          : "Osso",
        limits: "600 a 2000 HU",
        description: "Estruturas ósseas, densidade muito alta.",
        example: "Costelas, vértebras.",
      },
    ];
  }, [classDistribution]);

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
          Escalas de Densidades (HU)
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
          <p className="font-poppins font-medium">-1000 HU</p>
          <p className="font-poppins font-medium">2000 HU</p>
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
                <span className="font-bold">Exemplo:</span>{" "}
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
