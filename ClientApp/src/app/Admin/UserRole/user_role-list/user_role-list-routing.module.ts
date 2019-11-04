import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRoleListComponent } from './user_role-list.component';

const routes: Routes = [
  {path : '', component : UserRoleListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleListRoutingModule { }
