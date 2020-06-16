<template>
  <div>
    <table>
      <colgroup>
        <col style="width:25%">
        <col style="width:15%">
        <col style="width:20%">
        <col style="width:20%">
        <col style="width:20%">
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
        <tr v-for="(rows, rowIndex)  in data" :key="rowIndex">
          <td v-for="(cell, cellIndex) in rows" :key="`${rowIndex},${cellIndex}`">{{cell}}</td>
        </tr>
        <tr class="bold">
          <td>Total</td>
          <td v-for="(total, cellIndex) in totals" :key="cellIndex">{{ total }}</td>
          <td/>
          <td/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "Table",
  components: {
    Button
  },
  props: {
    data: {
      type: Array
    },
    totals: {
      type: Array
    }
  }
};
</script>


<style scoped>
.bold {
  font-weight: 700;
}
</style>
