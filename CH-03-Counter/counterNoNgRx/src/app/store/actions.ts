import { createAction } from '@ngrx/store';

// functions - actions
export const INC = createAction("[Counter Component] Increment");
export const DEC = createAction("[Counter Component] Decrement");
export const RESET = createAction("[Counter Component] Reset");
