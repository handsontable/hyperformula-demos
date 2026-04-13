import { Component } from '@angular/core';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /** Indices of rows that are editable items (not summary rows). */
  readonly itemIndices: number[];

  /** Observable of calculated sheet values — the template subscribes via async pipe. */
  readonly calculated$;

  constructor(private readonly invoice: InvoiceService) {
    this.itemIndices = invoice.items.map((_, index) => index);
    this.calculated$ = invoice.getCalculated();
  }

  updateQty(rowIndex: number, value: string): void {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) this.invoice.updateCell(rowIndex, 'qty', parsed);
  }

  updatePrice(rowIndex: number, value: string): void {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) this.invoice.updateCell(rowIndex, 'price', parsed);
  }

  formatMoney(value: string | number | undefined): string {
    return typeof value === 'number' ? `$${value.toFixed(2)}` : String(value ?? '');
  }
}
