import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {

  transform(value: string, locale: string = 'default', options?: Intl.DateTimeFormatOptions): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return value;

    // Default options if none provided
    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    };

    const formatOptions = options || defaultOptions;

    return date.toLocaleTimeString(locale, formatOptions);
  }

}
