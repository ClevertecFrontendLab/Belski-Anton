import { createReduxHistoryContext } from 'redux-first-history';
import { combineReducers,configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { authApi } from '../api/methods-api';

import authReducer from './auth-slice';
import errorReducer from './error-training-slice';
import loadReducer from './loading-slice';
import traninigReducer from './traninig-slice';

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
        training: traninigReducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware, authApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
