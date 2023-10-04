<template>
  <button class="button" :class="{ 'button-outline': outline }" @click="onClick">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    outline: Boolean,
    text: {
      type: String,
      default: ""
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style scoped lang="scss">
$ocean-green: #41B883;
$pickled-bluewood: #34495E;

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
