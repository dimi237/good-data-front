import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})

export class TruncatePipe implements PipeTransform {

  transform(str: string, ...args: number[]): string {
    if (!str) { return ''; }
    return (str.length > args[0]) ? `${str.substring(0, args[0] - 5)}...` : str;
  }

}
