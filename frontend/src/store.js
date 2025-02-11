import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // ✅ Correct way
import { composeWithDevTools } from '@redux-devtools/extension';
import { productListReducer } from './reducers/productReducers';

// Combine all reducers
const rootReducer = combineReducers({
  productList: productListReducer,
});

// Initial state (can be empty)
const initialState = {};

// Middleware (to handle async actions)
const middleware = [thunk];

// Create Redux store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
