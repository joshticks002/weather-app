import { apiInstance } from "../api/api";
import paths from "./paths";
import { WeatherRequest, WeatherResponse } from "./types";

export const useWeatherMutation = () => [
  async ({ longitude, latitude }: WeatherRequest): Promise<WeatherResponse> => {
    const data: WeatherResponse = await apiInstance.request({
      method: "get",
      url: paths.openWeatherApi(longitude, latitude),
    });
    return data;
  },
];

export const useForecastMutation = () => [
  async ({ longitude, latitude }: WeatherRequest): Promise<WeatherResponse> => {
    const data: WeatherResponse = await apiInstance.request({
      method: "get",
      url: paths.forecast(longitude, latitude),
    });
    return data;
  },
];
