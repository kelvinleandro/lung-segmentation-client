import useLanguage from "@/hooks/use-language";
import { PostprocessingParameters } from "@/types/parameters";
import {
  POST_AREA_MAX,
  POST_AREA_MIN,
  POST_AREA_STEP,
} from "@/constants/postprocessing";
import useTheme from "@/hooks/use-theme";

type Props = {
  state: PostprocessingParameters;
  setState: React.Dispatch<React.SetStateAction<PostprocessingParameters>>;
};

const PostprocessingForm = ({ state, setState }: Props) => {
  const { text } = useLanguage();
  const { theme } = useTheme();

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
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= POST_AREA_MIN && value <= POST_AREA_MAX) {
              setState((prev) => ({
                ...prev,
                minArea: value,
              }));
            }
          }}
          style={{ backgroundColor: theme.text, color: theme.background }}
        />
      </div>
    </div>
  );
};

export default PostprocessingForm;
