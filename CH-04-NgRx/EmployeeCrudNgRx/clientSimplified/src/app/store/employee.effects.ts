import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";

import { Action } from "@ngrx/store";
import Employee from "./employee.model";
import { DbActions } from "./employee.action";
import { EmployeeService } from "../services/employee.service";
import { Injectable } from "@angular/core";

@Injectable()
export class EmployeeEffects {
  constructor(
    private employeeService: EmployeeService,
    private action$: Actions
  ) {}

  Gets$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(DbActions.GET),
      exhaustMap((action) =>
        this.employeeService.get().pipe(
          map((data: Employee[]) => DbActions.GET_SUCCESS({ payload: data })),
          catchError((error: Error) => of(DbActions.ERROR(error)))
        )
      )
    )
  );

  Post$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(DbActions.POST),
      exhaustMap((action) =>
        this.employeeService.post(action.payload).pipe(
          map((data: Employee) => DbActions.POST_SUCCESS({ payload: data })),
          catchError((error: Error) => of(DbActions.ERROR(error)))
        )
      )
    )
  );

  Put$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(DbActions.PUT),
      exhaustMap((action) =>
        this.employeeService.put(action.payload).pipe(
          map((data: Employee) => DbActions.PUT_SUCCESS({ payload: data })),
          catchError((error: Error) => of(DbActions.ERROR(error)))
        )
      )
    )
  );

  Delete$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(DbActions.DELETE),
      exhaustMap(({ id }) =>
        this.employeeService.delete(id).pipe(
          map((data: Employee) => DbActions.DELETE_SUCCESS({ id })),
          catchError((error: Error) => of(DbActions.ERROR(error)))
        )
      )
    )
  );

  FindByIdEmployee$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(DbActions.FIND_ID),
      exhaustMap(({ id }) =>
        this.employeeService.getById(id).pipe(
          map((data: Employee) => DbActions.FIND_ID_SUCCESS({ payload: data })),
          catchError((error: Error) => of(DbActions.ERROR(error)))
        )
      )
    )
  );

  FindByTextEmployee$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(DbActions.SEARCH),
      exhaustMap(({ text }) =>
        this.employeeService.search(text).pipe(
          map((data: Employee[]) =>
            DbActions.SEARCH_SUCCESS({ payload: data })
          ),
          catchError((error: Error) => of(DbActions.ERROR(error)))
        )
      )
    )
  );
}
