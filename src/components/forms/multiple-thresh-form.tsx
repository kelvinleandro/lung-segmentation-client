import { Separator } from "../ui/separator";
import { SegmentationAction } from "@/context/parameters-context";
import { MultiThresholding } from "@/types/parameters";
import useLanguage from "@/hooks/use-language";
import MinMaxInput from "../min-max-input";

type Props = {
  state: MultiThresholding;
  dispatcher: React.Dispatch<SegmentationAction>;
};

const MultipleThreshForm = ({ state, dispatcher }: Props) => {
  const { text } = useLanguage();
  return (
    <>
      <div className="flex flex-col gap-0.5">
        <p>
          {text.limit} {text.densityHyper}:
        </p>

        <MinMaxInput
          min={0}
          max={state.normalLim[0]}
          state={state.hyperLim}
          dispatcher={dispatcher}
          stateKey="hyperLim"
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>
          {text.limit} {text.densityNormal}:
        </p>

        <MinMaxInput
          min={state.hyperLim[1]}
          max={state.poorLim[0]}
          state={state.normalLim}
          dispatcher={dispatcher}
          stateKey="normalLim"
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>
          {text.limit} {text.densityLow}:
        </p>

        <MinMaxInput
          min={state.normalLim[1]}
          max={state.nonLim[0]}
          state={state.poorLim}
          dispatcher={dispatcher}
          stateKey="poorLim"
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>
          {text.limit} {text.densityNone}:
        </p>

        <MinMaxInput
          min={state.poorLim[1]}
          max={state.boneLim[0]}
          state={state.nonLim}
          dispatcher={dispatcher}
          stateKey="nonLim"
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>
          {text.limit} {text.densityBone}:
        </p>

        <MinMaxInput
          min={state.nonLim[1]}
          max={256}
          state={state.boneLim}
          dispatcher={dispatcher}
          stateKey="boneLim"
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.densityHyper}:</p>

        <input
          type="checkbox"
          checked={state.activateHyper}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "activateHyper",
              value: e.target.checked,
            })
          }
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.densityNormal}:</p>

        <input
          type="checkbox"
          checked={state.activateNormal}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "activateNormal",
              value: e.target.checked,
            })
          }
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.densityLow}:</p>

        <input
          type="checkbox"
          checked={state.activatePoor}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "activatePoor",
              value: e.target.checked,
            })
          }
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.densityNone}:</p>

        <input
          type="checkbox"
          checked={state.activateNon}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "activateNon",
              value: e.target.checked,
            })
          }
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.densityBone}:</p>

        <input
          type="checkbox"
          checked={state.activateBone}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "activateBone",
              value: e.target.checked,
            })
          }
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.notClassified}:</p>

        <input
          type="checkbox"
          checked={state.activateNonClassified}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "activateNonClassified",
              value: e.target.checked,
            })
          }
        />
      </div>
    </>
  );
};

export default MultipleThreshForm;
