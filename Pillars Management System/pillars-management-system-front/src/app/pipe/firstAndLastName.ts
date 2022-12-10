import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstAndLastName',
})
export class FirstAndLastName implements PipeTransform {
  transform(value: string): string {
    let splitingName = value.split(' ');
    let length;
    return `${splitingName[0]} ${splitingName[splitingName.length - 1]}`;
  }
}
