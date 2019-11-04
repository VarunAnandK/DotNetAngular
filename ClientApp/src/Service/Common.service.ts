import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonHelper } from 'src/Helper/CommonHelper';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private httpClient: HttpClient, private helper: CommonHelper) {

  }
  public GetAll(UrlName: string) {
    return this.httpClient.get<any>(`${this.helper.ApiURL}/${UrlName}`);
  }
  public GetById(id: number, UrlName: string) {
    return this.httpClient.get<any>(`${this.helper.ApiURL}/${UrlName}/${id}`);
  }
  public InsertOrUpdate(model: any, UrlName: string) {
    if (model.id == 0) {
      model.created_by_id = this.helper.GetUserId();
      return this.httpClient.post(`${this.helper.ApiURL}/${UrlName}Insert`, model);
    }
    else {
      model.updated_by_id = this.helper.GetUserId();
      return this.httpClient.post(`${this.helper.ApiURL}/${UrlName}Update`, model);
    }
  }
  public CommonPost(model: any, UrlName: string) {
    return this.httpClient.post(`${this.helper.ApiURL}/${UrlName}`, model);
  }

  public Delete(id: number, UrlName: string) {
    return this.httpClient.get(`${this.helper.ApiURL}/${UrlName}/${id}`);
  }

  public PostWithParameter(model: any, UrlName: string,params : any) {
    let url = `${this.helper.ApiURL}/${UrlName}`;
    params.forEach(e=>{
      url = url + "/" + e.params;
    });
    return this.httpClient.post(url,model);
  }

  public GetWithParameter(UrlName: string,params : any) {
    let url = `${this.helper.ApiURL}/${UrlName}`;
    params.forEach(e=>{
      url = url + "/" + e.params;
    });
    return this.httpClient.get<any>(url);
  }

  public GetNumber(type: string, UrlName: string) {
    return this.httpClient.get<number>(`${this.helper.ApiURL}/${UrlName}/${type}`);
  }

  public GetByValue(id: string, UrlName: string) {
    return this.httpClient.get<any>(`${this.helper.ApiURL}/${UrlName}/${id}`);
  }
}

