import { Component } from '@angular/core';
import { EmployeesService } from "../employees/employees.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'hf-table',
  templateUrl: './hf-table.component.html',
  styleUrls: ['./hf-table.component.scss']
})
export class HfTableComponent {
  employees$?: Observable<any[]>;
  totals$?: Observable<any[]>;

  constructor(private _employeesService: EmployeesService) {
    if (this._employeesService) {
      this.employees$ = this._employeesService.employees;
      this.totals$ = this._employeesService.totals;
    }
  }
}
