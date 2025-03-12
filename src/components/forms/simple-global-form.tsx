import useLanguage from "@/hooks/use-language";
import { SimpleGlobalThresholding } from "@/types/parameters";
import useTheme from "@/hooks/use-theme";
import { SegmentationAction } from "@/context/parameters-context";
import {
  SIMPLE_GLOBAL_DELTA_MAX,
  SIMPLE_GLOBAL_DELTA_MIN,
  SIMPLE_GLOBAL_DELTA_STEP,
  SIMPLE_GLOBAL_THRESH_MAX,
  SIMPLE_GLOBAL_THRESH_MIN,
  SIMPLE_GLOBAL_THRESH_STEP,
} from "@/constants/segmentation";
import { Separator } from "../ui/separator";

type Props = {
  state: SimpleGlobalThresholding;
  dispatcher: React.Dispatch<SegmentationAction>;
};

const SimpleGlobalForm = ({ state, dispatcher }: Props) => {
  const { text } = useLanguage();
  const { theme } = useTheme();

  return (
    <>
      <div className="flex items-center justify-between">
        <p>{text.threshold}:</p>

        <input
          type="number"
          min={SIMPLE_GLOBAL_THRESH_MIN}
          max={SIMPLE_GLOBAL_THRESH_MAX}
          step={SIMPLE_GLOBAL_THRESH_STEP}
          value={state.threshold}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (
              value >= SIMPLE_GLOBAL_THRESH_MIN &&
              value <= SIMPLE_GLOBAL_THRESH_MAX
            ) {
              dispatcher({
                type: "SET_PARAM",
                key: "threshold",
                value: value,
              });
            }
          }}
          style={{ backgroundColor: theme.text, color: theme.background }}
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>Delta {text.threshold}:</p>

        <input
          type="number"
          min={SIMPLE_GLOBAL_DELTA_MIN}
          max={SIMPLE_GLOBAL_DELTA_MAX}
          step={SIMPLE_GLOBAL_DELTA_STEP}
          value={state.deltaThreshold}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (
              value >= SIMPLE_GLOBAL_DELTA_MIN &&
              value <= SIMPLE_GLOBAL_DELTA_MAX
            ) {
              dispatcher({
                type: "SET_PARAM",
                key: "deltaThreshold",
                value: value,
              });
            }
          }}
          style={{ backgroundColor: theme.text, color: theme.background }}
        />
      </div>
    </>
  );
};

export default SimpleGlobalForm;
