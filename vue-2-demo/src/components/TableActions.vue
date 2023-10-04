<template>
  <div>
    <Button text="Run calculations" :on-click="handleClickRunCalculations"/>
    <Button text="Reset" outline :on-click="handleClickReset"/>
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "TableActions",
  components: {
    Button
  },
  methods: {
    handleClickRunCalculations: function() {
      this.setWithCalculationsFlag(true);
    },
    handleClickReset: function() {
      this.setWithCalculationsFlag(false);
    }
  },
  props: {
    setWithCalculationsFlag: Function
  }
};
</script>
