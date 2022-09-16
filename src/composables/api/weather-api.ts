import { useQuery } from "vue-query";
import axios from "axios";

export function use7timer() {
  return useQuery(
    "countries",
    () =>
      axios(
        "http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json",
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
    "countries",
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
    "countries",
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
    "countries",
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

export function useGoWeather() {
  return useQuery(
    "countries",
    () =>
      axios("https://goweather.herokuapp.com/weather/Curitiba", {
        method: "GET",
      }),
    {
      //placeholderData: { data: { data: [] } },
      //select: (response: { data: any }) => response.data,
    }
  );
}
