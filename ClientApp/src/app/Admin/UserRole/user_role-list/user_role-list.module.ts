import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoleListRoutingModule } from './user_role-list-routing.module';
import { UserRoleListComponent } from './user_role-list.component';
import { PartialUserRoleComponent } from '../partial-user_role/partial-user_role.component';
import { ModuleData} from 'src/Helper/Modules';
import { PartialUserRoleModule } from '../partial-user_role/partial-user_role.module';

@NgModule({
  declarations: [UserRoleListComponent],
  imports: [
    CommonModule,
    UserRoleListRoutingModule,
    ModuleData,
    PartialUserRoleModule,
  ],
  entryComponents: [PartialUserRoleComponent]
})
export class UserRoleListModule { }
