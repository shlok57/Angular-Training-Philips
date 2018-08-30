import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BookGuardService {

  constructor(private _router: Router, private _dataService: DataService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const id = +route.url[0].path;
    if (isNaN(id)) {
      this._router.navigate(['/collection']);
      return false;
    }

    return this._dataService.canActivate(id)
      .pipe(
        map(result => {
          if (result) {
            return true;
          }
          this._router.navigate(['/collection']);
          return of(false);
        }),
        catchError(() => {
          this._router.navigate(['/collection']);
          return of(false);
        }
        )
      );
  }
}
