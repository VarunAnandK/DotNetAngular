import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from './label.component';
import { GetArrayValuePipe } from 'src/Pipe/GetArrayValue.pipe';
import { GetSumValuePipe } from 'src/Pipe/GetSumValue.pipe';
import { RightbuttonDirective } from 'src/app/Directives/rightbutton.directive';
import { SafePipe } from 'src/Pipe/SafePipe.pipe';
import { GroupByPipe } from 'src/Pipe/groupby.pipe';
import { GetImagePipe } from 'src/Pipe/GetImagePipe.pipe';
import { TwoDecimalPoint } from 'src/app/Directives/two-decimal.directive';
import { ThreeDecimalPoint } from 'src/app/Directives/three-decimal.directive';
import { MyFilterPipe } from 'src/Pipe/MyFilter.pipe';
import { distinctPipe } from 'src/Pipe/distinct.pipe';
@NgModule({
  declarations: [LabelComponent, GetArrayValuePipe,  GetSumValuePipe, RightbuttonDirective, SafePipe, TwoDecimalPoint, ThreeDecimalPoint, GroupByPipe, GetImagePipe,MyFilterPipe,distinctPipe],
  imports: [
    CommonModule
  ],
  exports: [LabelComponent, GetArrayValuePipe,  GetSumValuePipe, RightbuttonDirective, SafePipe, TwoDecimalPoint, ThreeDecimalPoint, GroupByPipe, GetImagePipe,MyFilterPipe,distinctPipe]
})
export class LabelModule { }
