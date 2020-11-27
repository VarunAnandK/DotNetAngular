import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'distinct' })
export class distinctPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // Remove the duplicate elements
    var art = value.map(x=>{
        return x.id.map(y=>{ return y.value;});;
    }).reduce((acc,ele,i)=>{
        acc = acc.concat(ele);
        return acc;
    });
    return new Set(art);
}
}
