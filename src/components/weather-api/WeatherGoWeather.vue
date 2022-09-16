<script setup lang="ts">
import { ref, computed } from "vue";
import { useGoWeather } from "@/composables/api/weather-api";

const city = ref("London");
const citySearch = ref("London");
const url = computed(
  () => `https://goweather.herokuapp.com/weather/${city.value}`
);
function searchWeather() {
  citySearch.value = city.value;
  refetch.value();
}

const { isFetching, isError, data, error, refetch } = useGoWeather(citySearch);

const forecastDay = ref(0);
const forecastDate = computed(() => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1 + forecastDay.value);
  return currentDate.toLocaleDateString("en-UK");
});
const forecast = computed(() => {
  const empty = [];
  if (data.value)
    for (let f of data.value.data.forecast) {
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
        <button @click="searchWeather" class="weather__button">Request</button>
      </div>
    </section>

    <article class="weather__data resoults">
      <h3 class="resoults__title mb1">Resoults</h3>
      <div v-if="isError" class="mi1">{{ error }}</div>
      <div v-else-if="isFetching" class="mi1">Fetching data</div>
      <div v-else class="resoults__all mi1">
        <section class="resoults__current resoults__column">
          <h4 class="mb1">Today</h4>
          <div class="resoults__grid">
            <p>Description:</p>
            <p>{{ data?.data.description }}</p>
            <p>Temperature:</p>
            <p>{{ data?.data.temperature }}</p>
            <p>Wind:</p>
            <p>{{ data?.data.wind }}</p>
          </div>
        </section>
        <section class="resoults__forecast resoults__column">
          <h4 class="mb1">Forecast</h4>
          <div class="resoults__row">
            <button
              @click="forecastDay--"
              :class="{ 'weather__button--disabled': forecastDay <= 0 }"
              class="weather__button"
            >
              &lt;
            </button>
            <p>{{ forecastDate }}</p>
            <button
              @click="forecastDay++"
              :class="{
                'weather__button--disabled': forecastDay >= forecast.length - 1,
              }"
              class="weather__button"
            >
              &gt;
            </button>
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
.weather {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  &__header {
    width: 100%;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__parameters {
    width: 100%;
    padding: 1rem;
  }

  &__inputs-grid {
    margin-inline: 1rem;

    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.2rem;
  }

  &__data {
    width: 100%;
    padding: 1rem;
  }

  &__button {
    width: fit-content;
    border: none;
    background-color: $highlight;

    &:hover {
      background-color: $hover;
    }

    &--disabled {
      pointer-events: none;
      background-color: $hover;
    }
  }

  &__input {
    border-radius: 0;
    border: solid 1px $highlight;
    background-color: $background;
    width: 100%;

    &:focus {
      outline: none;
      border-color: $hover;
    }

    &--disabled {
      pointer-events: none;
      color: $hover;
    }
  }
}

.resoults {
  &__all {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: left;
      gap: 1.5rem;
    }
  }

  &__row {
    display: flex;
    flex-direction: row;
    gap: 0.1rem;
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.4rem;
  }

  /*&__current {
  }
  &__forecats {
  }*/
}

.mb1 {
  margin-bottom: 1rem;
}

.mi1 {
  margin-inline: 1rem;
}
</style>
