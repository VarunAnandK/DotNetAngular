import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { user } from "src/Model/user";
import {MessageService} from 'primeng/api';
@Injectable()
export class CommonHelper {
  constructor(
    private messageService: MessageService
  ) {
    this.ApiURL = environment.API_URL;
    this.StorageName = "AESERPUserDetail";
  }
  ApiURL: string;
  StorageName: string;
  CurrentModule: string;
  CurrentPage: string[];
  HideShowSpinner : boolean;

  GetUserId(): number {
    let user = JSON.parse(window.localStorage.getItem(this.StorageName));
    if (user == null) {
      return 0;
    } else {
      return user.id;
    }
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
    this.messageService.add({severity:'success', summary: title, detail: message});
  }

  ErrorToastr(message: string, title: string) {
    this.messageService.add({severity:'error', summary: title, detail: message});
  }

  ShowSpinner() {
    this.HideShowSpinner = true;
  }

  HideSpinner() {
    this.HideShowSpinner = false;
  }

  NullOrEmpty(data) {
    if (data == null) return true;
    else if (data == undefined) return true;
    else if (!isNaN(data)) return true;
    else if (data == "") return true;
    else return false;
  }

  Authenticate(Model: any) {
    this.SetLocalStorage(
      this.StorageName,
      Model
    );
  }

  Logout() {
    this.DeleteAllLocalStorage();
  }

}
