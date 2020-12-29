import { Action, createReducer, on } from '@ngrx/store';
import { INC, DEC, RESET } from './actions';
import {  IDb } from './state';

//export const initialState : I={count:0};

export const _defaultDbData = (): IDb => {
  return { count: 0, author: { name: "John Kocer" } };
};

export const defaultData = _defaultDbData();

// Filtered Data - Reducer, slicers
const _filterDbData = createReducer(
  defaultData,
  on(INC, (state) => ({
    count: state.count + 1,
    author: { name: state.author.name },
  })),
  on(DEC, (state) => ({
    count: state.count - 1,
    author: { name: state.author.name },
  })),
  on(RESET, (state) => ({ count: 0, author: { name: state.author.name } }))
);

export function filterData(state: IDb | undefined, action: Action) {
  return _filterDbData(state, action);
}
