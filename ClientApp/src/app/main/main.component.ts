import { Component, OnInit, DoCheck } from "@angular/core";
import { CommonHelper } from "src/Helper/CommonHelper";
import { Router } from "@angular/router";
import { ChangepasswordComponent } from "../changepassword/changepassword.component";
import { DialogService } from "primeng/api";
import * as Pusher from "pusher-js";

declare var $: any;
declare var metisMenu: any;
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  providers: [DialogService]
})
export class MainComponent implements OnInit, DoCheck {
  Module: ModuleModel[];
  Menu: Array<MenuModel>;
  private pusherClient: Pusher;
  constructor(
    private router: Router,
    public helper: CommonHelper,
    private _dialogService: DialogService
  ) {}

  ngOnInit() {

    this.pusherClient = new Pusher("9511248f96e5692c6bc2", {
      cluster: "ap2",
      forceTLS: true
    });

    const channel = this.pusherClient.subscribe(
      //"AlphaChannel" + this.helper.GetCurentUser().id
    );

    channel.bind("AlphaEvent", data => {
      setTimeout(() => {
        this.router.navigate(["Logout/" + this.helper.GetCurentUser().Id]);
      }, 1000);
    });

    $(function() {
      var sidebarNav = $(".sidebar-nav");
      if (sidebarNav.length > 0) {
        $("#sidebarNav").metisMenu();
      }

      $(".mobile-toggle").on("click", function() {
        $(".light-sidebar").toggleClass("sidebar-toggled");
      });

      $(".sidebar-toggle").on("click", function() {
        $(".light-sidebar").toggleClass("sidebar-mini");
        $(".app-navbar").toggleClass("expand");
      });
    });
    this.Module = new Array<ModuleModel>();
    this.Module = [
      {
        Label: "Admin",
        Icon: "fa fa-briefcase fa-2x",
        RouterLink: "Admin/Dashboard",
        Visiable: true
      },
      {
        Label: "Parent",
        Icon: "fa fa-briefcase fa-2x",
        RouterLink: "Parent/Dashboard",
        Visiable: true
      }
    ];
    this.Menu = new Array<MenuModel>();
    this.Menu = [
      {
        Module: "Admin",
        Label: "Dashboard",
        RouterLink: "Admin/Dashboard",
        Icon: "fas fa-tachometer-alt",
        Visiable: true
      },
      {
        Module: "Parent",
        Label: "Dashboard",
        RouterLink: "Parent/Dashboard",
        Icon: "fas fa-tachometer-alt",
        Visiable: true
      },
      {
        Module: "Parent",
        Label: "Student",
        RouterLink: "Parent/Student/:Id",
        Icon: "fa fa-building",
        Visiable: true
      },
      {
        Module: "Admin",
        Label: "POS",
        RouterLink: "Admin/PosDashboard",
        Icon: "fa fa-th",
        Visiable: true
      },
      {
        Module: "Canteen",
        Label: "POS",
        RouterLink: "Canteen/PosDashboard",
        Icon: "fa fa-th",
        Visiable: true
      },
      {
        Module: "Admin",
        Label: "School",
        RouterLink: "Admin/School/1",
        Icon: "fa fa-building",
        Visiable: true
      },
      {
        Module: "Admin",
        Label: "Student",
        RouterLink: "Admin/StudentList",
        Icon: "fa fa-user",
        Visiable: true
      },
      {
        Module: "Admin",
        Label: "Topup",
        RouterLink: "Admin/StudentTopupList",
        Icon: "fa fa-rupee-sign",
        Visiable: true
      },
      {
        Module: "Admin",
        Label: "Reverse",
        RouterLink: "Admin/StudentTopupReverseList",
        Icon: "fa fa-rupee-sign",
        Visiable: true
      },
      {
        Module: "Admin",
        Label: "Product",
        RouterLink: "Admin/ProductList",
        Icon: "fa fa-shopping-cart",
        Visiable: true
      },
      {
        Module: "Admin",
        Label: "Invoice List",
        RouterLink: "Admin/InvoiceList",
        Icon: "fas fa-file-invoice",
        Visiable: true
      },
      {
        Module: "Admin",
        Label: "Setup",
        RouterLink: "",
        Icon: "fa fa-cogs",
        Visiable: true,
        ChildId: "CRMSetup",
        ChildMenu: [
          {
            Module: "Admin",
            Label: "State",
            RouterLink: "Admin/StateList",
            Icon: "fas fa-tachometer-alt",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "City",
            RouterLink: "Admin/CityList",
            Icon: "fas fa-tachometer-alt",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "Payment Method",
            RouterLink: "Admin/PaymentMethodList",
            Icon: "fas fa-tachometer-alt",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "Unit Of Measurement",
            RouterLink: "Admin/UnitOfMeasurementList",
            Icon: "fas fa-tachometer-alt",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "Product Category",
            RouterLink: "Admin/ProductCategoryList",
            Icon: "fas fa-tachometer-alt",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "Class Room",
            RouterLink: "Admin/ClassRoomList",
            Icon: "fas fa-tachometer-alt",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "User Role",
            RouterLink: "Admin/UserRoleList",
            Icon: "fa fa-user-o",
            Visiable: true
          },
          {
            Module: "Admin",
            Label: "User",
            RouterLink: "Admin/UserList",
            Icon: "fa fa-user-o",
            Visiable: true
          }
        ]
      },
    ];
    this.Menu = this.Menu.filter(e => e.Module == this.helper.CurrentModule);
  }
  ngDoCheck() {}

  SelectModule(Module: ModuleModel) {
    this.router.navigate([Module.RouterLink]);
  }

  insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, "$1 $2");
    string = string.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
    return string;
  }

  ChangePasswordPopup() {
    const ref = this._dialogService.open(ChangepasswordComponent, {
      header: "Change Password",
      width: "50%"
    });
    ref.onClose.subscribe(res => {});
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
