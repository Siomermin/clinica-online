import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearMedidas'
})
export class FormatearMedidasPipe implements PipeTransform {

  transform(value: any, key: string): any {
    if (key === 'temperatura' || key === 'peso' || key === 'altura') {
      return `${value} ${key === 'temperatura' ? '°C' : key === 'peso' ? 'KG' : 'cm'}`;
    }

    // Add additional conditions for other keys if needed
    return value;
  }

}
