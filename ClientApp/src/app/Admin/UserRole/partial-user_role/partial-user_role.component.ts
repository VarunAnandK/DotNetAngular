import { Component, OnInit } from '@angular/core';
import { ApiResponseModel } from 'src/Helper/api-response-model';
import { user_role } from 'src/Model/user_role';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, SelectItem, ConfirmationService } from 'primeng/api';
import { CommonService } from 'src/Service/Common.service';

@Component({
  selector: 'app-partial-user_role',
  templateUrl: './partial-user_role.component.html',
  styleUrls: ['./partial-user_role.component.scss'],
  providers: [ConfirmationService]
})
export class PartialUserRoleComponent implements OnInit {
  UserRoleData: user_role;
  UserRoleForm: FormGroup;

  constructor(
    private helper: CommonHelper,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public commonservice: CommonService,
    private formbuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.UserRoleData = this.config.data;
  }

  ngOnInit() {
    this.UserRoleForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      landing_page: new FormControl('', Validators.compose([
        Validators.nullValidator
      ])),
    });
  }

  UserRoleValidationMessages = {
    'name': [
      { type: 'required', message: 'Landing Page is required.' },
    ],
    // 'landing_page': [
    //   { type: 'required', message: 'Landing Page is required.' },
    // ],
  };

  CreateOrUpdate() {
    this.helper.ShowSpinner();
    this.commonservice.InsertOrUpdate(this.UserRoleData, "UserRole").subscribe(
      (res: ApiResponseModel) => {
        if (res.Type == "S") {
          this.helper.SucessToastr(res.Message, "User Role");
          this.ref.close(true);
        } else {
          this.helper.ErrorToastr(res.Message, "User Role");
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

  Delete() {
    debugger
    this.confirmationService.confirm({
      message: 'Do you want to delete this '+ this.UserRoleData.name + ' record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.helper.ShowSpinner();
        this.commonservice.Delete(this.UserRoleData.id, "UserRoleDelete").subscribe(
          (res: ApiResponseModel) => {
            if (res.Type == "S") {
              this.helper.SucessToastr(res.Message, "User Role");
              this.ref.close(true);
            } else {
              this.helper.ErrorToastr(res.Message, "User Role");
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
      },
      reject: () => {
        //this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

}
