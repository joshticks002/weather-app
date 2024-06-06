import { showToast } from "@/components/Toast/showToast";
import { statusCodes } from "@/hooks/api/statusCodes";
import { useForecastMutation } from "@/hooks/weather/service";
import { WeatherRequest } from "@/hooks/weather/types";
import { useState } from "react";

const useForecastReport = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"success" | "failure">();
  const [forecast] = useForecastMutation();

  const getForecastReport = async (payload: WeatherRequest): Promise<any> => {
    setLoading(true);
    try {
      const resp = await forecast(payload);
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
    getForecastReport,
  };
};

export default useForecastReport;
