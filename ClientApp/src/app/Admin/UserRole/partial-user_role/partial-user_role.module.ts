import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialUserRoleRoutingModule } from './partial-user_role-routing.module';
import { PartialUserRoleComponent } from './partial-user_role.component';
import { ModuleData } from 'src/Helper/Modules';

@NgModule({
  declarations: [PartialUserRoleComponent],
  imports: [
    CommonModule,
    PartialUserRoleRoutingModule,
    ModuleData
  ],
  exports: [PartialUserRoleComponent]
})
export class PartialUserRoleModule { }
