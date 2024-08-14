// src/redux/store.js

import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';
import { loadState, saveState } from '../Utils/localStorage';
// import userReducer from './reducers/UserReducer';

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk)
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
