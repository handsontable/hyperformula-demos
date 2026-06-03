<script setup lang="ts">
import 'milligram'
import { EmployeesProvider } from './lib/employee'
import { EmployeeActions, EmployeeTable } from './components/EmployeeTable'
</script>

<template>
  <main class="App">
    <EmployeesProvider>
      <EmployeeActions />
      <EmployeeTable />
    </EmployeesProvider>
  </main>
</template>

<style>
body {
  font-family: sans-serif;
  counter-reset: row-counter;
  padding: 15px;
}
</style>
