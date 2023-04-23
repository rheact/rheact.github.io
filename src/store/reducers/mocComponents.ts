import { createSlice } from '@reduxjs/toolkit';
import { MOCComponents } from 'model';

const rheactSlice = createSlice({
    name: 'mocComponents',
    initialState: {
        numChemicals: 0,
        chemicals: [],
    } as MOCComponents,
    reducers: {
        ADD_CHEMICAL(state, action) {
            state.numChemicals += 1;
            state.chemicals.push(action.payload);
        },

        CHANGE_CHEMICAL(state, action) {
            const { index, update } = action.payload;
            state.chemicals[index] = update;
        },

        REMOVE_CHEMICAL(state, action) {
            if (state.numChemicals > 0) {
                state.numChemicals -= 1;
            }

            state.chemicals.splice(action.payload, 1);
        }
    },
});

export const {
    ADD_CHEMICAL,
    CHANGE_CHEMICAL,
    REMOVE_CHEMICAL
} = rheactSlice.actions;
export const { reducer: mocComponentsReducer } = rheactSlice;
