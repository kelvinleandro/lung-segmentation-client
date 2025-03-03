import { createContext, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Contours } from "@/types/image";

type ApiResponse = {
  contours: Contours;
  preprocessed?: string;
};

type ApiContextType = {
  changeBaseUrl: (url: string) => void;
  baseUrl: string;
  sendFileToServer: (file: File) => Promise<ApiResponse | undefined>;
};

export const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const [baseUrl, setBaseUrl] = useState<string>("http://127.0.0.1:5000");

  const instance = useMemo(() => {
    return axios.create({
      baseURL: baseUrl,
    });
  }, [baseUrl]);

  const changeBaseUrl = (url: string) => {
    const trimmedUrl = url.trim();

    if (trimmedUrl === "") {
      throw new Error("URL cannot be empty. Please enter a valid URL.");
    }

    if (
      !trimmedUrl.startsWith("http://") &&
      !trimmedUrl.startsWith("https://")
    ) {
      throw new Error("URL must start with 'http://' or 'https://'.");
    }

    setBaseUrl(trimmedUrl);
  };

  const sendFileToServer = useCallback(
    async (file: File) => {
      if (!instance) {
        console.error("Axios instance not initialized yet.");
        return;
      }

      const formData = new FormData();
      formData.append("dicom", file);

      try {
        const response = await instance.post<ApiResponse>(`/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Response from server:", response.data);

        if (response.data.contours) {
          return response.data;
        }
      } catch (error) {
        console.error("Error sending DICOM file:", error);
      }
    },
    [instance]
  );

  return (
    <ApiContext.Provider value={{ changeBaseUrl, baseUrl, sendFileToServer }}>
      {children}
    </ApiContext.Provider>
  );
};
