import { Component, OnInit } from '@angular/core';
import { user_role } from 'src/Model/user_role';
import { CommonService } from 'src/Service/Common.service';
import { DialogService } from 'primeng/api';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { PartialUserRoleComponent } from '../partial-user_role/partial-user_role.component';

@Component({
  selector: 'app-user_role-list',
  templateUrl: './user_role-list.component.html',
  styleUrls: ['./user_role-list.component.scss'],
  providers: [DialogService]
})
export class UserRoleListComponent implements OnInit {

  Columns: any;
  UserRoleList: any;
  constructor(
    private commonservice: CommonService,
    private _dialogService: DialogService,
    private helper: CommonHelper
  ) {
  }

  ngOnInit() {
    this.GetList();
    this.Columns = [
      { field: 'name', header: 'Name' },
      { field: 'landing_page', header: 'Landing Page' },
    ];
  }

  GetList() {
    this.helper.ShowSpinner();
    this.commonservice.GetAll("UserRoleList").subscribe((res) => {
      this.UserRoleList = res;
    }, (error) => {
      this.helper.HideSpinner();
      this.helper.ErrorToastr(error, "Error");
    }, () => {
      this.helper.HideSpinner();
    });
  }

  OpenPopup(Id: number) {
    if (Id == 0) {
      const ref = this._dialogService.open(PartialUserRoleComponent, {
        header: 'UserRole - New',
        width: '50%',
        data: new user_role()
      });
      ref.onClose.subscribe((res) => {
        if (res) {
          this.GetList();
        }
      });
    }
    else {
      this.helper.ShowSpinner();
      this.commonservice.GetById(Id, "UserRoleById").subscribe((res) => {
        const ref = this._dialogService.open(PartialUserRoleComponent, {
          header: 'User Role - Edit',
          width: '50%',
          data: res
        });
        ref.onClose.subscribe((res) => {
          if (res) {
            this.GetList();
          }
        });
      }, (error) => {
        this.helper.HideSpinner();
        this.helper.ErrorToastr(error, "Error");
      }, () => {
        this.helper.HideSpinner();
      });
    }
  }

}
