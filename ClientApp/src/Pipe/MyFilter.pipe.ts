import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

@Pipe({
  name: 'MyFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(value: any, Columnname: any, Id : any): any {
    if(value == null) {
      return [];
    }
    else{
      return  value.filter(o=>o[Columnname] == Id);
    }
  }

}
