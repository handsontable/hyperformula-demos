<script>
  import { HyperFormula } from 'hyperformula';

  console.log(`%c Using HyperFormula ${HyperFormula.version}`, 'color: blue; font-weight: bold');


  export let options = {};
  export let data = [[]];

  // build an instance with passed options and data 
  const hfInstance = HyperFormula.buildFromArray(data, options);

  // default sheet
  const sheetId = 0;

  // calculated sum
  let sum = '';

  const formulaAddress = { sheet: sheetId, row: 0, col: 3};
  const formulaAddressPreview = hfInstance.simpleCellAddressToString(formulaAddress, sheetId);

  const calculate = () => {
    sum = hfInstance.getCellValue(formulaAddress);
  };

</script>

<style>
  .example button.run {
    background-color: #1c49e4;
    border-color: #1c49e4;
    margin-bottom: 10px;
  }

  .example button.run:hover {
    background-color: #2350ea;
  }

  table tbody tr td:first-child {
    text-align: center;
    padding: 0;
  }

  table {
    table-layout: fixed;
  }

  table tbody tr td,
  table thead tr th {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  table thead tr th:first-child {
    padding-left: 40px;
  }

  .address-preview {
    font-weight: bold;
  }

  div.result {
    display: inline-block;
    margin: 0 0 0 15px;
  }

</style>

<div class="example">
  <button class="button run" on:click={calculate}>
    Calculate
  </button>
  <div class="result">
    <span><span class="address-preview">{formulaAddressPreview}</span> result: </span>
    <strong>{sum}</strong>
  </div>
  <table>
    <colgroup>
      <col />
      <col style="width:25%"/>
      <col style="width:25%"/>
      <col style="width:25%"/>
    </colgroup>
    <thead>
        <tr>
          <th></th>
          {#each data[0] as cell, i}
            <th>
              {String.fromCharCode(0xfeff0041 + i)}
            </th>
          {/each}
        </tr>
    </thead>
    <tbody>
      {#each data as row, rowIdx}
        <tr>
          <td>{rowIdx + 1}</td>
          {#each row as cell, colIdx}
            <td>
              {#if hfInstance.doesCellHaveFormula({ sheet: sheetId, col: colIdx, row: rowIdx })}
                {hfInstance.getCellFormula({ sheet: sheetId, col: colIdx, row: rowIdx })}
              {:else}
                {hfInstance.getCellValue({ sheet: sheetId, col: colIdx, row: rowIdx })}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>