<script setup lang="ts">
import { useEmployees } from '../../lib/employee'

const { runCalculations, resetCalculations } = useEmployees()
</script>

<template>
  <button class="button" @click="runCalculations">Run calculations</button>
  <button class="button button--outline" @click="resetCalculations">Reset</button>
</template>

<style scoped lang="scss">
@use 'sass:color';

$ocean-green: #41b883;
$pickled-bluewood: #34495e;

.button {
  margin: 0 10px 20px 0;
  background: $ocean-green;
  border-color: $ocean-green;

  &:hover,
  &:focus-visible {
    background: color.adjust($ocean-green, $lightness: -5%);
    border-color: color.adjust($ocean-green, $lightness: -5%);
  }

  &--outline {
    color: $ocean-green;
    background: transparent;

    &:hover,
    &:focus-visible {
      border-color: $ocean-green;
      background: color.adjust($pickled-bluewood, $lightness: -5%);
    }
  }
}
</style>
