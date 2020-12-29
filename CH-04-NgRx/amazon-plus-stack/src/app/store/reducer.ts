import { ActionsUnion, ActionTypes } from './actions';

export const initialState = {
  items: [],
  cart: []
};

export function ShopReducer(state = initialState, action: ActionsUnion) {
  console.log(action);
  switch (action.type) {
    case ActionTypes.LOADSUCCESS:
      return {
        ...state,
        items: [...action.payload]
      };

    case ActionTypes.ADD:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };

    case ActionTypes.REMOVE:
      return {
        ...state,
        cart: [...state.cart.filter(item => item.name !== action.payload.name)]
      };

    default:
      return state;
  }
}
