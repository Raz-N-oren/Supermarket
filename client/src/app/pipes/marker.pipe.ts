import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marker'
})
export class MarkerPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }

    const regex = new RegExp(args, 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    return value.replace(regex,currentChar => `<span class='highlight'>${currentChar}</span>`);
  }

}
