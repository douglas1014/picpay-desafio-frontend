import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: string|number): unknown {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
  });
  }

}
