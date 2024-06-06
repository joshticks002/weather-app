import { WEATHER_API_KEY } from "@env";

export default {
  placesApi: (city: string) =>
    `api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${city}`,
};
