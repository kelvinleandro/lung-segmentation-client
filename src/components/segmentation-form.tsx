import useLanguage from "@/hooks/use-language";
import { SegmentationParameters } from "@/types/parameters";
import {
  LOCAL_AB_MAX,
  LOCAL_AB_MIN,
  LOCAL_AB_STEP,
  LOCAL_WIN_MAX,
  LOCAL_WIN_MIN,
  LOCAL_WIN_STEP,
  MA_B_MAX,
  MA_B_MIN,
  MA_B_STEP,
  MA_N_MAX,
  MA_N_MIN,
  MA_N_STEP,
  SAUVOLA_K_MAX,
  SAUVOLA_K_MIN,
  SAUVOLA_K_STEP,
  SAUVOLA_KERNEL_MAX,
  SAUVOLA_KERNEL_MIN,
  SAUVOLA_KERNEL_STEP,
  SAUVOLA_MORPHOLOGY_MAX,
  SAUVOLA_MORPHOLOGY_MIN,
  SAUVOLA_MORPHOLOGY_STEP,
} from "@/constants/segmentation";

type Props = {
  state: SegmentationParameters;
  dispatcher: React.Dispatch<any>;
};

const SegmentationForm = ({ state, dispatcher }: Props) => {
  const { text } = useLanguage();
  return (
    <div className="w-full flex flex-col font-poppins gap-1">
      {state.type === "movingAverage" ? (
        // moving average thresholding
        <>
          <div className="flex items-center justify-between">
            <p>{text.numberPoints}:</p>

            <input
              className="w-1/3"
              type="number"
              min={MA_N_MIN}
              max={MA_N_MAX}
              step={MA_N_STEP}
              value={state.n}
              onChange={(e) =>
                dispatcher({
                  type: "SET_PARAM",
                  key: "n",
                  value: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p>{text.adjustFactor}:</p>

            <div className="flex items-center justify-between">
              <input
                className="w-1/3"
                type="range"
                min={MA_B_MIN}
                max={MA_B_MAX}
                step={MA_B_STEP}
                value={state.b}
                onChange={(e) =>
                  dispatcher({
                    type: "SET_PARAM",
                    key: "b",
                    value: Number(e.target.value),
                  })
                }
              />
              <p>{state.b}</p>
            </div>
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
        </>
      ) : state.type === "localProperties" ? (
        // local properties thresholding
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
      ) : state.type === "sauvola" ? (
        // sauvola thresholding
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
            <p>{text.iterations}:</p>

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
      ) : state.type === "multiThresholding" ? (
        // multiple thresholding
        <p>{text.noParameters}</p>
      ) : null}
    </div>
  );
};

export default SegmentationForm;
