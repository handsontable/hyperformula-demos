import { Component, OnInit } from '@angular/core';
import { EmployeesService } from "../employees/employees.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'hf-table',
  templateUrl: './hf-table.component.html',
  styleUrls: ['./hf-table.component.scss']
})
export class HfTableComponent {
  employees$ = this._employeesService.employees;
  totals$ = this._employeesService.totals;

  constructor(private _employeesService: EmployeesService) {}
}
