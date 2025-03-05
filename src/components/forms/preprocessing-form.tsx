import useLanguage from "@/hooks/use-language";
import { Separator } from "../ui/separator";
import { PreprocessingParameters } from "@/types/parameters";
import {
  PRE_KERNEL_SIZE_MAX,
  PRE_KERNEL_SIZE_MIN,
  PRE_KERNEL_SIZE_STEP,
  PRE_SIGMA_MAX,
  PRE_SIGMA_MIN,
  PRE_SIGMA_STEP,
} from "@/constants/preprocessing";

type Props = {
  state: PreprocessingParameters;
  setState: React.Dispatch<React.SetStateAction<PreprocessingParameters>>;
};

const PreprocessingForm = ({ state, setState }: Props) => {
  const { text } = useLanguage();

  return (
    <div className="w-full flex flex-col font-poppins gap-1">
      <div className="flex items-center justify-between">
        <p>{text.gaussianBlur}:</p>

        <input
          type="checkbox"
          checked={state.applyGaussianBlur}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              applyGaussianBlur: e.target.checked,
            }))
          }
        />
      </div>
      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.medianBlur}:</p>

        <input
          type="checkbox"
          checked={state.applyMedianBlur}
          onChange={(e) =>
            setState((prev) => ({ ...prev, applyMedianBlur: e.target.checked }))
          }
        />
      </div>
      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.meanBlur}:</p>

        <input
          type="checkbox"
          checked={state.applyMeanBlur}
          onChange={(e) =>
            setState((prev) => ({ ...prev, applyMeanBlur: e.target.checked }))
          }
        />
      </div>
      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>{text.kernelSize}:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={PRE_KERNEL_SIZE_MIN}
            max={PRE_KERNEL_SIZE_MAX}
            step={PRE_KERNEL_SIZE_STEP}
            value={state.kernelSize}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                kernelSize: parseInt(e.target.value),
              }))
            }
          />
          <p>{state.kernelSize}</p>
        </div>
      </div>
      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>{text.sigma}:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={PRE_SIGMA_MIN}
            max={PRE_SIGMA_MAX}
            step={PRE_SIGMA_STEP}
            value={state.sigma}
            onChange={(e) =>
              setState((prev) => ({ ...prev, sigma: parseInt(e.target.value) }))
            }
          />
          <p>{state.sigma}</p>
        </div>
      </div>
    </div>
  );
};

export default PreprocessingForm;
