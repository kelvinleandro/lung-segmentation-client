import { SegmentationAction } from "@/context/parameters-context";
import useLanguage from "@/hooks/use-language";
import useTheme from "@/hooks/use-theme";
import { MCACrisp } from "@/types/parameters";
import React from "react";
import { Separator } from "../ui/separator";
import {
  MCACRISP_ALPHA_MAX,
  MCACRISP_ALPHA_MIN,
  MCACRISP_ALPHA_STEP,
  MCACRISP_DMAX_MAX,
  MCACRISP_DMAX_MIN,
  MCACRISP_DMAX_STEP,
  MCACRISP_EARLY_STOP_MAX,
  MCACRISP_EARLY_STOP_MIN,
  MCACRISP_EARLY_STOP_STEP,
  MCACRISP_MAX_ITERATIONS_MAX,
  MCACRISP_MAX_ITERATIONS_MIN,
  MCACRISP_MAX_ITERATIONS_STEP,
  MCACRISP_NPIXELS_MAX,
  MCACRISP_NPIXELS_MIN,
  MCACRISP_NPIXELS_STEP,
  MCACRISP_RADIUS_MAX,
  MCACRISP_RADIUS_MIN,
  MCACRISP_RADIUS_STEP,
  MCACRISP_SEARCH_AREA_MAX,
  MCACRISP_SEARCH_AREA_MIN,
  MCACRISP_SEARCH_AREA_STEP,
  MCACRISP_WADAPT_MAX,
  MCACRISP_WADAPT_MIN,
  MCACRISP_WADAPT_STEP,
  MCACRISP_WCONT_MAX,
  MCACRISP_WCONT_MIN,
  MCACRISP_WCONT_STEP,
} from "@/constants/segmentation";

type Props = {
  state: MCACrisp;
  dispatcher: React.Dispatch<SegmentationAction>;
};

const MCACrispForm = ({ state, dispatcher }: Props) => {
  const { text } = useLanguage();
  const { theme } = useTheme();
  return (
    <>
      <div className="flex flex-col gap-0.5">
        <p>{text.nPixels}:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={MCACRISP_NPIXELS_MIN}
            max={MCACRISP_NPIXELS_MAX}
            step={MCACRISP_NPIXELS_STEP}
            value={state.nPixels}
            onChange={(e) =>
              dispatcher({
                type: "SET_PARAM",
                key: "nPixels",
                value: Number(e.target.value),
              })
            }
          />
          <p>{state.nPixels}</p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>{text.radius}:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={MCACRISP_RADIUS_MIN}
            max={MCACRISP_RADIUS_MAX}
            step={MCACRISP_RADIUS_STEP}
            value={state.radius}
            onChange={(e) =>
              dispatcher({
                type: "SET_PARAM",
                key: "radius",
                value: Number(e.target.value),
              })
            }
          />
          <p>{state.radius}</p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>wCont:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={MCACRISP_WCONT_MIN}
            max={MCACRISP_WCONT_MAX}
            step={MCACRISP_WCONT_STEP}
            value={state.wCont}
            onChange={(e) =>
              dispatcher({
                type: "SET_PARAM",
                key: "wCont",
                value: Number(e.target.value),
              })
            }
          />
          <p>{state.wCont}</p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>wAdapt:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={MCACRISP_WADAPT_MIN}
            max={MCACRISP_WADAPT_MAX}
            step={MCACRISP_WADAPT_STEP}
            value={state.wAdapt}
            onChange={(e) =>
              dispatcher({
                type: "SET_PARAM",
                key: "wAdapt",
                value: Number(e.target.value),
              })
            }
          />
          <p>{state.wAdapt}</p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>dMax:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={MCACRISP_DMAX_MIN}
            max={MCACRISP_DMAX_MAX}
            step={MCACRISP_DMAX_STEP}
            value={state.dMax}
            onChange={(e) =>
              dispatcher({
                type: "SET_PARAM",
                key: "dMax",
                value: Number(e.target.value),
              })
            }
          />
          <p>{state.dMax}</p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-0.5">
        <p>{text.searchArea}:</p>

        <div className="flex items-center justify-between">
          <input
            type="range"
            min={MCACRISP_SEARCH_AREA_MIN}
            max={MCACRISP_SEARCH_AREA_MAX}
            step={MCACRISP_SEARCH_AREA_STEP}
            value={state.searchArea}
            onChange={(e) =>
              dispatcher({
                type: "SET_PARAM",
                key: "searchArea",
                value: Number(e.target.value),
              })
            }
          />
          <p>{state.searchArea}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Alpha:</p>

        <input
          type="number"
          min={MCACRISP_ALPHA_MIN}
          max={MCACRISP_ALPHA_MAX}
          step={MCACRISP_ALPHA_STEP}
          value={state.alpha}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= MCACRISP_ALPHA_MIN && value <= MCACRISP_ALPHA_MAX) {
              dispatcher({
                type: "SET_PARAM",
                key: "alpha",
                value: value,
              });
            }
          }}
          style={{ backgroundColor: theme.text, color: theme.background }}
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.earlyStop}:</p>

        <input
          type="number"
          min={MCACRISP_EARLY_STOP_MIN}
          max={MCACRISP_EARLY_STOP_MAX}
          step={MCACRISP_EARLY_STOP_STEP}
          value={state.earlyStop}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (
              value >= MCACRISP_EARLY_STOP_MIN &&
              value <= MCACRISP_EARLY_STOP_MAX
            ) {
              dispatcher({
                type: "SET_PARAM",
                key: "earlyStop",
                value: value,
              });
            }
          }}
          style={{ backgroundColor: theme.text, color: theme.background }}
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p>{text.maxIterations}:</p>

        <input
          type="number"
          min={MCACRISP_MAX_ITERATIONS_MIN}
          max={MCACRISP_MAX_ITERATIONS_MAX}
          step={MCACRISP_MAX_ITERATIONS_STEP}
          value={state.maxIterations}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (
              value >= MCACRISP_MAX_ITERATIONS_MIN &&
              value <= MCACRISP_MAX_ITERATIONS_MAX
            ) {
              dispatcher({
                type: "SET_PARAM",
                key: "maxIterations",
                value: value,
              });
            }
          }}
          style={{ backgroundColor: theme.text, color: theme.background }}
        />
      </div>

      <Separator />
    </>
  );
};

export default MCACrispForm;
