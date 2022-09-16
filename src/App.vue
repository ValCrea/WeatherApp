<script setup lang="ts">
import WeatherTest from "@/components/WeatherTest.vue";
</script>

<template>
  <div class="weather-container"><WeatherTest /></div>
</template>

<style scoped lang="scss">
.weather-container {
  width: 80%;
  max-width: 50rem;

  margin-top: 10rem;
  margin-inline: auto;
}
</style>
