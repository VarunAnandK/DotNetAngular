import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from './label.component';
import { GetArrayValuePipe } from 'src/Pipe/GetArrayValue.pipe';
import { GetTaxLabelPipe } from 'src/Pipe/GetTaxLabel.pipe';


@NgModule({
  declarations: [LabelComponent,GetArrayValuePipe,GetTaxLabelPipe],
  imports: [
    CommonModule
  ],
  exports : [LabelComponent,GetArrayValuePipe,GetTaxLabelPipe]
})
export class LabelModule { }
