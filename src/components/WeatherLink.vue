<script setup lang="ts">
import type { Api } from "@/utils/weather-api";

const props = defineProps<{
  id: Api;
  selectedId: Api;
}>();

const emit = defineEmits<{
  // Eslint bug, event is used
  // eslint-disable-next-line no-unused-vars
  (e: "update:selectedId", selectedId: Api): void;
}>();
</script>

<template>
  <li
    @click="emit('update:selectedId', props.id)"
    :class="{ 'link--selected': props.selectedId == props.id }"
    class="link"
  >
    <slot>Default</slot>
  </li>
</template>

<style scoped lang="scss">
.link {
  text-align: center;
  overflow-x: hidden;
  cursor: pointer;

  &--selected {
    background-color: #e5e5e5;
  }
}
</style>
