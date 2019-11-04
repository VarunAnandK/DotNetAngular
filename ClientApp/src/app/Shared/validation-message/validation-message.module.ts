import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './validation-message.component';
import { MessageModule } from 'primeng/message';
@NgModule({
  declarations: [ValidationMessageComponent],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports: [ValidationMessageComponent]
})
export class ValidationMessageModule { }
