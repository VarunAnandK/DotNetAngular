import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from '../environments/environment';
@Pipe({ name: 'GetImage' })

export class GetImagePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    debugger
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.API_URL + url);
  }
}
