// src/redux/actions/cartActions.js

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product) => {
    return { type: ADD_TO_CART, payload: product };
};

export const updateCartItem = (productId: number, quantity: number, price: number) => {
    return { type: UPDATE_CART_ITEM, payload: { productId, quantity, price } };
};

export const removeFromCart = (productId) => {
    return { type: REMOVE_FROM_CART, payload: productId };
};
