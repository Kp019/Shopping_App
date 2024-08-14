import { SAVE_USER_DETAILS, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from '../actions/UserAction';

// Define the initial state
const initialState = {
  userDetails: {},
  cart: []
};

// Define the reducer function
function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case SAVE_USER_DETAILS:
      return { ...state, userDetails: action.payload };
    case ADD_PRODUCT_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case REMOVE_PRODUCT_FROM_CART:
      return { ...state, cart: state.cart.filter((product: any) => product.id !== action.payload) };
    default:
      return state;
  }
}

export default userReducer