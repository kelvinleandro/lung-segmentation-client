import useLanguage from "@/hooks/use-language";
import { SegmentationParameters } from "@/types/parameters";
import MovingAverageForm from "./moving-average-form";
import LocalPropertiesForm from "./local-properties-form";
import SauvolaForm from "./sauvola-form";
import WatershedForm from "./watershed-form";
import DivisionFusionForm from "./division-fusion-form";
import { SegmentationAction } from "@/context/parameters-context";

type Props = {
  state: SegmentationParameters;
  dispatcher: React.Dispatch<SegmentationAction>;
};

const SegmentationForm = ({ state, dispatcher }: Props) => {
  const { text } = useLanguage();

  return (
    <div className="w-full flex flex-col font-poppins gap-1">
      {state.type === "movingAverage" ? (
        // moving average thresholding
        <MovingAverageForm state={state} dispatcher={dispatcher} />
      ) : state.type === "localProperties" ? (
        // local properties thresholding
        <LocalPropertiesForm state={state} dispatcher={dispatcher} />
      ) : state.type === "sauvola" ? (
        // sauvola thresholding
        <SauvolaForm state={state} dispatcher={dispatcher} />
      ) : state.type === "watershed" ? (
        // watershed thresholding
        <WatershedForm state={state} dispatcher={dispatcher} />
      ) : state.type === "divisionFusion" ? (
        // division fusion
        <DivisionFusionForm state={state} dispatcher={dispatcher} />
      ) : (
        // others or invalid
        <p>{text.noParameters}</p>
      )}
    </div>
  );
};

export default SegmentationForm;
