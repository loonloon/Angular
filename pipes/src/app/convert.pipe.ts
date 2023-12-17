import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert'
})

export class ConvertPipe implements PipeTransform {
  transform(value: unknown, targetUnit: string): number {
    console.log(value);

    if (!value) {
      return parseFloat(value as string);
    }

    console.log(targetUnit);
    const convertedValue = parseFloat(value as string);

    switch (targetUnit) {
      case 'km':
        return convertedValue * 1.60934;
      case 'm':
        return convertedValue * 1.60934 * 1000;
      case 'cm':
        return convertedValue * 1.60934 * 1000 * 1000;
      default:
        throw new Error('Target unit not supported.');
    }
  }
}
