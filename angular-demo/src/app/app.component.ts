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

  updateQty(rowIndex: number, value: number | null): void {
    if (value !== null && !Number.isNaN(value)) {
      this.invoice.updateCell(rowIndex, 'qty', value);
    }
  }

  updatePrice(rowIndex: number, value: number | null): void {
    if (value !== null && !Number.isNaN(value)) {
      this.invoice.updateCell(rowIndex, 'price', value);
    }
  }

  formatMoney(value: string | number | undefined): string {
    return typeof value === 'number' ? `$${value.toFixed(2)}` : String(value ?? '');
  }
}
