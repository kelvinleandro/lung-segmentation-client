import {
  LOCAL_WIN_MIN,
  LOCAL_WIN_MAX,
  LOCAL_WIN_STEP,
  LOCAL_AB_MIN,
  LOCAL_AB_MAX,
  LOCAL_AB_STEP,
} from "@/constants/segmentation";
import useLanguage from "@/hooks/use-language";
import { LocalProperties } from "@/types/parameters";

type Props = {
  state: LocalProperties;
  dispatcher: React.Dispatch<any>;
};

const LocalPropertiesForm = ({ state, dispatcher }: Props) => {
  const { text } = useLanguage();
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

      <div className="flex flex-col gap-0.5">
        <p>{text.windowSize}:</p>

        <div className="flex items-center justify-between">
          <input
            className="flex-2"
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

      <div className="flex items-center justify-between">
        <p>a:</p>

        <input
          className="w-1/3"
          type="number"
          min={LOCAL_AB_MIN}
          max={LOCAL_AB_MAX}
          step={LOCAL_AB_STEP}
          value={state.a}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "a",
              value: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <p>b:</p>

        <input
          className="w-1/3"
          type="number"
          min={LOCAL_AB_MIN}
          max={LOCAL_AB_MAX}
          step={LOCAL_AB_STEP}
          value={state.b}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "b",
              value: Number(e.target.value),
            })
          }
        />
      </div>
    </>
  );
};

export default LocalPropertiesForm;
