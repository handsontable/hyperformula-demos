<script setup lang="ts">
defineProps<{
  text: string
  outline?: boolean
}>()
</script>

<template>
  <button class="button" :class="{ 'button-outline': outline }" @click="$emit('buttonClick')">
    {{ text }}
  </button>
</template>

<style scoped, lang="scss">
$ocean-green: #41b883;
$pickled-bluewood: #34495e;

/** override */
.button {
  margin: 0 10px 20px 0;
  background: $ocean-green;
  border-color: $ocean-green;

  &:active,
  &:focus {
    background: $ocean-green;
    border-color: $ocean-green;
  }

  &:hover {
    background: darken($ocean-green, 5%);
    border-color: darken($ocean-green, 5%);
  }

  &.button-outline {
    color: $ocean-green;
    background: $pickled-bluewood;

    &:active,
    &:focus {
      color: $ocean-green;
      border-color: $ocean-green;
    }

    &:hover {
      color: darken($ocean-green, 5%);
      border-color: darken($ocean-green, 5%);
    }
  }
}
</style>
