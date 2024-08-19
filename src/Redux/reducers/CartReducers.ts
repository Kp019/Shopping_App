// src/redux/reducers/cartReducer.js
import { ADD_TO_CART, UPDATE_CART_ITEM, REMOVE_FROM_CART } from '../actions/CartActions';

const initialState = {
    cartItems: [],
};


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1}] };
        case UPDATE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.productId ? { ...item, quantity: action.payload.quantity, subPrice: action.payload.price } : item
                ),
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default cartReducer;
