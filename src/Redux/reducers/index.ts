// src/redux/reducers/index.js

import { combineReducers } from 'redux';
import productReducer from '../reducers/ProductReducers';
import cartReducer from './CartReducers';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
});

export default rootReducer;
