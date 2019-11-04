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
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  User: user;
  constructor(
    private router: Router,
    public helper: CommonHelper,
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
        if(res.Type == "S")
        {
          this.helper.SucessToastr(res.Message, "Login");
          this.helper.Authenticate(res.AdditionalData);
          this.router.navigate(["/Admin/Dashboard"]);
        }
        else{
          this.helper.ErrorToastr(res.Message, "Login");
        }
      },
      error => {
        debugger
        this.helper.HideSpinner();
        this.helper.ErrorToastr(error, "Error");
      },
      () => {
        this.helper.HideSpinner();
      }
    );
  }
}
