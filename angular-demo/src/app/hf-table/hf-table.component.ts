import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeesService } from '../employees/employees.service';

@Component({
  selector: 'hf-table',
  templateUrl: './hf-table.component.html',
  styleUrls: ['./hf-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HfTableComponent {
  private readonly employeesService = inject(EmployeesService);

  readonly employees = this.employeesService.employees;
  readonly totals = this.employeesService.totals;
}
