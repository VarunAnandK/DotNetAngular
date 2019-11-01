import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CommonHelper } from './CommonHelper';

@Injectable()
export class AlphaInterceptor implements HttpInterceptor {
  constructor(private helper : CommonHelper) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = this.helper.GetCurentUser().api_token;
    // const updatedRequest = request.clone({
    //   headers: request.headers.set("Authorization", token)
    // });
    request = request.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            //console.log("api call success :", event);
          }
        },
        error => {
          if (event instanceof HttpResponse) {
            //console.log("api call error :", event);
          }
        }
      )
    );
  }
}
