<template>
  <th class="table-head" v-bind="$attrs"><slot /></th>
</template>

<style scoped lang="scss">
.table-head:first-child {
  padding-left: 40px;
}
</style>
