import { Component, OnInit } from '@angular/core';
import { ApiResponseModel } from 'src/Helper/api-response-model';
import { user } from 'src/Model/user';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, SelectItem } from 'primeng/api';
import { CommonService } from 'src/Service/Common.service';


@Component({
  selector: 'app-partial-user',
  templateUrl: './partial-user.component.html',
  styleUrls: ['./partial-user.component.scss']
})
export class PartialUserComponent implements OnInit {

  UserData: user;
  UserForm: FormGroup;
  UserRoledropdown: SelectItem[];
  constructor(
    private helper: CommonHelper,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public commonservice: CommonService,
    private formbuilder: FormBuilder,
  ) {
    this.UserData = this.config.data;
  }
  ngOnInit() {
    this.UserForm = this.formbuilder.group({
      user_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      user_role_id: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
    });
    this.UserRoledropdownList();
  }
  UserValidationMessages = {
    'user_role_id': [
      { type: 'required', message: 'User Role is required.' },
    ],
    'user_name': [
      { type: 'required', message: 'User Name is required.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter correct format of email' },
    ]
  };

  CreateOrUpdate() {

    this.helper.ShowSpinner();
    this.commonservice.InsertOrUpdate(this.UserData, "User").subscribe(
      (res: ApiResponseModel) => {
        if (res.Type == "S") {
          this.helper.SucessToastr(res.Message, "User");
          this.ref.close(true);
        } else {
          this.helper.ErrorToastr(res.Message, "User");
        }
      },
      error => {
        this.helper.HideSpinner();
        this.helper.ErrorToastr(error, "Error");
      },
      () => {
        this.helper.HideSpinner();
      }
    );
  }

  UserRoledropdownList() {

    let Id = 0;
    this.UserRoledropdown = [];
    this.commonservice.GetAll("UserRoleList").subscribe(
      (res) => {
        res.forEach(element => {
          this.UserRoledropdown.push({ label: element.name, value: element.id });
          if (Id == 0) {
            Id = element.id;
          }
        });
      },
      error => {
        //this.helper.HideSpinner();
      },
      () => {
        if (this.UserData.id == 0)
          this.UserData.user_role_id = Id;
        this.UserForm.patchValue(this.UserData);
        //this.helper.HideSpinner();
      }
    );
  }



}
