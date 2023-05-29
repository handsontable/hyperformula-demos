import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

import {
  initHFValues,
  initializeHF,
  initializeNamedExpressions,
} from './employees.helper';

import { EMPLOYEES } from "./employees-mock";
import { HyperFormula } from 'hyperformula';

const TOTALS = ["=SUM(Year_1)", "=SUM(Year_2)"];
const EMPLOYEE_SHEET_ID = "employeeSheet";

@Injectable({
  providedIn: "root"
})
export class EmployeesService {
  private hf: HyperFormula;
  private sheetId: number;
  private sheetName: string;

  private _employees = new BehaviorSubject<any[]>([]);
  private _totals = new BehaviorSubject<any[]>([]);
  private dataStore = { employees: [], totals: [] };

  readonly employees = this._employees.asObservable();
  readonly totals = this._totals.asObservable();

  constructor() {
    const { hf, sheetId, sheetName } = initializeHF(EMPLOYEE_SHEET_ID);

    this.hf = hf;
    this.sheetId = sheetId;
    this.sheetName = sheetName;

    // Fill the HyperFormula sheet with data.
    initHFValues(hf, sheetId, EMPLOYEES);

    // Add named expressions
    initializeNamedExpressions(hf, sheetName);

    this.reset();
  }

  public calculate() {
    this.dataStore.employees = this.hf
      .getSheetValues(this.sheetId)
      .map(values => {
        const newValues = [];

        values.forEach((value: number) => {
          if (!isNaN(value)) {
            newValues.push(value.toFixed(2));
          } else {
            newValues.push(value);
          }
        });

        return newValues;
      });

    this.dataStore.totals = TOTALS.map(expression => {
      return (this.hf.calculateFormula(expression, this.sheetId) as number).toFixed(2);
    });

    this._employees.next(Object.assign({}, this.dataStore).employees);
    this._totals.next(Object.assign({}, this.dataStore).totals);
  }

  public reset() {
    this.dataStore.employees = EMPLOYEES;
    this.dataStore.totals = TOTALS;

    this._employees.next(Object.assign({}, this.dataStore).employees);
    this._totals.next(Object.assign({}, this.dataStore).totals);
  }
}
