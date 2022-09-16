import type { Ref } from "vue";
import { useQuery } from "vue-query";
import axios from "axios";

export function use7timer(lat: Ref<number>, lon: Ref<number>) {
  return useQuery(
    "7timer",
    () =>
      axios(
        `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=astro&output=json`,
        {
          method: "GET",
        }
      ),
    {
      //placeholderData: { data: { data: [] } },
      select: (response: { data: any }) => response.data,
    }
  );
}

export function useOpenMetro() {
  return useQuery(
    "openmetro",
    () =>
      axios(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m",
        {
          method: "GET",
        }
      ),
    {
      //placeholderData: { data: { data: [] } },
      //select: (response: { data: any }) => response.data,
    }
  );
}

export function useOpenSenseMap() {
  return useQuery(
    "opensensemap",
    () =>
      axios(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m",
        {
          method: "GET",
        }
      ),
    {
      //placeholderData: { data: { data: [] } },
      //select: (response: { data: any }) => response.data,
    }
  );
}

export function useRainViwer() {
  return useQuery(
    "rainviwer",
    () =>
      axios(
        "https://tilecache.rainviewer.com/v2/radar/1663309800/512/2/2/1/1/1_1.png",
        {
          method: "GET",
        }
      ),
    {
      //placeholderData: { data: { data: [] } },
      //select: (response: { data: any }) => response.data,
    }
  );
}

export function useGoWeather(city: Ref<string>) {
  return useQuery(
    "goweathers",
    () =>
      axios(`https://goweather.herokuapp.com/weather/${city.value}`, {
        method: "GET",
      }),
    {
      //placeholderData: { data: { data: [] } },
      //select: (response: { data: any }) => response.data,
    }
  );
}
