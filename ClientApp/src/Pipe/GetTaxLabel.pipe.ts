import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonHelper } from 'src/Helper/CommonHelper';

@Pipe({
  name: 'GetTaxLabel'
})
export class GetTaxLabelPipe implements PipeTransform {

  constructor(private helper : CommonHelper){

  }
  transform(value: any,prefix : string = "",postfix : string = ""): any {
    let Company = JSON.parse(this.helper.GetLocalStorage("AESCompany"));
    if (Company == null) {
      return prefix + "Tax" + postfix;
    }
    else if (Company.tax_label == null) {
      return prefix + "Tax" + postfix;
    }
    else if (Company.tax_label.length == 0) {
      return prefix + "Tax" + postfix;
    }
    else
    {
      return prefix + Company.tax_label + postfix;
    }
  }

}
