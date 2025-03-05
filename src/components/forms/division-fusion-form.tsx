import {
  DF_MLIM_MAX,
  DF_MLIM_MIN,
  DF_MLIM_STEP,
  DF_MREF_MAX,
  DF_MREF_MIN,
  DF_MREF_STEP,
  DF_VLIM_MAX,
  DF_VLIM_MIN,
  DF_VLIM_STEP,
} from "@/constants/segmentation";
import useLanguage from "@/hooks/use-language";
import { DivisionFusion } from "@/types/parameters";

type Props = {
  state: DivisionFusion;
  dispatcher: React.Dispatch<any>;
};

const DivisionFusionForm = ({ state, dispatcher }: Props) => {
  const { text } = useLanguage();
  return (
    <>
      <div className="flex items-center justify-between">
        <p>{text.varLimit}:</p>

        <input
          className="w-1/3"
          type="number"
          min={DF_VLIM_MIN}
          max={DF_VLIM_MAX}
          step={DF_VLIM_STEP}
          value={state.varLimit}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "varLimit",
              value: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <p>{text.meanLimit}:</p>

        <input
          className="w-1/3"
          type="number"
          min={DF_MLIM_MIN}
          max={DF_MLIM_MAX}
          step={DF_MLIM_STEP}
          value={state.meanLimit}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "meanLimit",
              value: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <p>{text.meanReference}:</p>

        <input
          className="w-1/3"
          type="number"
          min={DF_MREF_MIN}
          max={DF_MREF_MAX}
          step={DF_MREF_STEP}
          value={state.meanReference}
          onChange={(e) =>
            dispatcher({
              type: "SET_PARAM",
              key: "meanReference",
              value: Number(e.target.value),
            })
          }
        />
      </div>
    </>
  );
};

export default DivisionFusionForm;
