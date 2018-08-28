import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingCategory'
})
export class RatingCategoryPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
      case 1:
      case 2:
        return 'Poor';
      case 3:
      case 4:
        return 'Fine';
      default:
        return 'Excellent';
    }
  }

}
