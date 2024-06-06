import { EXPO_PUBLIC_OPEN_WEATHER_KEY } from "@env";

export default {
  openWeatherApi: (latitude: string, longitude: string) =>
    `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${EXPO_PUBLIC_OPEN_WEATHER_KEY}&units=metric`,
  forecast: (latitude: string, longitude: string) =>
    `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${EXPO_PUBLIC_OPEN_WEATHER_KEY}&units=metric`,
};
