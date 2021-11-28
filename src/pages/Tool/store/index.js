import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

/** Store to be passed to provider. */
export const store = configureStore({
    reducer,
    devTools: true,
});