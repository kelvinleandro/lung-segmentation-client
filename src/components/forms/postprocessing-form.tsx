import useLanguage from "@/hooks/use-language";
import { PostprocessingParameters } from "@/types/parameters";
import {
  POST_AREA_MAX,
  POST_AREA_MIN,
  POST_AREA_STEP,
} from "@/constants/postprocessing";

type Props = {
  state: PostprocessingParameters;
  setState: React.Dispatch<React.SetStateAction<PostprocessingParameters>>;
};

const PostprocessingForm = ({ state, setState }: Props) => {
  const { text } = useLanguage();

  return (
    <div className="w-full flex flex-col font-poppins">
      <div className="flex items-center justify-between">
        <p>{text.minArea}:</p>

        <input
          type="number"
          min={POST_AREA_MIN}
          max={POST_AREA_MAX}
          step={POST_AREA_STEP}
          value={state.minArea}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              minArea: Number(e.target.value),
            }))
          }
        />
      </div>
    </div>
  );
};

export default PostprocessingForm;
