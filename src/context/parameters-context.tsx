import { createContext, useState } from "react";
import { ApplicationMode } from "@/types/parameters";

type ParametersContextType = {
  mode: ApplicationMode;

  setMode: (mode: ApplicationMode) => void;
};

export const ParametersContext = createContext<ParametersContextType | null>(
  null
);

export const ParametersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<ApplicationMode>("segmentation");

  return (
    <ParametersContext.Provider value={{ mode, setMode }}>
      {children}
    </ParametersContext.Provider>
  );
};
