<script setup lang="ts">
import { ref, computed, onActivated, onDeactivated } from "vue";
import { useGoWeather } from "@/composables/api/weather-api";

const selected = ref(true);
onActivated(() => (selected.value = true));
onDeactivated(() => (selected.value = false));

const city = ref("London");
const url = computed(
  () => `https://goweather.herokuapp.com/weather/${city.value}`
);

const { isFetching, isError, data, error, refetch } = useGoWeather(
  city,
  selected
);

const forecastDay = ref(0);
const forecastDate = computed(() => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1 + forecastDay.value);
  return currentDate.toLocaleDateString("en-UK");
});
const forecast = computed(() => {
  const empty: any[] = [];
  if (!data.value) return empty;
  for (let f of data.value.forecast) {
    console.log(f);
    empty.push({ temp: f.temperature, wind: f.wind });
  }
  return empty;
});
</script>

<template>
  <section class="weather">
    <section class="weather__header">
      <h2>GoWeather Api</h2>
    </section>

    <section class="weather__parameters">
      <h3 class="mb1">Parameters</h3>
      <div class="weather__inputs-grid">
        <label for="city">City</label>
        <input v-model="city" class="weather__input" id="city" type="text" />
        <label class="url" for="city">Url</label>
        <input
          v-model="url"
          class="weather__input weather__input--disabled"
          id="city"
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
      <div v-else-if="!data" class="mi1">No data</div>
      <div v-else class="resoults__all mi1">
        <section class="resoults__current resoults__column">
          <h4 class="mb1">Today</h4>
          <div class="resoults__grid">
            <p>Description:</p>
            <p>{{ data.description }}</p>
            <p>Temperature:</p>
            <p>{{ data.temperature }}</p>
            <p>Wind:</p>
            <p>{{ data.wind }}</p>
          </div>
        </section>
        <section class="resoults__forecast resoults__column">
          <h4 class="mb1">Forecast</h4>
          <div class="resoults__row">
            <div :class="{ 'not-allowed': forecastDay <= 0 }">
              <button
                @click="forecastDay--"
                :class="{ 'weather__button--disabled': forecastDay <= 0 }"
                class="weather__button"
              >
                &lt;
              </button>
            </div>
            <p>{{ forecastDate }}</p>

            <div :class="{ 'not-allowed': forecastDay >= forecast.length - 1 }">
              <button
                @click="forecastDay++"
                :class="{
                  'weather__button--disabled':
                    forecastDay >= forecast.length - 1,
                }"
                class="weather__button"
              >
                &gt;
              </button>
            </div>
          </div>
          <div class="resoults__grid">
            <p>Temperature:</p>
            <p>{{ forecast[forecastDay].temp }}</p>
            <p>Wind:</p>
            <p>{{ forecast[forecastDay].wind }}</p>
          </div>
        </section>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">
@import "@/assets/global-weather";
</style>
