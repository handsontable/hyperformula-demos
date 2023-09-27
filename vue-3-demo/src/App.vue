<script setup lang="ts">
import 'milligram'

import ActionButton from './components/ActionButton.vue'
import HfTable from './components/HfTable.vue'

const data = [['Lorem Ipsum', '2', '3', '4', '5']]
const totals = ['total 1', 'total 2']

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
      <HfTable :data="data" :totals="totals" />
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
