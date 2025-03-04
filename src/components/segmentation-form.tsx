// import { SegmentationParameters } from "@/types/parameters";

import useLanguage from "@/hooks/use-language";

type Props = {
  state: any;
  dispatcher: React.Dispatch<any>;
};

const SegmentationForm = () => {
  const { text } = useLanguage();
  return (
    <div className="w-full flex flex-col font-poppins gap-1">
      {"applyInterpolation" in state ? (
        // moving average limiarization
        <>
          <div className="flex items-center justify-between">
            <p>{text.numberPoints}:</p>

            <input
              className="w-1/3"
              type="number"
              min="1"
              max="100"
              step="1"
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
          <div className="flex items-center justify-between">
            <p>{text.adjustFactor}:</p>

            <input
              className="w-1/3"
              type="number"
              min="0"
              max="1"
              step="0.1"
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
      ) : null}
    </div>
  );
};

export default SegmentationForm;
