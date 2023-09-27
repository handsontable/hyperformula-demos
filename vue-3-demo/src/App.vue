<script setup lang="ts">
import 'milligram'

import ActionButton from './components/ActionButton.vue'

function runCalculations() {
  console.log('run')
}

function reset() {
  console.log('reset')
}
</script>

<template>
  <main>
    <div>
      <ActionButton text="Run calculations" @button-click="runCalculations" />
      <ActionButton text="Reset" outline @button-click="reset" />
    </div>
  </main>
</template>

<style scoped>
  body {
    font-family: sans-serif;
    counter-reset: row-counter;
    padding: 15px;
  }
</style>
