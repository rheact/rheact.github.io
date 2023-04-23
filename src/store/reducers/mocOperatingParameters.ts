import { createSlice } from '@reduxjs/toolkit';
import { MOCOperatingParameters } from 'model';
import { setStateThunk } from './helpers';

const rheactSlice = createSlice({
    name: 'mocOperatingParameters',
    initialState: {} as MOCOperatingParameters,
    reducers: {
        // Operating Params
        SET_MOC_TEMP: setStateThunk('operatingTemp'),
        SET_MOC_PRESSURE: setStateThunk('operatingPressure'),
        SET_MOC_QUAN: setStateThunk('quantityOfKeyReagent'),
        SET_MOC_TOTAL_SCALE: setStateThunk('totalReactionScale')
    },
});

export const {
    SET_MOC_TEMP,
    SET_MOC_PRESSURE,
    SET_MOC_QUAN,
    SET_MOC_TOTAL_SCALE
} = rheactSlice.actions;

export const { reducer: mocOperatingParametersReducer } = rheactSlice;
