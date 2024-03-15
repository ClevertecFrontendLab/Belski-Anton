import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { authApi } from '../api/methods-api';
import authReducer from './auth-slice';
import loadReducer from './loading-slice';
import errorReducer from './error-training-slice';
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 50,
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        load: loadReducer,
        error: errorReducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware, authApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
