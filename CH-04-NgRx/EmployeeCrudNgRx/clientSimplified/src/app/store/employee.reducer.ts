import { Action, createReducer, on } from '@ngrx/store';
import IDb, { _defaultDbData } from './employee.state';

import {DbActions} from './employee.action';

const defaultData = _defaultDbData();

// reducer, collection or table
const _filterDbData = createReducer(
  defaultData,
  on(DbActions.GET, state => state),
  on(DbActions.GET_SUCCESS, (state: IDb, { payload }) => ({
    ...state, EmployeeList: payload, EmployeeError: null
  })),

  on(DbActions.POST, (state: IDb) =>(
     {...state, EmployeeError: null}
  )),
  on(DbActions.POST_SUCCESS, (state: IDb, { payload }) => (
    { ...state, EmployeeList: [...state.EmployeeList, payload], EmployeeError: null
  })),

  on(DbActions.PUT, state => (
  {...state, EmployeeError: null})),
  on(DbActions.PUT_SUCCESS, (state: IDb, { payload }) => {
    let index= state.EmployeeList.findIndex(item=>item.id === payload.id)
    const list = [...state.EmployeeList];
    list[index]=payload;
    return { ...state, EmployeeList:list, EmployeeError: null };
  }),

  on(DbActions.DELETE, (state:IDb, {id}) => (
    {...state, EmployeeError: null})),
  on(DbActions.DELETE_SUCCESS, (state:IDb, {id}) => (
      {...state, EmployeeList:state.EmployeeList.filter(item => item.id !== id), EmployeeError: null})),

  on(DbActions.FIND_ID, (state:IDb, {id}) => (
    {...state, EmployeeError: null})),
  on(DbActions.FIND_ID_SUCCESS, (state:IDb, {payload:Employee}) => (
      {...state,  EmployeeList:[Employee],EmployeeError: null})),

      on(DbActions.SEARCH, (state:IDb, {text}) => (
        {...state, EmployeeError: null})),
        on(DbActions.SEARCH_SUCCESS, (state: IDb, { payload }) => ({
          ...state, EmployeeList: payload, EmployeeError: null
        })),

  on(DbActions.ERROR, (state: IDb, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, EmployeeError: error };
  })
);
// table, collections or DB connection string it needs to be refistered in app.module
//  StoreModule.forRoot({ db: FilterDataContext }),
export function FilterDataContext(
  state: IDb | undefined,
  action: Action
  ): IDb {
  return _filterDbData(state, action);
}
