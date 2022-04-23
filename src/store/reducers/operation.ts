import { createSlice } from '@reduxjs/toolkit';
import { CP_UNITS_LIST, HEAT_UNITS_LIST, PRESSURE_UNITS_LIST, TEMPERATURE_UNITS_LIST } from "units";
import { OperatingParams } from 'model';
import { setStateThunk } from './helpers';

const rheactSlice = createSlice({
    name: 'rheact',
    initialState: {
        numSideReactions: 0,
        sideReactions: [],
        temperature: '',
        temperatureUnit: TEMPERATURE_UNITS_LIST[0],
        pressure: '',
        pressureUnit: PRESSURE_UNITS_LIST[0],
        heatOfReaction: '',
        heatOfReactionUnit: HEAT_UNITS_LIST[0],
        cp: '',
        cpUnit: CP_UNITS_LIST[0],
    } as OperatingParams,
    reducers: {
        // Operating Params
        SET_TEMPERATURE: setStateThunk('temperature'),
        SET_PRESSURE: setStateThunk('pressure'),
        SET_HEAT_OF_REACTION: setStateThunk('heatOfReaction'),
        SET_CP: setStateThunk('cp'),
        SET_TEMPERATURE_UNIT: setStateThunk('temperatureUnit'),
        SET_PRESSURE_UNIT: setStateThunk('pressureUnit'),
        SET_HEAT_OF_REACTION_UNIT: setStateThunk('heatOfReactionUnit'),
        SET_CP_UNIT: setStateThunk('cpUnit'),
        SET_BASIS: setStateThunk('basis'),
        SET_PHYSICAL_STATE: setStateThunk('physicalState'),
        SET_REACTION_CLASS: setStateThunk('reactionClass'),
        SET_REACTION_SCALE: setStateThunk('reactionScale'),
        SET_KEY_REAGENT_QUANTITY: setStateThunk('keyReactantQuantity'),

        // Side Reactions
        ADD_SIDE_REACTION(state) {
            state.numSideReactions += 1;
            state.sideReactions.push({
                tempOnset: '',
                pressureOnset: '',
                details: '',
            });
        },

        REMOVE_SIDE_REACTION(state, action) {
            if (state.numSideReactions > 0) {
                state.numSideReactions -= 1;
            }

            state.sideReactions.splice(action.payload, 1);
        },

        SET_SR_TEMPERATURE(state, action) {
            const { index, text } = action.payload;
            state.sideReactions[index].tempOnset = text;
        },

        SET_SR_PRESSURE(state, action) {
            const { index, text } = action.payload;
            state.sideReactions[index].pressureOnset = text;
        },

        SET_SR_DETAILS(state, action) {
            const { index, text } = action.payload;
            state.sideReactions[index].details = text;
        },
    },
});

export const {
    SET_TEMPERATURE,
    SET_PRESSURE,
    SET_HEAT_OF_REACTION,
    SET_CP,
    SET_TEMPERATURE_UNIT,
    SET_PRESSURE_UNIT,
    SET_HEAT_OF_REACTION_UNIT,
    SET_CP_UNIT,
    SET_BASIS,
    SET_PHYSICAL_STATE,
    SET_REACTION_CLASS,
    SET_REACTION_SCALE,
    SET_KEY_REAGENT_QUANTITY,

    ADD_SIDE_REACTION,
    REMOVE_SIDE_REACTION,
    SET_SR_TEMPERATURE,
    SET_SR_PRESSURE,
    SET_SR_DETAILS,
} = rheactSlice.actions;

export const { reducer: operationReducer } = rheactSlice;
