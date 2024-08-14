import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    DELETE_PRODUCT,
    UPDATE_PRODUCT
  } from '../actions/ProductActions';
  
  const initialState = {
    products: [],
    loading: false,
    error: null
  };
  
  function updateProductInList(state, updatedProduct) {
    const updatedProducts = state.products.map((product) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      }
      return product;
    });
    return { ...state, products: updatedProducts };
  }


  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
      case ADD_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          products: action.payload
        };
      case ADD_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: [...state.products, action.payload]
        };
      case FETCH_PRODUCTS_FAILURE:
      case ADD_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case DELETE_PRODUCT:
        return {
          ...state,
          products: state.products.filter((product: any) => product.id !== action.payload),
        };
        case UPDATE_PRODUCT:
            return updateProductInList(state, action.payload);
      default:
        return state;
    }
  };
  
  export default productReducer;
  