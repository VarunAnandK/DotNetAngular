import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialUserRoutingModule } from './partial-user-routing.module';
import { PartialUserComponent } from './partial-user.component';
import { ModuleData } from 'src/Helper/Modules';

@NgModule({
  declarations: [PartialUserComponent],
  imports: [
    CommonModule,
    PartialUserRoutingModule,
    ModuleData,
  ],
  exports: [PartialUserComponent]
})
export class PartialUserModule { }
