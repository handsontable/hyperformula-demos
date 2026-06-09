import { Injectable, signal } from "@angular/core";

import {
  initializeHFValues,
  initializeHF,
  initializeNamedExpressions,
} from './employees.helper';

import { EMPLOYEES } from "./employees-mock";
import { HyperFormula } from 'hyperformula';

const TOTALS = ["=SUM(Year_1)", "=SUM(Year_2)"];
const EMPLOYEE_SHEET_ID = "employeeSheet";

export type CellValue = string | number;
export type Row = CellValue[];

const formatValue = (value: unknown): CellValue =>
  typeof value === "number" ? value.toFixed(2) : String(value);

@Injectable({
  providedIn: "root"
})
export class EmployeesService {
  private readonly hf: HyperFormula;
  private readonly sheetId: number;

  private readonly _employees = signal<Row[]>([]);
  private readonly _totals = signal<CellValue[]>([]);

  readonly employees = this._employees.asReadonly();
  readonly totals = this._totals.asReadonly();

  constructor() {
    const { hf, sheetId, sheetName } = initializeHF(EMPLOYEE_SHEET_ID);

    this.hf = hf;
    this.sheetId = sheetId;

    // Fill the HyperFormula sheet with data.
    initializeHFValues(hf, sheetId, EMPLOYEES);

    // Add named expressions.
    initializeNamedExpressions(hf, sheetName);

    this.reset();
  }

  calculate() {
    const employees: Row[] = this.hf
      .getSheetValues(this.sheetId)
      .map(row => row.map(formatValue));

    const totals: CellValue[] = TOTALS.map(expression =>
      formatValue(this.hf.calculateFormula(expression, this.sheetId))
    );

    this._employees.set(employees);
    this._totals.set(totals);
  }

  reset() {
    // Clone the mock so the source data is never mutated.
    this._employees.set(EMPLOYEES.map(row => [...row]));
    this._totals.set([...TOTALS]);
  }
}
