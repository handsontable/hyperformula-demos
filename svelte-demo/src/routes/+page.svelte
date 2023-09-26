<script>
  import HyperFormula from './Hyperformula.svelte';
  
  const data = [['10', '20', '3.14159265359', '=SUM(A1:C1)']];
  const options = {
    precisionRounding: 10,
    licenseKey: 'gpl-v3'
  };

</script>

<style>
  #main {
    padding: 10px;
  }
</style>

<div id="main">
  <HyperFormula {data} {options} />
</div>
