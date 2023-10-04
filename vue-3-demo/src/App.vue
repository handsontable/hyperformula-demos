<script setup lang="ts">
import 'milligram'
import { ref, type Ref } from 'vue'
import { EmployeesDataProvider } from './lib/employees-data-provider'
import ActionButton from './components/ActionButton.vue'
import HfTable from './components/HfTable.vue'

const employeesDataProvider = new EmployeesDataProvider()
let data: Ref<(string | number)[][]> = ref([])
let totals: Ref<(string | number)[]> = ref([])
reset()

function runCalculations() {
  data.value = employeesDataProvider.getTabularData({ calculated: true })
  totals.value = employeesDataProvider.getTotals({ calculated: true })
}

function reset() {
  data.value = employeesDataProvider.getTabularData({ calculated: false })
  totals.value = employeesDataProvider.getTotals({ calculated: false })
}
</script>

<template>
  <main>
    <ActionButton text="Run calculations" @button-click="runCalculations" />
    <ActionButton text="Reset" outline @button-click="reset" />
    <HfTable :data="data" :totals="totals" />
  </main>
</template>

<style scoped>
body {
  font-family: sans-serif;
  counter-reset: row-counter;
  padding: 15px;
}
</style>
