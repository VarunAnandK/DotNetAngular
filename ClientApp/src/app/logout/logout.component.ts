import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/Service/Common.service';
import { ApiResponseModel } from 'src/Helper/api-response-model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  UserId: any;

  constructor(private helper : CommonHelper,private _activeRoute : ActivatedRoute,private route : Router,private commonservice: CommonService) { }

  ngOnInit() {

    const routeParams = this._activeRoute.snapshot.params;
    this.UserId = routeParams.Id;
    this.ValidateLogout();
  }

  ValidateLogout() {

    this.helper.ShowSpinner();
    //this.UserId = this.helper.GetCurentUser().id;
    // let params: any;
    // params = [
    //   { params: this.helper.GetCurentUser().id }
    // ];
    this.commonservice
    .GetById(this.UserId , "ValidateLogout")
    .subscribe(
      (res: ApiResponseModel) => {
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message, "Logout");
        this.helper.DeleteAllLocalStorage();
        this.route.navigate(["/Login"]);
      }
      else {
        this.helper.ErrorToastr(res.Message, "Logout");
      }
    }, (error) => {
      this.helper.ErrorToastr(error, "Error");
      this.helper.HideSpinner();
    }, () => {
      this.helper.HideSpinner();
    });
  }
}
