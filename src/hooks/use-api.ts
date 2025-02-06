import { ApiContext } from "@/context/api-context";
import { useContext } from "react";

const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within a ApiProvider");
  }
  return context;
};

export default useApi;