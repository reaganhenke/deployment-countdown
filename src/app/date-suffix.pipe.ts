import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateSuffix' })
export class DateSuffixPipe implements PipeTransform {
  transform(day: string): string {
    let suffix = 'th';

    if (day === '1' || day === '21' || day === '31') {
        suffix = 'st';
    } else if (day === '2' || day === '22') {
        suffix = 'nd';
    } else if (day === '3' || day === '23') {
        suffix = 'rd';
    }

    return day + suffix;
  }
}
