import { Action } from '@ngrx/store';

interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
}

export enum ActionTypes {
  ADD = '[Product] Add to cart',
  REMOVE = '[Product] Remove from cart',
  LOADITEMS = '[Products] Load items from server',
  LOADSUCCESS = '[Products] Load success'
}

export class AddToCart implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload: Product) {}
}

export class GetItems implements Action {
  readonly type = ActionTypes.LOADITEMS;
}

export class RemoveFromCart implements Action {
  readonly type = ActionTypes.REMOVE;

  constructor(public payload: Product) {}
}

export class LoadItems implements Action {
  readonly type = ActionTypes.LOADSUCCESS;

  constructor(public payload: Product[]) {}
}

export type ActionsUnion = AddToCart | RemoveFromCart | LoadItems | GetItems;
