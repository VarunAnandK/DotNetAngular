import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonHelper } from "src/Helper/CommonHelper";
import { CommonService } from "src/Service/Common.service";
import { ApiResponseModel } from "src/Model/ApiResponseModel";
import { user } from "src/Model/user";
import { ConfirmationService } from "primeng/api";
import { analyzeAndValidateNgModules } from "@angular/compiler";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  User: user;
  result: any;
  Res: any;
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
    //window.document.body.className = "hold-transition login-page";
  }

  ValidateLogin() {
    debugger;
    this.helper.ShowSpinner();
    this.User.old_guid = this.helper.GetLocalStorage("oldfunuuid");
    this.User.old_session_id = this.helper.GetLocalStorage("oldfunsessionid");

    this.commonservice.CommonPost(this.User, "Authenticate").subscribe(
      (res: ApiResponseModel) => {
        this.Res = res;
        // if (res.Type == "S") {
        //   this.helper.SucessToastr(res.Message, "State");
        //   this.ref.close(true);
        // } else {
        //   this.helper.ErrorToastr(res.Message, "State");
        // }
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
