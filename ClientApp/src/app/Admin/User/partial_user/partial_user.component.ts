import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { user } from 'src/Model/user';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CommonService } from 'src/Service/Common.service';
import { DynamicDialogConfig, DynamicDialogRef, SelectItem } from 'primeng/api';
import { ModuleData } from 'src/Helper/Modules';

@Component({
  selector: 'app-partial_user',
  templateUrl: './partial_user.component.html',
})

export class PartialUserComponent implements OnInit {

  UserData: user;
  UserForm: FormGroup;
  UserRoleDropdown: SelectItem[];
  VehicleDropdown: SelectItem[];
  constructor(
    private helper: CommonHelper,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public commonservice: CommonService,
    private formbuilder: FormBuilder
  ) {
    this.UserData = this.config.data;
  }
  ngOnInit() {
    if (this.UserData.id == 0) {
      this.UserForm = this.formbuilder.group({
        user_role_id: new FormControl('', Validators.compose([Validators.required])),
        vehicle_id: new FormControl('', Validators.compose([Validators.nullValidator])),
        user_name: new FormControl('', Validators.compose([Validators.required])),
        password: new FormControl('', Validators.compose([Validators.required])),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      });
    }
    else {
      this.UserForm = this.formbuilder.group({
        user_role_id: new FormControl('', Validators.compose([Validators.required])),
        vehicle_id: new FormControl('', Validators.compose([Validators.nullValidator])),
        user_name: new FormControl('', Validators.compose([Validators.required])),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      });
    }
    this.UserRoleDropdownList();
  }

  UserValidationMessages = {
    'user_role_id': [{ type: 'required', message: 'User Role Required.' },],
    'user_name': [{ type: 'required', message: 'User Name Required.' },],
    'password': [{ type: 'required', message: 'Password Required.' },],
    'email': [{ type: 'required', message: 'Email Required.' }, { type: 'email', message: 'Invalid Email Format' }],
  };

  async CreateOrUpdate() {
    if (this.UserForm.valid == true) {
      this.helper.ShowSpinner();
      let res = await this.commonservice.InsertOrUpdate(this.UserData, "User");
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message, "User");
        this.ref.close(true);
      } else {
        this.helper.ErrorToastr(res.Message, "User");
      }
      this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.UserForm);
    }
  }

  async Delete() {
    this.helper.ShowSpinner();
    let res = await this.commonservice.Delete(this.UserData.id, "UserDelete");
    if (res.Type == "S") {
      this.helper.SucessToastr(res.Message, "User");
      this.ref.close(true);
    } else {
      this.helper.ErrorToastr(res.Message, "User");
    }
    this.helper.HideSpinner();
  }

  async UserRoleDropdownList() {
    let res = await this.commonservice.GetAll("UserRoleList");
    this.UserRoleDropdown = this.helper.ObjecToSelectItem(res)
    if (this.UserData.id == 0)
      this.UserData.user_role_id = this.UserRoleDropdown[0].value;
  }


}

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartialUserRoutingModule { }


@NgModule({
  declarations: [PartialUserComponent],
  imports: [
    CommonModule,
    PartialUserRoutingModule,
    ModuleData,
    DropdownModule
  ],
  exports: [PartialUserComponent]
})
export class PartialUserModule { }
