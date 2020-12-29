import { createAction, props, union } from '@ngrx/store';

import Employee from '../models/employee.model';
import { Update } from '@ngrx/entity';

export const EmployeeActions={
  GET: createAction('[Employee] - Load EmployeeList'),
  GET_SUCCESS : createAction('[Employee] - EmployeeList loaded',  props<{ payload: Employee[] }>()),

  POST: createAction( '[Employee] - Create Employee',   props<{ payload: Employee }>() ),
  POST_SUCCESS : createAction(  '[Employee] - Sucess Create Employee',  props<{ payload: Employee }>()),

  PUT: createAction( '[Employee] - PUT Employee',   props<{payload:Update<Employee>}>() ),
  PUT_SUCCESS : createAction(  '[Employee] - Sucess Update Employee',  props<{ payload: Employee }>()),

  DELETE: createAction( '[Employee] - DELETE Employee',   props<{id:number}>() ),
  DELETE_SUCCESS: createAction( '[Employee] - DELETE Employee Success',   props<{id:number}>() ),

  FIND_ID: createAction( '[Employee] - FIND_ID Employee',   props<{id:number}>() ),
  FIND_ID_SUCCESS: createAction( '[Employee] - FIND_ID Employee Success',   props<{payload:Employee}>() ),

  SEARCH: createAction( '[Employee] - SEARCH Employee',   props<{text:string}>() ),
  SEARCH_SUCCESS: createAction( '[Employee] - SEARCH Employee Success',   props<{payload:Employee[]}>() ),

  ERROR : createAction('[Employee] - Error', props<Error>()),
}

const all = union(EmployeeActions)
export type EmployeeActions = typeof all
