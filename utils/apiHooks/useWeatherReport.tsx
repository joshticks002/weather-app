import { showToast } from "@/components/Toast/showToast";
import { statusCodes } from "@/hooks/api/statusCodes";
import { useWeatherMutation } from "@/hooks/weather/service";
import { WeatherRequest } from "@/hooks/weather/types";
import { useState } from "react";

const useWeatherReport = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"success" | "failure">();
  const [weather] = useWeatherMutation();

  const getWeatherReport = async (payload: WeatherRequest): Promise<any> => {
    setLoading(true);

    try {
      const resp = await weather(payload);
      const { status: responseStatus, data } = resp;

      if (responseStatus.toString() !== statusCodes.SUCCESS.toString()) {
        showToast({
          message: "Currently unable to process your request. Please try again",
          type: "danger",
        });
        setStatus("failure");
        return null;
      }
      setStatus("success");

      return data;
    } catch (error) {
      showToast({
        message: "Currently unable to process your request. Please try again",
        type: "danger",
      });

      setStatus("failure");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    loading,
    getWeatherReport,
  };
};

export default useWeatherReport;
