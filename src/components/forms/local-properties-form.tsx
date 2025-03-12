import {
  LOCAL_WIN_MIN,
  LOCAL_WIN_MAX,
  LOCAL_WIN_STEP,
  LOCAL_AB_MIN,
  LOCAL_AB_MAX,
  LOCAL_AB_STEP,
} from "@/constants/segmentation";
import { SegmentationAction } from "@/context/parameters-context";
import useLanguage from "@/hooks/use-language";
import { LocalProperties } from "@/types/parameters";
import { Separator } from "../ui/separator";
import useTheme from "@/hooks/use-theme";

type Props = {
  state: LocalProperties;
  dispatcher: React.Dispatch<SegmentationAction>;
};

const LocalPropertiesForm = ({ state, dispatcher }: Props) => {
  const { text } = useLanguage();
  const { theme } = useTheme();
  return (
    <>
      <div className="flex items-center justify-between">
        <p>{text.useGlobalMean}:</p>

        <input
          type="checkbox"
          checked={state.useGlobalMean}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "useGlobalMean",
              value: e.target.checked,
            })
          }
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

      <div className="flex flex-col gap-0.5">
        <p>{text.windowSize}:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={LOCAL_WIN_MIN}
            max={LOCAL_WIN_MAX}
            step={LOCAL_WIN_STEP}
            value={state.windowSize}
            onChange={(e) =>
              dispatcher({
                type: "SET_PARAM",
                key: "windowSize",
                value: Number(e.target.value),
              })
            }
          />
          <p>{state.windowSize}</p>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>a:</p>

        <input
          className="w-1/3"
          type="number"
          min={LOCAL_AB_MIN}
          max={LOCAL_AB_MAX}
          step={LOCAL_AB_STEP}
          value={state.a}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= LOCAL_AB_MIN && value <= LOCAL_AB_MAX) {
              dispatcher({
                type: "SET_PARAM",
                key: "a",
                value: value,
              });
            }
          }}
          style={{ backgroundColor: theme.text, color: theme.background }}
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>b:</p>

        <input
          className="w-1/3"
          type="number"
          min={LOCAL_AB_MIN}
          max={LOCAL_AB_MAX}
          step={LOCAL_AB_STEP}
          value={state.b}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= LOCAL_AB_MIN && value <= LOCAL_AB_MAX) {
              dispatcher({
                type: "SET_PARAM",
                key: "b",
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

export default LocalPropertiesForm;
