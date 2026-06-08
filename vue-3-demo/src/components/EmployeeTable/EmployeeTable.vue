<script setup lang="ts">
import { TableRoot, TableHead, TableRow, TableCell } from '../../components/Table'
import { useEmployees } from '../../lib/employee'

const { employees, totals } = useEmployees()
</script>

<template>
  <TableRoot :colgroup-widths="[22, 15, 23, 20, 20]">
    <thead>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Year_1</TableHead>
        <TableHead>Year_2</TableHead>
        <TableHead>Average</TableHead>
        <TableHead>Sum</TableHead>
      </TableRow>
    </thead>
    <tbody>
      <TableRow v-for="(row, rowIndex) in employees" :key="rowIndex">
        <TableCell v-for="(cell, colIndex) in row" :key="`${rowIndex},${colIndex}`" :value="cell" />
      </TableRow>
      <TableRow bold>
        <TableCell bold value="Total" />
        <TableCell v-for="(total, colIndex) in totals" :key="`5,${colIndex + 1}`" :value="total" />
        <TableCell />
        <TableCell />
      </TableRow>
    </tbody>
  </TableRoot>
</template>
