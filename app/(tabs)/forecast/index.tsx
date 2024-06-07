import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  RefreshControl,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Location from "expo-location";
import { FlatList } from "react-native-gesture-handler";
import ForecastItem from "@/components/ForecastItem";
import { Link, Stack, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import Text from "@/components/Text";
import Box from "@/components/Box";
import SrfValue from "@/constants/SrfValue";
import useWeatherReport from "@/utils/apiHooks/useWeatherReport";
import useForecastReport from "@/utils/apiHooks/useForecastReport";
import { showToast } from "@/components/Toast/showToast";
import DefaultPlatformLoader from "@/components/Loader/DefaultPlatFormLoader";
import {
  BackspaceIcon,
  CalendarDaysIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import debounce from "lodash/debounce";
import usePlaces from "@/utils/apiHooks/usePlaces";
import SearchInput from "@/components/Input/SearchInput";
import PlacesList from "@/components/Dropdown/PlacesList";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [weather, setWeather] = useState<Weather>();
  const [forecast, setForecast] = useState<WeatherForecast[]>();
  const [showSearch, toggleSearch] = useState(false);
  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { getPlaces } = usePlaces();

  const handleSearch = async (text: string) => {
    if (text && text.length > 2) {
      const result = await getPlaces({ city: text });
      setPlaces(result);
    }
  };

  const delayedHandleSearch = debounce(handleSearch, 1000);
  const handleSearchDebounced = (text: string) => {
    delayedHandleSearch(text);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showToast({
          message: "Permission to access location was denied",
          type: "danger",
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const {
    getWeatherReport,
    loading: weatherLoading,
    status: weatherStatus,
  } = useWeatherReport();
  const {
    getForecastReport,
    loading: forecastLoading,
    status: forecastStatus,
  } = useForecastReport();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location) {
          const payload = {
            latitude: "44.34" || location.coords.latitude.toString(), // "44.34"
            longitude: "10.99" || location.coords.longitude.toString(), // "10.99"
          };

          const forecastData = await getForecastReport(payload);
          if (forecastData) {
            setForecast(forecastData.list);
          }

          const weatherData = await getWeatherReport(payload);
          if (weatherData) {
            setWeather(weatherData);
          }
        }
      } catch (error) {
        showToast({
          message: "Could not complete your request at this time",
          type: "info",
        });
      }
    };

    fetchData();
  }, [location]);

  const handleLoc = async (loc: {
    lat: number;
    lon: number;
    name: string;
    country: string;
  }) => {
    const payload = {
      latitude: loc.lat.toString(),
      longitude: loc.lon.toString(),
    };

    const forecastData = await getForecastReport(payload);
    if (forecastData) {
      setForecast(forecastData.list);
    }

    const weatherData = await getWeatherReport(payload);
    if (weatherData) {
      setWeather(weatherData);
    }
    setPlaces([]);
    setCurrentPlace(`${loc?.name} ${loc?.country}`);
  };

  const router = useRouter();

  useEffect(() => {
    if (weatherStatus === "failure" && forecastStatus === "failure") {
      router.back();
    }
  }, [weatherStatus, forecastStatus, router]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setCurrentPlace("");
      } else {
        showToast({
          message: "Permission to access location was denied",
          type: "danger",
        });
      }
    } catch (error) {
      showToast({
        message: "Could not complete your request at this time",
        type: "info",
      });
    }
    setRefreshing(false);
  };

  if (!weather || forecastLoading || weatherLoading) {
    return (
      <DefaultPlatformLoader
        visible={forecastLoading || weatherLoading}
        size="large"
      />
    );
  }

  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      <ImageBackground source={{ uri: bgImage }} style={styles.container}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            // style={{ flex: 1 }}
          >
            <Stack.Screen options={{ headerShown: false }} />
            <Link
              href="/"
              style={{
                marginTop: SrfValue(40),
                width: "25%",
              }}
            >
              <Box
                alignItems="center"
                alignSelf="flex-start"
                flexDirection="row"
                paddingHorizontal="lg"
                paddingVertical="lg"
                rowGap="md"
              >
                <BackspaceIcon
                  size="12"
                  color="white"
                  style={{ marginRight: SrfValue(8) }}
                />
                <Text variant="regular14" color="whiteColor">
                  {"Go back"}
                </Text>
              </Box>
            </Link>
            <SearchInput
              onSearch={handleSearchDebounced}
              showSearch={showSearch}
              toggleSearch={toggleSearch}
            />

            {places?.length > 0 && showSearch ? (
              <PlacesList places={places} onSelectPlace={handleLoc} />
            ) : null}

            <Box flex={1} mt="lg" alignItems="center" justifyContent="center">
              <Box
                mb="md"
                flexDirection="row"
                gap="sm"
                justifyContent="center"
                alignItems="center"
              >
                <MapPinIcon size="25" color="white" />
                <Text color="white" variant="regular22">
                  {currentPlace || "Your location"}
                </Text>
              </Box>

              <LottieView
                source={
                  weather.weather[0].main === "Rain"
                    ? require("@/assets/images/rain.json")
                    : require("@/assets/images/sunny.json")
                }
                style={{
                  width: 150,
                  aspectRatio: 1,
                }}
                loop
                autoPlay
              />

              <Text style={styles.location}>{weather.name}</Text>
              <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
              <Text style={styles.location}>{weather.weather[0].main}</Text>
            </Box>

            <Box bottom={0} mt="md">
              <Box flexDirection="row" rowGap="sm" ml="md" mb="md" mt="lg">
                <CalendarDaysIcon size="22" color="white" />
                <Text style={{ fontSize: 16, marginLeft: 8 }} color="white">
                  Daily forecast
                </Text>
              </Box>
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
            </Box>

            <StatusBar style="light" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  location: {
    fontSize: 30,
    color: "lightgray",
    marginTop: 15,
  },
  temp: {
    marginTop: SrfValue(25),
    fontSize: 48,
    color: "#FEFEFE",
  },
});

export default WeatherScreen;
