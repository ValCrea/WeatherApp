<script setup lang="ts">
import { ref } from "vue";
import WeatherLink from "@/components/WeatherLink.vue";

import { Api, weatherComponentTable } from "@/utils/weather-api";
//import { useGoWeather } from "@/composables/api/weather-api";

//const { isLoading, isError, data, error } = useGoWeather();

const selectedApi = ref(Api.Timer7);
</script>

<template>
  <section class="weather">
    <ul class="weather__links">
      <WeatherLink v-model:selectedId="selectedApi" :id="Api.Timer7">
        7timer
      </WeatherLink>
      <WeatherLink v-model:selectedId="selectedApi" :id="Api.OpenMetro">
        OpenMetro
      </WeatherLink>
      <WeatherLink v-model:selectedId="selectedApi" :id="Api.OpenSenseMap">
        OpenSenseMap
      </WeatherLink>
      <WeatherLink v-model:selectedId="selectedApi" :id="Api.RainViwer">
        RainViwer
      </WeatherLink>
      <WeatherLink v-model:selectedId="selectedApi" :id="Api.GoWeather">
        GoWeather
      </WeatherLink>
    </ul>
    <section class="weather__parameters">
      <KeepAlive>
        <component :is="weatherComponentTable[selectedApi]" />
      </KeepAlive>
    </section>
  </section>
</template>

<style scoped lang="scss">
.weather {
  width: 100%;
  height: 100%;

  &__links {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-content: stretch;

    list-style-type: none;
    margin: 0;
    padding: 0;

    background-color: $background;
  }

  &__parameters {
    background-color: $foreground;
  }
}
</style>
