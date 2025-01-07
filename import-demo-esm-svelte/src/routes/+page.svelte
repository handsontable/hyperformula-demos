<script>
  import { onMount } from 'svelte';
  import { HyperFormula, AlwaysDense } from 'hyperformula';

  // new way
  import { enUS } from "hyperformula/i18n/languages";
  import frFR from "hyperformula/i18n/languages/frFR";

  // legacy way
  import { csCZ } from "hyperformula/es/i18n/languages";
  import daDK from "hyperformula/es/i18n/languages/daDK";
  import deDE from "hyperformula/es/i18n/languages/deDE.js";

  onMount(() => {
    console.log(HyperFormula != null);
    console.log(AlwaysDense != null);
    console.log(enUS != null);
    console.log(frFR != null);
    console.log(csCZ != null);
    console.log(daDK != null);
    console.log(deDE != null);

    HyperFormula.registerLanguage('enUS', enUS);
    HyperFormula.registerLanguage('frFR', frFR);
    HyperFormula.registerLanguage('csCZ', csCZ);
    HyperFormula.registerLanguage('daDK', daDK);
    HyperFormula.registerLanguage('deDE', deDE);
  });
</script>

<style>
  #main {
    padding: 10px;
  }
</style>

<div id="main">
  Open console
</div>
