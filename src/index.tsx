import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
// import { store } from './services/reducers/index';
import configureAppStore from './services/reducers/index';

const store = configureAppStore()

// import { store } from './components/app/app';
// import { rootReducer } from './services/reducers/index';
// import { reducer } from './services/reducers/reducers';
// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import { initialState } from './services/reducers/reducers';
// import { ingredientReducer } from './services/reducers/ingredientReducer';
// import { modalReducer } from './services/reducers/modalReducer';
// import { dataReducer } from './services/reducers/dataReducer';

// export const initialState = {
//   ingredients: [],
//   success: false,
//   ingredientsCurrentTab: 'bun',
//   orderDetails: {
//     isOpened: false,
//     orderNumber: null
//   },
//   ingredientDetails: {
//     isOpened: false,
//     ingredient: null
//   },
//   burgerConstructor: {
//     bun: null,
//     ingredients: [],
//   }
// };

// const store = configureStore({
//   reducer: {
//     ingredient: ingredientReducer,
//     modal: modalReducer,
//     data: dataReducer
//   },
//   // reducer,
//   // middleware: [thunk],
//   // devTools: process.env.NODE_ENV !== 'production',
//   // initialState,
//   // enhancers: [],
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

