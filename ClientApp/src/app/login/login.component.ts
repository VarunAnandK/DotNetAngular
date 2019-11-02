import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonHelper } from "src/Helper/CommonHelper";
import { CommonService } from "src/Service/Common.service";
import { ApiResponseModel } from "src/Model/ApiResponseModel";
import { user } from "src/Model/user";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  User: user;
  constructor(
    private router: Router,
    private helper: CommonHelper,
    private commonservice: CommonService,
    private confirmationService: ConfirmationService
  ) {
    this.User = new user();
  }

  ngOnInit() {
    this.helper.DeleteAllLocalStorage();
  }

  ValidateLogin() {
    this.helper.ShowSpinner();
    this.commonservice.CommonPost(this.User, "Authenticate").subscribe(
      (res: ApiResponseModel) => {
        this.helper.SucessToastr(res.Message, "Login");
        this.helper.SetLocalStorage(
          this.helper.StorageName,
          res.AdditionalData
        );
        this.router.navigate(["/Admin/Dashboard"]);
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
