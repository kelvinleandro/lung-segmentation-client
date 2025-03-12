import {
  WSHED_THRESH_MIN,
  WSHED_THRESH_MAX,
  WSHED_THRESH_STEP,
  WSHED_KERNEL_MIN,
  WSHED_KERNEL_MAX,
  WSHED_KERNEL_STEP,
  WSHED_IT_MORPH_MIN,
  WSHED_IT_MORPH_MAX,
  WSHED_IT_MORPH_STEP,
  WSHED_IT_DILAT_MIN,
  WSHED_IT_DILAT_MAX,
  WSHED_IT_DILAT_STEP,
  WSHED_DIST_MIN,
  WSHED_DIST_MAX,
  WSHED_DIST_STEP,
} from "@/constants/segmentation";
import { SegmentationAction } from "@/context/parameters-context";
import useLanguage from "@/hooks/use-language";
import { Watershed } from "@/types/parameters";
import { Separator } from "../ui/separator";
import useTheme from "@/hooks/use-theme";

type Props = {
  state: Watershed;
  dispatcher: React.Dispatch<SegmentationAction>;
};

const WatershedForm = ({ state, dispatcher }: Props) => {
  const { text } = useLanguage();
  const { theme } = useTheme();

  return (
    <>
      <div className="flex items-center justify-between">
        <p>{text.threshold}:</p>

        <input
          className="w-1/3"
          type="number"
          min={WSHED_THRESH_MIN}
          max={WSHED_THRESH_MAX}
          step={WSHED_THRESH_STEP}
          value={state.threshold}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= WSHED_THRESH_MIN && value <= WSHED_THRESH_MAX) {
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
        <p>{text.applyInterpolation}:</p>

        <input
          type="checkbox"
          checked={state.applyInterpolation}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "applyInterpolation",
              value: e.target.checked,
            })
          }
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.applyMorphology}:</p>

        <input
          type="checkbox"
          checked={state.applyMorphology}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "applyMorphology",
              value: e.target.checked,
            })
          }
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>{text.kernelSize}:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={WSHED_KERNEL_MIN}
            max={WSHED_KERNEL_MAX}
            step={WSHED_KERNEL_STEP}
            value={state.kernelSize}
            onChange={(e) =>
              dispatcher({
                type: "SET_PARAM",
                key: "kernelSize",
                value: Number(e.target.value),
              })
            }
          />
          <p>{state.kernelSize}</p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>{text.iterationsMorphology}:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={WSHED_IT_MORPH_MIN}
            max={WSHED_IT_MORPH_MAX}
            step={WSHED_IT_MORPH_STEP}
            value={state.morphologyIterations}
            onChange={(e) =>
              dispatcher({
                type: "SET_PARAM",
                key: "morphologyIterations",
                value: Number(e.target.value),
              })
            }
          />
          <p>{state.morphologyIterations}</p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>{text.iterationsDilation}:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={WSHED_IT_DILAT_MIN}
            max={WSHED_IT_DILAT_MAX}
            step={WSHED_IT_DILAT_STEP}
            value={state.dilationIterations}
            onChange={(e) =>
              dispatcher({
                type: "SET_PARAM",
                key: "dilationIterations",
                value: Number(e.target.value),
              })
            }
          />
          <p>{state.dilationIterations}</p>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.distFactor}:</p>

        <input
          className="w-1/3"
          type="number"
          min={WSHED_DIST_MIN}
          max={WSHED_DIST_MAX}
          step={WSHED_DIST_STEP}
          value={state.distFactor}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= WSHED_DIST_MIN && value <= WSHED_DIST_MAX) {
              dispatcher({
                type: "SET_PARAM",
                key: "distFactor",
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

export default WatershedForm;
