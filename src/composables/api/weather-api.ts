import type { Ref } from "vue";
import { useQuery } from "vue-query";
import axios from "axios";

export function use7timer(
  lat: Ref<number>,
  lon: Ref<number>,
  enabled: Ref<any>
) {
  return useQuery(
    "7timer",
    () =>
      axios(
        `https://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json`,
        {
          method: "GET",
        }
      ),
    {
      //placeholderData: { data: { data: [] } },
      select: (response: { data: { dataseries: any } }) =>
        response.data.dataseries,
      retry: false,
      enabled,
    }
  );
}

export function useOpenMetro(enabled: Ref<any>) {
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
      retry: false,
      enabled,
    }
  );
}

export function useOpenSenseMap(enabled: Ref<any>) {
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
      retry: false,
      enabled,
    }
  );
}

export function useRainViwer(enabled: Ref<any>) {
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
      retry: false,
      enabled,
    }
  );
}

export function useGoWeather(city: Ref<string>, enabled: Ref<any>) {
  return useQuery(
    "goweathers",
    () =>
      axios(`https://goweather.herokuapp.com/weather/${city.value}`, {
        method: "GET",
      }),
    {
      //placeholderData: { data: { data: [] } },
      select: (response: { data: any }) => response.data,
      retry: false,
      enabled,
    }
  );
}
