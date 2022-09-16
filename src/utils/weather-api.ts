// @ts-nocheck
import WeatherTimer7 from "@/components/weather-api/WeatherTimer7.vue";
import WeatherOpenMetro from "@/components/weather-api/WeatherOpenMetro.vue";
import WeatherOpenSenseMap from "@/components/weather-api/WeatherOpenSenseMap.vue";
import WeatherRainViwer from "@/components/weather-api/WeatherRainViwer.vue";
import WeatherGoWeather from "@/components/weather-api/WeatherGoWeather.vue";

export enum Api {
  Timer7 = 1,
  OpenMetro,
  OpenSenseMap,
  RainViwer,
  GoWeather,
}

export const weatherComponentTable = {
  [Api.Timer7]: WeatherTimer7,
  [Api.OpenMetro]: WeatherOpenMetro,
  [Api.OpenSenseMap]: WeatherOpenSenseMap,
  [Api.RainViwer]: WeatherRainViwer,
  [Api.GoWeather]: WeatherGoWeather,
} as const;
