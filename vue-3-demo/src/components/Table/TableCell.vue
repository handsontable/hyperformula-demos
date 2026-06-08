<script setup lang="ts">
const props = defineProps<{
  value?: string | number
  bold?: boolean
}>()

function formatValue(v?: string | number): string {
  if (v === undefined || v === null || v === '') return ''
  const num = Number(v)
  return isNaN(num) ? String(v) : num.toFixed(2)
}
</script>

<template>
  <td :class="['table-cell', { 'table-cell--bold': props.bold }]" v-bind="$attrs">
    <span class="table-cell-value">{{ formatValue(props.value) }}</span>
  </td>
</template>

<style scoped lang="scss">
.table-cell {
  &:first-child {
    text-align: center;
    padding: 0;

    .table-cell-value {
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

  &--bold {
    text-transform: uppercase;
  }
}
</style>
