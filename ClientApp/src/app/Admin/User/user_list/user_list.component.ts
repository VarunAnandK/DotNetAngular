import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { DropdownModule } from 'primeng/dropdown';
import { CommonService } from 'src/Service/Common.service';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { PartialUserComponent, PartialUserModule } from '../partial_user/partial_user.component';
import { user } from 'src/Model/user';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { DialogService } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user_list',
  templateUrl: './user_list.component.html',
  providers: [DialogService]
})

export class UserListComponent implements OnInit {
  Columns: any;
  UserList: any;

  constructor(
    private commonservice: CommonService,
    private _dialogService: DialogService,
    private helper: CommonHelper
  ) {
  }
  ngOnInit(){
    this.GetList();
    this.Columns = [
      { field: 'user_role.name', header: 'Role' },
      { field: 'user_role.landing_page', header: 'Landing Page' },
      { field: 'user_name', header: 'User Name' },
      { field: 'email', header: 'Email' },
    ];
  }

  async GetList() {
    this.helper.ShowSpinner();
    let res = await this.commonservice.GetAll("UserList");
    this.UserList = res;
    this.helper.HideSpinner();
  }

  async OpenPopup(Id: number) {
    if (Id == 0) {
      const ref = this._dialogService.open(PartialUserComponent, {
        header: 'User - New',
        width: '50%',
        data: new user()
      });
      ref.onClose.subscribe((res) => {
        if (res) {
          this.GetList();
        }
      });
    }
  else {
    this.helper.ShowSpinner();
    let res = await this.commonservice.GetById(Id, "UserById");
    const ref = this._dialogService.open(PartialUserComponent, {
      header: 'User - Edit',
      width: '50%',
      data: res
    });
    ref.onClose.subscribe((res) => {
      if (res) {
        this.GetList();
      }
    });
    this.helper.HideSpinner();
  }
}
}

const routes: Routes = [
  { path: '', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    ModuleData,
    DropdownModule,
    PartialUserModule,
    DynamicDialogModule,
    PanelModule,
    TableModule
  ],
  entryComponents: [PartialUserComponent]
})
export class UserListModule { }
