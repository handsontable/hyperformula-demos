<script>
  import { HyperFormula } from 'hyperformula';

  /**
   * @typedef {{ name: string, qty: number, price: number }} InvoiceItem
   */

  const TAX_RATE = 0.1;

  /** @type {InvoiceItem[]} */
  let items = [
    { name: 'Widget A', qty: 2, price: 19.99 },
    { name: 'Widget B', qty: 1, price: 49.99 },
    { name: 'Widget C', qty: 3, price: 9.99 },
  ];

  /**
   * Build the 2D array HyperFormula will evaluate.
   * Rows 0..n-1: item rows with subtotal formulas.
   * Last three rows: subtotal, tax, and total summary rows.
   *
   * @param {InvoiceItem[]} rows
   * @returns {(string | number)[][]}
   */
  const buildSheetData = (rows) => [
    ...rows.map((item, index) => [
      item.name,
      item.qty,
      item.price,
      `=B${index + 1}*C${index + 1}`,
    ]),
    ['Subtotal', '', '', `=SUM(D1:D${rows.length})`],
    ['Tax', '', '', `=D${rows.length + 1}*${TAX_RATE}`],
    ['Total', '', '', `=D${rows.length + 1}+D${rows.length + 2}`],
  ];

  const hf = HyperFormula.buildFromArray(buildSheetData(items), {
    licenseKey: 'gpl-v3',
  });

  /** @type {(string | number)[][]} */
  let calculated = /** @type {(string | number)[][]} */ (hf.getSheetValues(0));

  /**
   * @param {number} rowIndex
   * @param {'qty' | 'price'} column
   * @param {number} value
   */
  const updateCell = (rowIndex, column, value) => {
    const cellColumn = column === 'qty' ? 1 : 2;
    items[rowIndex][column] = value;
    hf.setCellContents({ sheet: 0, row: rowIndex, col: cellColumn }, value);
    calculated = /** @type {(string | number)[][]} */ (hf.getSheetValues(0));
  };

  /** @param {string | number | undefined} value */
  const formatMoney = (value) =>
    typeof value === 'number' ? `$${value.toFixed(2)}` : String(value ?? '');
</script>

<main>
  <h2>Invoice Calculator</h2>
  <p>Edit quantity or price — HyperFormula recalculates subtotals, tax, and total.</p>

  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tbody>
      {#each items as item, index (item.name)}
        <tr>
          <td>{item.name}</td>
          <td>
            <input
              type="number"
              min="0"
              value={item.qty}
              on:input={(event) => updateCell(index, 'qty', Number(event.currentTarget.value))}
            />
          </td>
          <td>
            <input
              type="number"
              min="0"
              step="0.01"
              value={item.price}
              on:input={(event) => updateCell(index, 'price', Number(event.currentTarget.value))}
            />
          </td>
          <td>{formatMoney(calculated[index]?.[3])}</td>
        </tr>
      {/each}
      {#each calculated.slice(items.length) as row (String(row[0]))}
        <tr class="summary">
          <td colspan="3">{row[0]}</td>
          <td>{formatMoney(row[3])}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
  main {
    max-width: 640px;
    margin: 20px auto;
    padding: 0 20px;
    font-family: sans-serif;
  }

  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 8px 12px;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
  }

  th {
    background: #f5f5f5;
  }

  input[type='number'] {
    width: 100%;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  tr.summary td {
    font-weight: 600;
  }

  tr.summary td:first-child {
    text-align: right;
    text-transform: uppercase;
  }

  tbody tr:last-child td {
    border-top: 2px solid #606c76;
    border-bottom: none;
  }
</style>
