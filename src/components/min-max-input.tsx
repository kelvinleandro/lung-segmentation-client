import { SegmentationAction } from "@/context/parameters-context";
import useTheme from "@/hooks/use-theme";

type Props = {
  min: number;
  max: number;
  state: [number, number];
  dispatcher: React.Dispatch<SegmentationAction>;
  stateKey: string;
};

const MinMaxInput = ({ min, max, state, dispatcher, stateKey }: Props) => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-x-1">
        <p>Min:</p>

        <input
          type="number"
          min={min}
          max={state[1] - 1}
          step={1}
          value={state[0]}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (value >= min && value <= state[1] - 1) {
              dispatcher({
                type: "SET_PARAM",
                key: stateKey,
                value: [value, state[1]],
              });
            }
          }}
          style={{ backgroundColor: theme.text, color: theme.background }}
        />
      </div>

      <div className="flex gap-x-1">
        <p>Max:</p>

        <input
          type="number"
          min={state[0] + 1}
          max={max - 1}
          step={1}
          value={state[1]}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (value >= state[0] + 1 && value <= max - 1) {
              dispatcher({
                type: "SET_PARAM",
                key: stateKey,
                value: [state[0], value],
              });
            }
          }}
          style={{ backgroundColor: theme.text, color: theme.background }}
        />
      </div>
    </div>
  );
};

export default MinMaxInput;
