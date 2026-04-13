import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HyperFormula } from 'hyperformula';

export interface InvoiceItem {
  name: string;
  qty: number;
  price: number;
}

const INITIAL_ITEMS: InvoiceItem[] = [
  { name: 'Widget A', qty: 2, price: 19.99 },
  { name: 'Widget B', qty: 1, price: 49.99 },
  { name: 'Widget C', qty: 3, price: 9.99 },
];

const TAX_RATE = 0.1;
const SHEET_ID = 0;

/**
 * Wraps a HyperFormula instance and exposes invoice state as an observable stream.
 * The component interacts with this service instead of touching HyperFormula directly.
 */
@Injectable({ providedIn: 'root' })
export class InvoiceService implements OnDestroy {
  private hf: HyperFormula;
  private readonly itemsCount = INITIAL_ITEMS.length;
  private readonly calculated$ = new BehaviorSubject<(string | number)[][]>([]);

  readonly items: InvoiceItem[] = [...INITIAL_ITEMS];

  constructor() {
    this.hf = HyperFormula.buildFromArray(this.buildSheetData(this.items), {
      licenseKey: 'gpl-v3',
    });
    this.emitCalculated();
  }

  /** Stream of the calculated sheet values; subscribes render the table. */
  getCalculated(): Observable<(string | number)[][]> {
    return this.calculated$.asObservable();
  }

  /** Update a single editable cell (qty or price) and recalculate. */
  updateCell(rowIndex: number, column: 'qty' | 'price', value: number): void {
    this.items[rowIndex] = { ...this.items[rowIndex], [column]: value };

    const cellColumn = column === 'qty' ? 1 : 2;
    this.hf.setCellContents({ sheet: SHEET_ID, row: rowIndex, col: cellColumn }, value);
    this.emitCalculated();
  }

  ngOnDestroy(): void {
    this.hf.destroy();
  }

  private buildSheetData(items: InvoiceItem[]): (string | number)[][] {
    return [
      ...items.map((item, index) => [
        item.name,
        item.qty,
        item.price,
        `=B${index + 1}*C${index + 1}`,
      ]),
      ['Subtotal', '', '', `=SUM(D1:D${this.itemsCount})`],
      ['Tax', '', '', `=D${this.itemsCount + 1}*${TAX_RATE}`],
      ['Total', '', '', `=D${this.itemsCount + 1}+D${this.itemsCount + 2}`],
    ];
  }

  private emitCalculated(): void {
    this.calculated$.next(this.hf.getSheetValues(SHEET_ID) as (string | number)[][]);
  }
}
