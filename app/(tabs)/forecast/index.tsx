import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as Location from "expo-location";
import { FlatList } from "react-native-gesture-handler";
import ForecastItem from "@/components/ForecastItem";
import { Stack } from "expo-router";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import Pressable from "@/components/Pressable";
import Icon from "@/components/Icon";
import Text from "@/components/Text";

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;
const bgImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg";

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type Weather = {
  name: string;
  main: MainWeather;
  weather: [
    {
      id: string;
      main: string;
      description: string;
      icon: string;
    },
  ];
};

export type WeatherForecast = {
  main: MainWeather;
  dt: number;
};

const WeatherScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState<Weather>();
  const [forecast, setForecast] = useState<WeatherForecast[]>();

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const fetchWeather = async () => {
    if (!location) {
      return;
    }

    const results = await fetch(
      `${BASE_URL}/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`,
    );
    const data = await results.json();
    // console.log(JSON.stringify(data, null, 2));
    setWeather(data);
  };

  const fetchForecast = async () => {
    // api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
    if (!location) {
      return;
    }

    const results = await fetch(
      `${BASE_URL}/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`,
    );
    const data = await results.json();
    // console.log(JSON.stringify(data, null, 2));
    setForecast(data.list);
  };

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Stack.Screen
        options={{ headerShown: false, headerBackButtonMenuEnabled: true }}
      />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            alignSelf: "flex-start",
          }}
        >
          <Pressable
            alignItems="center"
            flexDirection="row"
            onPress={() => {}}
            paddingHorizontal="sml"
            top={-10}
          >
            <Icon
              name="chevron_back"
              size={22}
              style={{
                marginRight: 8,
              }}
            />
            <Text variant="regular14" color="whiteColor">
              {"Go back"}
            </Text>
          </Pressable>
        </View>
        <LottieView
          source={
            weather.weather[0].main === "Rain"
              ? require("@/assets/images/rain.json")
              : require("@/assets/images/sunny.json")
          }
          style={{
            width: 200,
            aspectRatio: 1,
          }}
          loop
          autoPlay
        />
        <Text style={styles.location}>{weather.name}</Text>
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
        <Text style={styles.location}>{weather.weather[0].main}</Text>
      </View>

      <FlatList
        data={forecast}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 0,
          height: 150,
          marginBottom: 40,
        }}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
        }}
        renderItem={({ item }) => <ForecastItem forecast={item} />}
      />

      <StatusBar style="light" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  location: {
    fontSize: 30,
    color: "lightgray",
  },
  temp: {
    fontSize: 150,
    color: "#FEFEFE",
  },
});

export default WeatherScreen;
