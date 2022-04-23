import { PayloadAction } from "@reduxjs/toolkit";

/**
 * @returns A setter function that changes the key to passed payload.
 */
export const setStateThunk = (key: string) => (state: any, action: PayloadAction<any>) => {
    state[key] = action.payload;
};
