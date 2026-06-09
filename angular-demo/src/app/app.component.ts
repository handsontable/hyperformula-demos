import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HfActionsComponent } from './hf-actions/hf-actions.component';
import { HfTableComponent } from './hf-table/hf-table.component';

@Component({
  selector: 'app-root',
  imports: [HfActionsComponent, HfTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
