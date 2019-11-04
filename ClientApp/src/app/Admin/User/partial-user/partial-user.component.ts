import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiResponseModel } from 'src/Helper/api-response-model';
import { user } from 'src/Model/user';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, SelectItem } from 'primeng/api';
import { CommonService } from 'src/Service/Common.service';


@Component({
  selector: 'app-partial-user',
  templateUrl: './partial-user.component.html',
  styleUrls: ['./partial-user.component.css']
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
      UserName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      Password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      Email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
    });
  }
  UserValidationMessages = {
    'UserName': [
      { type: 'required', message: 'User Name is required.' },
    ],
    'Password': [
      { type: 'required', message: 'Password is required.' },
    ],
    'Email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Correct email format.' },
    ],
  };

  CreateOrUpdate() {
    this.helper.ShowSpinner();
    this.commonservice.InsertOrUpdate(this.UserData, "User").subscribe(
      (res: ApiResponseModel) => {
          this.helper.SucessToastr(res.Message, "User");
          this.ref.close(true);
      },
      error => {
        this.helper.HideSpinner();
        this.helper.ErrorToastr(error, "User");
      },
      () => {
        this.helper.HideSpinner();
      }
    );
  }
  ngOnDestroy()
  {
    this.ref.close();
  }
}
