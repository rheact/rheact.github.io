import { createSlice } from '@reduxjs/toolkit';
import { MOCHMatrix } from 'model';

const rheactSlice = createSlice({
    name: 'mocHMatrix',
    initialState: {
        level1: [],
        level2: [],
        level3: []
    } as MOCHMatrix,
    reducers: {
        SET_MOC_HAMTRIX(state, action) {
            state.level1 = action.payload.level1;
            state.level2 = action.payload.level2;
            state.level3 = action.payload.level3;
        }
    },
});

export const {
    SET_MOC_HAMTRIX
} = rheactSlice.actions;
export const { reducer: mocHMatrixReducer } = rheactSlice;
