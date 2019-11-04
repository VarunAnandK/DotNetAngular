import { Component, OnInit } from '@angular/core';
import { ApiResponseModel } from 'src/Helper/api-response-model';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonService } from 'src/Service/Common.service';
import { DynamicDialogConfig } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/api';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { user } from 'src/Model/user';
import { FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  UserData: user;
  UserForm: FormGroup;
  new_password : string;
  conform_password : string;
  constructor(
    private helper: CommonHelper,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public commonservice: CommonService,
    private formbuilder: FormBuilder,
    public route: Router
  ) { }

  ngOnInit() {
    this.UserForm = this.formbuilder.group({
      new_password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])),
      conform_password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])),
    //   password: ['', [
    //     Validators.required,
    //     Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')
    // ]]
    });
  }
  UserValidationMessages = {
    new_password: [{ type: "required", message: "New Password is required." }],
    conform_password: [{ type: "required", message: "Conform Password Id is required." }],
  };
  CreateOrUpdate() {

    this.helper.ShowSpinner();
    let data = {
      userid: this.helper.GetUserId(),
      password : this.new_password,
      conformpassword : this.conform_password,
    }
    this.commonservice.CommonPost(data, "UserChangePassword").subscribe(
      (res: ApiResponseModel) => {
        if (res.Type == "S") {
          this.helper.SucessToastr(res.Message, "User");
          this.ref.close(true);
          this.route.navigate(["/Login"])
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

}
