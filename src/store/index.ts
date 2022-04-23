import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';


/**
 * Creates tore to be passed to provider
 */
export default function createStore(preloadedState=undefined) {
    return configureStore({
        reducer,
        preloadedState,
        devTools: true,
    });
}

export * from './reducers';
