import { Component } from '@angular/core';
import { EmployeesService } from "../employees/employees.service";

@Component({
  selector: 'hf-actions',
  templateUrl: './hf-actions.component.html',
  styleUrls: ['./hf-actions.component.scss']
})
export class HfActionsComponent {
  constructor(private _employeesService: EmployeesService) {}

  public handleClickRunCalculations() {
    console.log("handleClickRunCalculations");
    this._employeesService.calculate();
  }

  public handleClickReset() {
    console.log("handleClickReset");
    this._employeesService.reset();
  }
}
