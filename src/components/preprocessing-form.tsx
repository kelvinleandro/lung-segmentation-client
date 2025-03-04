import useLanguage from "@/hooks/use-language";
import { Separator } from "./ui/separator";

type Props = {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
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
            min="3"
            max="9"
            step="2"
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
            min="0"
            max="5"
            step="0.2"
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
