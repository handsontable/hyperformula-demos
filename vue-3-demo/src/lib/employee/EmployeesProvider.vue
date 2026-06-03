<script setup lang="ts">
import { ref, provide, onBeforeUnmount } from 'vue'
import { EmployeesKey } from './employee.composable'
import {
  initializeHF,
  initializeNamedExpressions,
  initHFValues,
  formatCellValues
} from './employee.hf'
import { tableData } from './fixtures/data'
import type { EmployeeRow } from './types'

const TOTAL_EXPRESSIONS = ['=SUM(Year_1)', '=SUM(Year_2)']
const EMPLOYEE_SHEET_ID = 'employeeSheet'

const employees = ref<EmployeeRow[]>([])
const totals = ref<string[]>([])

function runCalculations() {
  const calculated = hf.getSheetValues(sheetId)
  employees.value = formatCellValues(calculated)
  totals.value = TOTAL_EXPRESSIONS.map(
    (expr) => hf.calculateFormula(expr, sheetId)?.toString() ?? ''
  )
}

function resetCalculations() {
  const serialized = hf.getSheetSerialized(sheetId)
  employees.value = formatCellValues(serialized)
  totals.value = [...TOTAL_EXPRESSIONS]
}

/** INITIALIZE */
const { hf, sheetId, sheetName } = initializeHF(EMPLOYEE_SHEET_ID)
// Fill the HyperFormula sheet with data.
initHFValues(hf, sheetId, tableData)
// Add named expressions
initializeNamedExpressions(hf, sheetName)
// Initialize the state
resetCalculations()

provide(EmployeesKey, { employees, totals, runCalculations, resetCalculations })

onBeforeUnmount(() => hf.destroy())
</script>

<template>
  <slot />
</template>
