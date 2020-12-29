import { Action, State, StateObservable, createReducer, on } from '@ngrx/store';
import EmployeeState, { initializeState } from './employee.state';

import Employee from './employee.model';
import {EmployeeActions} from './employee.action';
import { map } from  "rxjs/operators";

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(EmployeeActions.GET, state => state),
  on(EmployeeActions.GET_SUCCESS, (state: EmployeeState, { payload }) => ({
    ...state, EmployeeList: payload, EmployeeError: null
  })),

  on(EmployeeActions.POST, (state: EmployeeState) =>(
     {...state, EmployeeError: null}
  )),
  on(EmployeeActions.POST_SUCCESS, (state: EmployeeState, { payload }) => (
    { ...state, EmployeeList: [...state.EmployeeList, payload], EmployeeError: null
  })),

  on(EmployeeActions.PUT, state => (
  {...state, EmployeeError: null})),
  on(EmployeeActions.PUT_SUCCESS, (state: EmployeeState, { payload }) => {
    let index= state.EmployeeList.findIndex(item=>item.id === payload.id)
    const list = [...state.EmployeeList];
    list[index]=payload;
    return { ...state, EmployeeList:list, EmployeeError: null };
  }),

  on(EmployeeActions.DELETE, (state:EmployeeState, {id}) => (
    {...state, EmployeeError: null})),
  on(EmployeeActions.DELETE_SUCCESS, (state:EmployeeState, {id}) => (
      {...state, EmployeeList:state.EmployeeList.filter(item => item.id !== id), EmployeeError: null})),

  on(EmployeeActions.FIND_ID, (state:EmployeeState, {id}) => (
    {...state, EmployeeError: null})),
  on(EmployeeActions.FIND_ID_SUCCESS, (state:EmployeeState, {payload:Employee}) => (
      {...state,  EmployeeList:[Employee],EmployeeError: null})),

      on(EmployeeActions.SEARCH, (state:EmployeeState, {text}) => (
        {...state, EmployeeError: null})),
        on(EmployeeActions.SEARCH_SUCCESS, (state: EmployeeState, { payload }) => ({
          ...state, EmployeeList: payload, EmployeeError: null
        })),

  on(EmployeeActions.ERROR, (state: EmployeeState, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, EmployeeError: error };
  })
);

export function EmployeeReducer(
  state: EmployeeState | undefined,
  action: Action
  ): EmployeeState {
  return reducer(state, action);
}
