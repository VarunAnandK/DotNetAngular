import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { user } from "src/Model/user";
import { MenuItem } from "primeng/api";
import { CookieService } from "ngx-cookie-service";
@Injectable()
export class CommonHelper {
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _cookieService: CookieService
  ) {
    this.ApiURL = environment.API_URL;
    this.StorageName = "AESERPUserDetail";
  }
  ApiURL: string;
  StorageName: string;
  CurrentModule: string;
  CurrentPage: string[];
  BreadCrumbModel: MenuItem[];
  Module: ModuleModel[];
  Menu: Array<MenuModel>;

  GetUserId(): number {
    let user = JSON.parse(window.localStorage.getItem(this.StorageName));
    if (user == null) {
      return 0;
    } else {
      return user.id;
    }
  }

  GetCookiesValue(text: string) {
    return this._cookieService.get(text);
  }
  SetCookiesValue(text: string, value: any) {
    return this._cookieService.set(text, value, 1);
  }
  DeletCookiesValue(text: string) {
    return this._cookieService.delete(text);
  }
  DeletAllCookiesValue() {
    return this._cookieService.deleteAll();
  }

  GetCurrentPageAndModule(data: string) {
    this.CurrentPage = [];
    this.CurrentPage.push(data.split("/")[0]);
    this.CurrentPage.push(data.split("/")[1]);
    if (data.split("/")[1].endsWith("List"))
      this.CurrentPage.push(
        data.split("/")[1].endsWith("List")
          ? data.split("/")[1]
          : data.split("/")[1] + "List"
      );
    else if (data.split("/")[2])
      this.CurrentPage.push(
        data.split("/")[1].endsWith("List")
          ? data.split("/")[1]
          : data.split("/")[1] + "List"
      );
  }

  GetCurentUser() {
    let User: user;
    User = new user();
    let data = JSON.parse(window.localStorage.getItem(this.StorageName));
    if (data != null) {
      User = data;
    }
    return User;
  }
  DefaultBusinessId = 1;
  GetStimulsoftKey() {
    return (
      "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" +
      "+m1qqs8t0m89vdK7k8nJTw=="
    );
  }

  SetLocalStorage(name: string, data: any, jsonformat: boolean = true) {
    if (jsonformat) {
      window.localStorage.setItem(name, JSON.stringify(data));
    } else {
      window.localStorage.setItem(name, data);
    }
  }
  GetLocalStorage(name: string, jsonformat: boolean = false) {
    if (jsonformat) return JSON.parse(window.localStorage.getItem(name));
    else return window.localStorage.getItem(name);
  }
  DeleteAllLocalStorage() {
    return window.localStorage.clear();
  }
  DeleteLocalStorage(name: string) {
    return window.localStorage.removeItem(name);
  }
  SucessToastr(message: string, title: string) {
    this.toastr.success(message, title);
  }
  ErrorToastr(message: string, title: string) {
    this.toastr.error(message, title);
  }
  ShowSpinner() {
    this.spinner.show();
  }
  HideSpinner() {
    this.spinner.hide();
  }
  NullOrEmpty(data) {
    if (data == null) return true;
    else if (data == undefined) return true;
    else if (!isNaN(data)) return true;
    else if (data == "") return true;
    else return false;
  }
  GetMenuAndModule() {
    this.Module = new Array<ModuleModel>();
    this.Module = [
      {
        Label: "Admin",
        Icon: "fa fa-briefcase fa-2x",
        RouterLink: "Admin/Dashboard",
        Visiable: true
      },
      {
        Label: "CRM",
        Icon: "fa fa-briefcase fa-2x",
        RouterLink: "CRM/Dashboard",
        Visiable: true
      }
    ];
    this.Menu = new Array<MenuModel>();
    this.Menu = [
      {
        Module: "Admin",
        Label: "Dashboard",
        RouterLink: "Admin/Dashboard",
        Icon: "fa fa-tachometer",
        Visiable: true
      },
      {
        Module: "Admin",
        Label: "School",
        RouterLink: "Admin/Company/1",
        Icon: "fa fa-tachometer",
        Visiable: true
      },
      {
        Module: "Admin",
        Label: "Setup",
        RouterLink: "",
        Icon: "fa fa-tachometer",
        Visiable: true,
        ChildId: "CRMSetup",
        ChildMenu: [
          {
            Module: "Admin",
            Label: "Currency",
            RouterLink: "Admin/CurrencyList",
            Icon: "fa fa-tachometer",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "Country",
            RouterLink: "Admin/CountryList",
            Icon: "fa fa-tachometer",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "State",
            RouterLink: "Admin/StateList",
            Icon: "fa fa-tachometer",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "City",
            RouterLink: "Admin/CityList",
            Icon: "fa fa-tachometer",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "User",
            RouterLink: "Admin/UserList",
            Icon: "fa fa-tachometer",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "Menu",
            RouterLink: "Admin/MenuList",
            Icon: "fa fa-tachometer",
            Visiable: true
          }
        ]
      },
      {
        Module: "CRM",
        Label: "Dashboard",
        RouterLink: "CRM/Dashboard",
        Icon: "fa fa-tachometer",
        Visiable: true
      },
      {
        Module: "CRM",
        Label: "Calandar",
        RouterLink: "CRM/Calandar",
        Icon: "fa fa-tachometer",
        Visiable: true
      },
      {
        Module: "CRM",
        Label: "Lead",
        RouterLink: "CRM/LeadList",
        Icon: "fa fa-tachometer",
        Visiable: true
      },
      {
        Module: "CRM",
        Label: "Opportunity",
        RouterLink: "CRM/OpportunityList",
        Icon: "fa fa-tachometer",
        Visiable: true
      },
      {
        Module: "CRM",
        Label: "Customer",
        RouterLink: "CRM/CustomerList",
        Icon: "fa fa-tachometer",
        Visiable: true
      },
      {
        Module: "CRM",
        Label: "Setup",
        RouterLink: "",
        Icon: "fa fa-tachometer",
        Visiable: true,
        ChildId: "CRMSetup",
        ChildMenu: [
          {
            Module: "CRM",
            Label: "Activity Type",
            RouterLink: "CRM/ActivityTypeList",
            Icon: "fas fa-tachometer",
            Visiable: true
          },
          {
            Module: "CRM",
            Label: "Stage",
            RouterLink: "CRM/StageList",
            Icon: "fas fa-tachometer",
            Visiable: true
          },
          {
            Module: "CRM",
            Label: "Lost Reason",
            RouterLink: "CRM/LostReasonList",
            Icon: "fas fa-tachometer",
            Visiable: true
          },
          {
            Module: "CRM",
            Label: "Tag",
            RouterLink: "CRM/TagList",
            Icon: "fas fa-tachometer",
            Visiable: true
          },
          {
            Module: "CRM",
            Label: "Team",
            RouterLink: "CRM/TeamList",
            Icon: "fas fa-tachometer",
            Visiable: true
          },
          {
            Module: "CRM",
            Label: "Payment Term",
            RouterLink: "CRM/PaymentTermList",
            Icon: "fas fa-tachometer",
            Visiable: true
          }
        ]
      }
    ];
    this.Menu = this.Menu.filter(e => e.Module == this.CurrentModule);
  }
}

export class ModuleModel {
  Label: string;
  RouterLink: string;
  Icon: string;
  Visiable: boolean;
}

export class MenuModel {
  Label: string;
  RouterLink: string;
  Icon: string;
  Visiable: boolean;
  ChildId?: string;
  ChildMenu?: Array<MenuModel>;
  Module: string;
}
