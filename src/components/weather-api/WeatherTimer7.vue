<script setup lang="ts">
import { ref, computed } from "vue";
import { use7timer } from "@/composables/api/weather-api";

const lat = ref(51);
const lon = ref(0);
const url = computed(
  () =>
    `http://www.7timer.info/bin/api.pl?lon=${lon.value}&lat=${lat.value}&product=astro&output=json`
);

const { isFetching, isError, data, error, refetch } = use7timer(lat, lon);

const windToSpeed: { [key: number]: number } = {
  1: 0.3,
  2: 3.4,
  3: 7.8,
  4: 10.2,
  5: 16.6,
  6: 22.5,
  7: 31.7,
  8: 34.1,
} as const;
const forecast = computed(() => {
  const empty: {
    hours: number;
    temp: string;
    humi: string;
    wind: string;
    cloud: string;
  }[] = [];
  if (!data.value?.dataseries) return empty;

  for (const f of data.value.dataseries) {
    empty.push({
      hours: f.timepoint,
      temp: f.temp2m,
      humi: f.rh2m,
      wind: `${windToSpeed[f.wind10m.speed]}m/s ${f.wind10m.direction}`,
      cloud: f.cloudcover,
    });
  }
  return empty;
});
const forecastPoint = ref(0);
const forecastDate = computed(() => {
  const currentDate = new Date();
  currentDate.setTime(
    currentDate.getTime() + forecast.value[forecastPoint.value].hours * 3600000
  );
  return currentDate.toLocaleString("en-UK");
});
</script>

<template>
  <section class="weather">
    <section class="weather__header">
      <h2>7timer Api</h2>
    </section>

    <section class="weather__parameters">
      <h3 class="mb1">Parameters</h3>
      <div class="weather__inputs-grid">
        <label for="lat">Lat</label>
        <input v-model="lat" class="weather__input" id="lat" type="text" />
        <label for="lon">Lon</label>
        <input v-model="lon" class="weather__input" id="lon" type="text" />
        <label for="url">Url</label>
        <input
          v-model="url"
          class="weather__input weather__input--disabled"
          id="url"
          type="text"
        />
        <div :class="{ 'not-allowed': isFetching }">
          <button
            @click="refetch()"
            :class="{
              'weather__button--disabled': isFetching,
            }"
            class="weather__button"
          >
            Request
          </button>
        </div>
      </div>
    </section>

    <article class="weather__data resoults">
      <h3 class="resoults__title mb1">Resoults</h3>
      <div v-if="isError" class="mi1">{{ error }}</div>
      <div v-else-if="isFetching" class="mi1">Fetching data</div>
      <div v-else class="resoults__all mi1">
        <section class="resoults__forecast resoults__column">
          <h4 class="mb1">Forecast</h4>
          <div class="resoults__row">
            <div :class="{ 'not-allowed': forecastPoint <= 0 }">
              <button
                @click="forecastPoint--"
                :class="{ 'weather__button--disabled': forecastPoint <= 0 }"
                class="weather__button"
              >
                &lt;
              </button>
            </div>
            <p class="desktop-only">{{ forecastDate }}</p>
            <p class="mobile-only">{{ forecastDate.substring(0, 10) }}</p>

            <div
              :class="{ 'not-allowed': forecastPoint >= forecast.length - 1 }"
            >
              <button
                @click="forecastPoint++"
                :class="{
                  'weather__button--disabled':
                    forecastPoint >= forecast.length - 1,
                }"
                class="weather__button"
              >
                &gt;
              </button>
            </div>
          </div>
          <div class="resoults__grid">
            <p>Temperature:</p>
            <p>{{ forecast[forecastPoint].temp }}</p>
            <p>Humidity:</p>
            <p>{{ forecast[forecastPoint].humi }}</p>
            <p>Wind:</p>
            <p>{{ forecast[forecastPoint].wind }}</p>
            <p>Clouds:</p>
            <p>{{ forecast[forecastPoint].cloud }}</p>
          </div>
        </section>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">
@import "@/assets/global-weather";
</style>
