// ../Utils/checkCartDuplicate.ts
export function checkDuplicateInCart(item: any, cartItems: any[], userID) {
    // console.log(cartItems.some((cartItem) => cartItem.id === item.id && cartItem.userID === userID));
    return cartItems.some((cartItem) => cartItem.id === item.id && cartItem.userID === userID);
}