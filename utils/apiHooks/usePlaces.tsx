import { showToast } from "@/components/Toast/showToast";
import { statusCodes } from "@/hooks/api/statusCodes";
import { usePlacesMutation } from "@/hooks/places/service";
import { PlacesRequest } from "@/hooks/places/types";
import { useState } from "react";

const usePlaces = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"success" | "failure">();
  const [places] = usePlacesMutation();

  const getPlaces = async (payload: PlacesRequest): Promise<any> => {
    setLoading(true);

    try {
      const resp = await places(payload);
      const { status: responseStatus, data } = resp;

      if (responseStatus.toString() !== statusCodes.SUCCESS.toString()) {
        setStatus("failure");
        showToast({
          message: "Currently unable to process your request. Please try again",
          type: "danger",
        });
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
    getPlaces,
  };
};

export default usePlaces;
