import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'geolocation'
})
export class GeolocationPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
