import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/Service/Common.service';
import { ApiResponseModel } from 'src/Helper/api-response-model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  UserId: any;

  constructor(private helper: CommonHelper, private _activeRoute: ActivatedRoute, private route: Router, private commonservice: CommonService) { }

  ngOnInit() {

    const routeParams = this._activeRoute.snapshot.params;
    this.UserId = routeParams.Id;
    this.ValidateLogout();
  }

  ValidateLogout() {
    this.helper.Logout();
  }
}
