import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonHelper } from './CommonHelper';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private helper: CommonHelper
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.helper.GetUserId() > 0) {
      // this.helper.BreadCrumbModel = [
      //   {label:'Categories'},
      //   {label:'Sports'},
      //   {label:'Football'},
      //   {label:'Countries'},
      //   {label:'Spain'},
      //   {label:'F.C. Barcelona'},
      //   {label:'Squad'},
      //   {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'}
      // ]
      this.helper.CurrentModule = route.routeConfig.path.split("/")[0];
      this.helper.GetCurrentPageAndModule(route.routeConfig.path);
      return true;
    }
    else {
      this.router.navigate(['/Login']);
      return false;
    }
  }
}
