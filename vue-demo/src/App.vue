<template>
  <main class="App">
    <EmployeesDataProvider>
      <div slot-scope="{ data, totals, setWithCalculationsFlag }">
        <TableActions :setWithCalculationsFlag="setWithCalculationsFlag"/>
        <Table :data="data" :totals="totals"/>
      </div>
    </EmployeesDataProvider>
  </main>
</template>

<script>
  import "milligram";
  import TableActions from "./components/TableActions";
  import Table from "./components/Table";
  import EmployeesDataProvider from "./lib/employees";

  export default {
    name: "App",
    components: {
      Table,
      TableActions,
      EmployeesDataProvider
    }
  };
</script>

<style>
  body {
    font-family: sans-serif;
    counter-reset: row-counter;
    padding: 15px;
  }
</style>
