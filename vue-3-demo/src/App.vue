<script setup lang="ts">
import { markRaw, onUnmounted, reactive, ref } from 'vue'
import { HyperFormula } from 'hyperformula'

interface InvoiceItem {
  name: string
  qty: number
  price: number
}

const INITIAL_ITEMS: InvoiceItem[] = [
  { name: 'Widget A', qty: 2, price: 19.99 },
  { name: 'Widget B', qty: 1, price: 49.99 },
  { name: 'Widget C', qty: 3, price: 9.99 },
]

const TAX_RATE = 0.1
const SHEET_ID = 0

/**
 * Build the 2D array HyperFormula will evaluate.
 * Rows 0..n-1: item rows with subtotal formulas.
 * Last three rows: subtotal, tax, and total summary rows.
 */
const buildSheetData = (items: InvoiceItem[]): (string | number)[][] => [
  ...items.map((item, index) => [
    item.name,
    item.qty,
    item.price,
    `=B${index + 1}*C${index + 1}`,
  ]),
  ['Subtotal', '', '', `=SUM(D1:D${items.length})`],
  ['Tax', '', '', `=D${items.length + 1}*${TAX_RATE}`],
  ['Total', '', '', `=D${items.length + 1}+D${items.length + 2}`],
]

const items = reactive<InvoiceItem[]>([...INITIAL_ITEMS])

// markRaw prevents Vue from wrapping the HyperFormula instance in a reactive proxy,
// which would interfere with its internal state and trigger runtime errors.
const hf = markRaw(
  HyperFormula.buildFromArray(buildSheetData(items), { licenseKey: 'gpl-v3' })
)

const calculated = ref<(string | number)[][]>(
  hf.getSheetValues(SHEET_ID) as (string | number)[][]
)

const updateCell = (rowIndex: number, column: 'qty' | 'price', value: number) => {
  if (Number.isNaN(value)) return
  items[rowIndex][column] = value
  const cellColumn = column === 'qty' ? 1 : 2
  hf.setCellContents({ sheet: SHEET_ID, row: rowIndex, col: cellColumn }, value)
  calculated.value = hf.getSheetValues(SHEET_ID) as (string | number)[][]
}

const formatMoney = (value: string | number | undefined): string =>
  typeof value === 'number' ? `$${value.toFixed(2)}` : String(value ?? '')

onUnmounted(() => hf.destroy())
</script>

<template>
  <main>
    <h2>Invoice Calculator</h2>
    <p>Edit quantity or price — HyperFormula recalculates subtotals, tax, and total.</p>

    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.name">
          <td>{{ item.name }}</td>
          <td>
            <input
              type="number"
              min="0"
              :value="item.qty"
              @input="updateCell(index, 'qty', Number(($event.target as HTMLInputElement).value))"
            />
          </td>
          <td>
            <input
              type="number"
              min="0"
              step="0.01"
              :value="item.price"
              @input="updateCell(index, 'price', Number(($event.target as HTMLInputElement).value))"
            />
          </td>
          <td>{{ formatMoney(calculated[index]?.[3]) }}</td>
        </tr>
        <tr v-for="row in calculated.slice(items.length)" :key="String(row[0])" class="summary">
          <td colspan="3">{{ row[0] }}</td>
          <td>{{ formatMoney(row[3]) }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
main {
  max-width: 640px;
  margin: 20px auto;
  padding: 0 20px;
}

table {
  width: 100%;
  margin-top: 20px;
}

input[type='number'] {
  width: 100%;
  margin-bottom: 0;
  padding: 4px 8px;
  height: auto;
}

tr.summary td {
  font-weight: 600;
}

tr.summary td:first-child {
  text-align: right;
  text-transform: uppercase;
}

tbody tr:last-child td {
  border-top: 2px solid #606c76;
}
</style>
