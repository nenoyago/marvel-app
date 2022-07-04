import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count',
  standalone: true,
})
export class CountPipe implements PipeTransform {
  transform(value: any[] | null): number {
    if (value && Array.isArray(value)) {
      return value.length;
    }
    return 0;
  }
}
