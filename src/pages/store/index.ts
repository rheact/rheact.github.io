import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

/**
 * Store to be passed to provider
 */
export default configureStore({
    reducer,
    devTools: true,
});
