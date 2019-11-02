import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { PartialUserComponent } from '../partial-user/partial-user.component';
import { ModuleData} from 'src/Helper/Modules';
import { PartialUserModule } from '../partial-user/partial-user.module';


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    ModuleData,
    PartialUserModule,
  ],
  entryComponents: [PartialUserComponent]
})
export class UserListModule { }
