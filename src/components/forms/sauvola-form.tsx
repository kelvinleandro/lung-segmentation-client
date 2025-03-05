import {
  LOCAL_WIN_MIN,
  LOCAL_WIN_MAX,
  LOCAL_WIN_STEP,
  SAUVOLA_KERNEL_MIN,
  SAUVOLA_KERNEL_MAX,
  SAUVOLA_KERNEL_STEP,
  SAUVOLA_K_MIN,
  SAUVOLA_K_MAX,
  SAUVOLA_K_STEP,
  SAUVOLA_MORPHOLOGY_MIN,
  SAUVOLA_MORPHOLOGY_MAX,
  SAUVOLA_MORPHOLOGY_STEP,
} from "@/constants/segmentation";
import useLanguage from "@/hooks/use-language";
import { Sauvola } from "@/types/parameters";

type Props = {
  state: Sauvola;
  dispatcher: React.Dispatch<any>;
};

const SauvolaForm = ({ state, dispatcher }: Props) => {
  const { text } = useLanguage();
  return (
    <>
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

      <div className="flex flex-col gap-0.5">
        <p>{text.kernelSize}:</p>

        <div className="flex items-center justify-between">
          <input
            className="flex-2"
            type="range"
            min={SAUVOLA_KERNEL_MIN}
            max={SAUVOLA_KERNEL_MAX}
            step={SAUVOLA_KERNEL_STEP}
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

      <div className="flex items-center justify-between">
        <p>k:</p>

        <input
          className="w-1/3"
          type="number"
          min={SAUVOLA_K_MIN}
          max={SAUVOLA_K_MAX}
          step={SAUVOLA_K_STEP}
          value={state.k}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "k",
              value: Number(e.target.value),
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

      <div className="flex flex-col gap-0.5">
        <p>{text.iterationsMorphology}:</p>

        <div className="flex items-center justify-between">
          <input
            className="flex-2"
            type="range"
            min={SAUVOLA_MORPHOLOGY_MIN}
            max={SAUVOLA_MORPHOLOGY_MAX}
            step={SAUVOLA_MORPHOLOGY_STEP}
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
    </>
  );
};

export default SauvolaForm;
