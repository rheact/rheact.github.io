import { createSlice } from '@reduxjs/toolkit';
import { Report } from 'model';

const rheactSlice = createSlice({
    name: 'report',
    initialState: {} as Report,
    reducers: {
        RESET_RESULTS(state, _action) {
            // state = {};
            state.calculations = undefined
            state.cameoMatrix = undefined
            state.hNums = undefined
        },

        SET_CALCULATIONS(state, action) {
            state.calculations = action.payload;
        },

        SET_CAMEO(state, action) {
            state.cameoMatrix = action.payload;
        },

        SET_HAZARDS(state, action) {
            state.hazardMatrix = action.payload;
        },

        SET_HNUMS(state, action) {
            state.hNums = action.payload;
        },

        SET_TIME(state, action) {
            state.generationTime = action.payload;
        }
    },
});

export const {
    RESET_RESULTS,
    SET_CALCULATIONS,
    SET_CAMEO,
    SET_HAZARDS,
    SET_HNUMS,
    SET_TIME
} = rheactSlice.actions;

export const { reducer: reportReducer } = rheactSlice;
