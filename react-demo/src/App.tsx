import React, { useEffect, useRef, useState } from 'react';
import { HyperFormula } from 'hyperformula';

type Item = { name: string; qty: number; price: number };

const INITIAL_ITEMS: Item[] = [
  { name: 'Widget A', qty: 2, price: 19.99 },
  { name: 'Widget B', qty: 1, price: 49.99 },
  { name: 'Widget C', qty: 3, price: 9.99 },
];

const TAX_RATE = 0.1;

/**
 * Build the 2D array HyperFormula will evaluate.
 * Rows 0-2: item rows with subtotal formulas.
 * Rows 3-5: subtotal, tax, and total summary rows.
 */
const buildSheetData = (items: Item[]): (string | number)[][] => [
  ...items.map((item, index) => [
    item.name,
    item.qty,
    item.price,
    `=B${index + 1}*C${index + 1}`,
  ]),
  ['Subtotal', '', '', `=SUM(D1:D${items.length})`],
  ['Tax', '', '', `=D${items.length + 1}*${TAX_RATE}`],
  ['Total', '', '', `=D${items.length + 1}+D${items.length + 2}`],
];

const formatMoney = (value: unknown): string =>
  typeof value === 'number' ? `$${value.toFixed(2)}` : String(value ?? '');

export default function App() {
  const hfRef = useRef<HyperFormula | null>(null);
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [calculated, setCalculated] = useState<(string | number)[][]>([]);

  // Initialize HyperFormula once, on mount.
  useEffect(() => {
    hfRef.current = HyperFormula.buildFromArray(buildSheetData(INITIAL_ITEMS), {
      licenseKey: 'gpl-v3',
    });
    setCalculated(hfRef.current.getSheetValues(0) as (string | number)[][]);

    return () => hfRef.current?.destroy();
  }, []);

  // Update a single editable cell (qty or price) and recalculate.
  const updateCell = (rowIndex: number, column: 'qty' | 'price', raw: string) => {
    const numericValue = Number(raw);
    if (Number.isNaN(numericValue) || !hfRef.current) return;

    const nextItems = items.map((item, index) =>
      index === rowIndex ? { ...item, [column]: numericValue } : item
    );
    setItems(nextItems);

    const cellColumn = column === 'qty' ? 1 : 2;
    hfRef.current.setCellContents(
      { sheet: 0, row: rowIndex, col: cellColumn },
      numericValue
    );
    setCalculated(hfRef.current.getSheetValues(0) as (string | number)[][]);
  };

  return (
    <main className="container">
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
          {items.map((item, index) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={item.qty}
                  onChange={(event) => updateCell(index, 'qty', event.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(event) => updateCell(index, 'price', event.target.value)}
                />
              </td>
              <td>{formatMoney(calculated[index]?.[3])}</td>
            </tr>
          ))}
          {calculated.slice(items.length).map((row, offset) => (
            <tr key={String(row[0])} className="summary">
              <td colSpan={3}>{row[0]}</td>
              <td>{formatMoney(row[3])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
