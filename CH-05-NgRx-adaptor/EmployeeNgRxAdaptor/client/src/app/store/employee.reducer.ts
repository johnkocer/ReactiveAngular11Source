import { Action, State, StateObservable, createReducer, on } from "@ngrx/store";
import { EmployeeState, adapter } from "./employee.state";

import { EmployeeActions } from "./employee.action";

export const initialState: EmployeeState = adapter.getInitialState({
  // additional entity state properties
  EmployeeError: null,
});

export const reducer = createReducer(
  initialState,
  on(EmployeeActions.GET_SUCCESS, (state, { payload }) => {
    return adapter.setAll(payload, state);
  }),
  on(EmployeeActions.POST_SUCCESS, (state, { payload }) => {
    return adapter.addOne(payload, state);
  }),
  on(EmployeeActions.PUT, (state, action) => {
    return adapter.updateOne(action.payload, state);
  }),
  on(EmployeeActions.DELETE, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(EmployeeActions.FIND_ID_SUCCESS, (state, { payload }) => {
    state.entities.removeAll;
    return adapter.setAll([payload], state);
  }),
  on(EmployeeActions.SEARCH_SUCCESS, (state, { payload }) => {
    return adapter.setAll(payload, state);
  })
);

export function EmployeeReducer(
  state: EmployeeState | undefined,
  action: Action
): EmployeeState {
  return reducer(state, action);
}
