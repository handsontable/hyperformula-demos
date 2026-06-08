<script setup lang="ts">
defineProps<{
  bold?: boolean
}>()
</script>

<template>
  <tr :class="['table-row', { 'table-row--bold': bold }]" v-bind="$attrs">
    <slot />
  </tr>
</template>

<style scoped lang="scss">
.table-row {
  &--bold {
    font-weight: 600;
  }
}
</style>
