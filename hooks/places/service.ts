import { apiInstance } from "../api/api";
import paths from "./paths";
import { PlacesRequest, PlacesResponse } from "./types";

export const usePlacesMutation = () => [
  async ({ city }: PlacesRequest): Promise<PlacesResponse> => {
    const data: PlacesResponse = await apiInstance.request({
      method: "get",
      url: paths.placesApi(city),
    });
    return data;
  },
];
