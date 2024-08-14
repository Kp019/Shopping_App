// Action Types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

// Helper functions to manage local storage
const saveProductsToLocalStorage = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

const loadProductsFromLocalStorage = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

// Action Creators
const fetchProductsRequest = () => {
  return { type: FETCH_PRODUCTS_REQUEST };
};

const fetchProductsSuccess = (products) => {
  return { type: FETCH_PRODUCTS_SUCCESS, payload: products };
};

const fetchProductsFailure = (error) => {
  return { type: FETCH_PRODUCTS_FAILURE, payload: error };
};

const addProductRequest = () => {
  return { type: ADD_PRODUCT_REQUEST };
};

const addProductSuccess = (product) => {
  return { type: ADD_PRODUCT_SUCCESS, payload: product };
};

const addProductFailure = (error) => {
  return { type: ADD_PRODUCT_FAILURE, payload: error };
};

// Thunk Actions
export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      saveProductsToLocalStorage(products);
      dispatch(fetchProductsSuccess(products));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};

export const addProduct = (productData) => {
  return async (dispatch, getState) => {
    dispatch(addProductRequest());
    try {
      const newProduct = { ...productData, id: new Date().getTime().toString() }; // Generating a unique ID
      dispatch(addProductSuccess(newProduct));
      
      const updatedProducts = [...getState().product.products, newProduct];
      saveProductsToLocalStorage(updatedProducts);
    } catch (error) {
      dispatch(addProductFailure(error.message));
    }
  };
};

// actions.ts
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const deleteProduct = (productId) => {
  const products = loadProductsFromLocalStorage();
  const updatedProducts = products.filter((product) => product.id !== productId);
  saveProductsToLocalStorage(updatedProducts);
  
  return {
    type: DELETE_PRODUCT,
    payload: productId,
  };
};

export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const updateProduct = (product) => {
  const products = loadProductsFromLocalStorage();
  const updatedProducts = products.map((p) => (p.id === product.id ? product : p));
  saveProductsToLocalStorage(updatedProducts);
  
  return {
    type: UPDATE_PRODUCT,
    payload: product,
  };
};
