import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionTypes } from './actions';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ShopEffects {
  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(ActionTypes.LOADITEMS),
    mergeMap(() =>
      this.productsService.getAll().pipe(
        map(products => {
          return { type: ActionTypes.LOADSUCCESS, payload: products };
        }),
        catchError(() => EMPTY)
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
