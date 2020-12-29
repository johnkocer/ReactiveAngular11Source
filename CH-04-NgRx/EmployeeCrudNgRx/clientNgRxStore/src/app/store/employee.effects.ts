import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";

import { Action } from "@ngrx/store";
import Employee from "./employee.model";
import { EmployeeActions } from "./employee.action";
import { EmployeeService } from "../services/employee.service";
import { Injectable } from "@angular/core";

@Injectable()
export class EmployeeEffects {
  constructor(
    private employeeService: EmployeeService,
    private action$: Actions
  ) {}

  GetEmployees$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(EmployeeActions.GET),
      exhaustMap((action) =>
        this.employeeService.get().pipe(
          map((data: Employee[]) => EmployeeActions.GET_SUCCESS({ payload: data })),
          catchError((error: Error) => of(EmployeeActions.ERROR(error)))
        )
      )
    )
  );

  CreateEmployee$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(EmployeeActions.POST),
      exhaustMap((action) =>
        this.employeeService.post(action.payload).pipe(
          map((data: Employee) =>
            EmployeeActions.POST_SUCCESS({ payload: data })),
          catchError((error: Error) => of(EmployeeActions.ERROR(error)))
        )
      )
    )
  );


  UpdateEmployee$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(EmployeeActions.PUT),
      exhaustMap((action) =>
        this.employeeService.put(action.payload).pipe(
          map((data: Employee) =>
            EmployeeActions.PUT_SUCCESS({ payload: data })),
          catchError((error: Error) => of(EmployeeActions.ERROR(error)))
        )
      )
    )
  );

  DeleteEmployee$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(EmployeeActions.DELETE),
      exhaustMap(({id}) =>
        this.employeeService.delete(id).pipe(
          map((data: Employee) =>
            EmployeeActions.DELETE_SUCCESS({ id })),
          catchError((error: Error) => of(EmployeeActions.ERROR(error)))
        )
      )
    )
  );

   FindByIdEmployee$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(EmployeeActions.FIND_ID),
      exhaustMap(({id}) =>
        this.employeeService.getById(id).pipe(
          map((data: Employee) =>
            EmployeeActions.FIND_ID_SUCCESS({ payload: data })),
          catchError((error: Error) => of(EmployeeActions.ERROR(error)))
        )
      )
    )
  );

  FindByTextEmployee$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(EmployeeActions.SEARCH),
    exhaustMap(({text}) =>
      this.employeeService.search(text).pipe(
        map((data: Employee[]) =>
          EmployeeActions.SEARCH_SUCCESS({ payload: data })),
        catchError((error: Error) => of(EmployeeActions.ERROR(error)))
      )
    )
  )
);
}
