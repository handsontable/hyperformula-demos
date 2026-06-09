import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeesService } from '../employees/employees.service';
import { AppButtonComponent } from '../app-button/app-button.component';

@Component({
  selector: 'hf-actions',
  imports: [AppButtonComponent],
  templateUrl: './hf-actions.component.html',
  styleUrls: ['./hf-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HfActionsComponent {
  private readonly employeesService = inject(EmployeesService);

  runCalculations() {
    this.employeesService.calculate();
  }

  reset() {
    this.employeesService.reset();
  }
}
