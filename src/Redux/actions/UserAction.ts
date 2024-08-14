// Define the action types
export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';

// Define the action creators
export function saveUserDetails(userDetails: any) {
  return {
    type: SAVE_USER_DETAILS,
    payload: userDetails
  };
}

export function addProductToCart(product: any) {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: product
  };
}

export function removeProductFromCart(productId: number) {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: productId
  };
}