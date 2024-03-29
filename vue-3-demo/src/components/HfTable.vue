<script setup lang="ts">
defineProps<{
  data: (string | number)[][]
  totals: (string | number)[]
}>()

function formatNumber(numberAsString: string | number): string {
  const numericValue = Number(numberAsString)
  return isNaN(numericValue) ? String(numberAsString) : numericValue.toFixed(2)
}
</script>

<template>
  <div>
    <table>
      <colgroup>
        <col style="width: 22%" />
        <col style="width: 15%" />
        <col style="width: 23%" />
        <col style="width: 20%" />
        <col style="width: 20%" />
      </colgroup>
      <thead>
        <tr>
          <th>Name</th>
          <th>Year_1</th>
          <th>Year_2</th>
          <th>Average</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rows, rowIndex) in data" :key="rowIndex">
          <td v-for="(cell, cellIndex) in rows" :key="`${rowIndex},${cellIndex}`">
            <span>{{ formatNumber(cell) }}</span>
          </td>
        </tr>
        <tr>
          <td>Total</td>
          <td v-for="(total, cellIndex) in totals" :key="cellIndex">{{ formatNumber(total) }}</td>
          <td />
          <td />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
table {
  table-layout: fixed;
  font-size: 14px;

  thead {
    tr {
      th {
        &:first-child {
          padding-left: 40px;
        }
      }
    }
  }

  tbody {
    tr {
      &:last-child {
        font-weight: 600;

        td {
          &:first-child {
            text-align: right;
            text-transform: uppercase;
          }
        }
      }

      td {
        &.updated-cell {
          span {
            animation-name: cell-appear;
            animation-duration: 0.6s;
          }
        }

        &:first-child {
          text-align: center;
          padding: 0;

          span {
            width: 100%;
            display: inline-block;
            text-align: left;
            padding-left: 15px;
            margin-left: 0;

            &::before {
              counter-increment: row-counter;
              content: counter(row-counter);
              display: inline-block;
              width: 20px;
              position: relative;
              left: -10px;
            }
          }
        }
      }
    }
  }
}

@keyframes cell-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
