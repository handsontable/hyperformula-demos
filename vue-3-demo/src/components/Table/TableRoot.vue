<script setup lang="ts">
defineProps<{
  colgroupWidths?: number[]
}>()
</script>

<template>
  <table class="table">
    <colgroup>
      <col v-for="(width, idx) in colgroupWidths" :key="idx" :style="{ width: `${width}%` }" />
    </colgroup>
    <slot />
  </table>
</template>

<style scoped lang="scss">
.table {
  table-layout: fixed;
  font-size: 14px;
}
</style>
