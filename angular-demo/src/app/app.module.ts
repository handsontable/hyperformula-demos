import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppButton } from './app-button/app-button.component';
import { AppComponent } from './app.component';
import { HfTableComponent } from './hf-table/hf-table.component';
import { HfActionsComponent } from './hf-actions/hf-actions.component';

@NgModule({
  declarations: [
    AppButton,
    AppComponent,
    HfActionsComponent,
    HfTableComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
