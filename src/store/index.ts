import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

/**
 * Store to be passed to provider
 */
export default configureStore({
    reducer,
    devTools: true,
});

export * from './state';
export * from './type';
export * from './reducer';