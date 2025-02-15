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
        class: "Lorem Ipsum",
        color: "#3B82F6",
        name: classDistribution?.hyperaerated
          ? `Lorem Ipsum (${classDistribution.hyperaerated.toFixed(2)}%)`
          : "Lorem Ipsum",
        limits: "-1000 to -950 HU",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet.",
        example: "Lorem ipsum dolor sit amet",
      },
      {
        class: "Lorem Ipsum",
        color: "#27E23D",
        name: classDistribution?.normallyAerated
          ? `Lorem Ipsum (${classDistribution.normallyAerated.toFixed(2)}%)`
          : "Lorem Ipsum",
        limits: "-950 to -500 HU",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet.",
        example: "Lorem ipsum dolor sit amet",
      },
      {
        class: "Lorem Ipsum",
        color: "#E78421",
        name: classDistribution?.poorlyAerated
          ? `Lorem Ipsum (${classDistribution.poorlyAerated.toFixed(2)}%)`
          : "Lorem Ipsum",
        limits: "-500 to -100 HU",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet.",
        example: "Lorem ipsum dolor sit amet",
      },
      {
        class: "Lorem Ipsum",
        color: "#DC2626",
        name: classDistribution?.nonAerated
          ? `Lorem Ipsum (${classDistribution.nonAerated.toFixed(2)}%)`
          : "Lorem Ipsum",
        limits: "-100 to 100 HU",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet.",
        example: "Lorem ipsum dolor sit amet",
      },
      {
        class: "Lorem Ipsum",
        color: "#D9D9D9",
        name: classDistribution?.bone
          ? `Lorem Ipsum (${classDistribution.bone.toFixed(2)}%)`
          : "Lorem Ipsum",
        limits: "600 to 2000 HU",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet.",
        example: "Lorem ipsum dolor sit amet",
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
    <section className="w-full h-full flex flex-col gap-8 items-center">
      <div className="w-[60%] border-2 rounded-xl flex flex-col p-6 gap-4 items-center justify-center">
        <h2 className="text-xl font-poppins font-medium self-start">
          Ipsum Lorem
        </h2>

        <div className="rounded-md overflow-hidden flex">
          {classDescriptions.map((classDescription, index) => (
            <div
              key={index}
              className="px-3 py-2 font-poppins font-medium"
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

      <ScrollArea className="w-[60%] h-72">
        {classDescriptions.map((classDescription, index) => (
          <div
            key={index}
            className="mb-4 border-2 rounded-xl flex p-4 items-start gap-2"
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
