import { Component, OnInit } from '@angular/core';
import { user } from 'src/Model/user';
import { CommonService } from 'src/Service/Common.service';
import { DialogService } from 'primeng/api';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { PartialUserComponent } from '../partial-user/partial-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [DialogService]
})
export class UserListComponent implements OnInit {

  Columns: any;
  UserList: Array<user>;
  loading: boolean = true;
  constructor(
    private commonservice: CommonService,
    private _dialogService: DialogService,
    private helper: CommonHelper,
  ) {
    this.UserList = new Array<user>();
  }

  ngOnInit() {
    this.GetList();
    this.Columns = [
      { field: 'UserName', header: 'User Name' },
    ];
  }

  GetList() {
    this.commonservice.GetAll("UserList").subscribe((res) => {
      this.UserList = res;
    }, (error) => {
      this.loading = false;
      this.helper.ErrorToastr(error, "Error");
    }, () => {
      this.loading = false;
    });
  }

  OpenPopup(Id: number) {
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
      this.commonservice.GetById(Id, "UserById").subscribe((res) => {
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
      }, (error) => {
        this.helper.HideSpinner();
        this.helper.ErrorToastr(error, "Error");
      }, () => {
        this.helper.HideSpinner();
      });
    }
  }
}

