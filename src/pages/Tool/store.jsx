import { createSlice, createStore } from '@reduxjs/toolkit';
import initialState from './state';

/**
 * @returns {Function} A setter function that changes the key to passed payload.
 */
const setStateThunk = (key) => (state, action) => { state[key] = action.payload; };

/**
 * @returns {Function} A setter function that changes the key of OperatingParams to passed payload.
 */
const setParamThunk = (key) => (state, action) => { state["operatingParams"][key] = action.payload; };

const rheactSlice = createSlice({
    name: "rheact",
    initialState,
    reducers: {
        // State
        SET_NAME_OF_RESEARCHER: setStateThunk("nameOfResearcher"),
        SET_PROJECT_TITLE: setStateThunk("projectTitle"),
        SET_LAB_LOCATION: setStateThunk("labLocation"),
        SET_PRINCIPAL_INVESTIGATOR: setStateThunk("principalInvestigator"),
        SET_ORGANIZATION: setStateThunk("organization"),
        SET_CHEMICAL_SCHEME: setStateThunk("chemicalScheme"),
        SET_DESCRIPTION: setStateThunk("description"),

        // Operating Params
        SET_TEMPERATURE: setParamThunk("temperature"),
        SET_PRESSURE: setParamThunk("pressure"),
        SET_HEAT_OF_REACTION: setParamThunk("heatOfReaction"),
        SET_CP: setParamThunk("cp"),
        SET_PHYSICAL_STATE: setParamThunk("physicalState"),
        SET_REACTION_CLASS: setParamThunk("reactionClass"),
        SET_REACTION_SCALE: setParamThunk("reactionScale"),
        SET_KEY_REAGENT_QUANTITY: setParamThunk("keyReagentQuantity"),

        // Side Reactions
        ADD_SIDE_REACTION(state) {
            state.operatingParams.numSideReactions += 1;
            state.operatingParams.sideReactions.push({
                tempOnset: '',
                pressureOnset: '',
                details: '',
            });
        },
        REMOVE_SIDE_REACTION(state, action) {
            if(state.operatingParams.numSideReactions > 0) {
                state.operatingParams.numSideReactions -= 1;
            }

            state.operatingParams.sideReactions.splice(action.payload, 1);
        },

        SET_SR_TEMPERATURE(state, action) {
            const { index, text } = action.payload;
            state.operatingParams.sideReactions[index].tempOnset = text;
        },

        SET_SR_PRESSURE(state, action) {
            const { index, text } = action.payload;
            state.operatingParams.sideReactions[index].pressureOnset = text;
        },

        SET_SR_DETAILS(state, action) {
            const { index, text } = action.payload;
            state.operatingParams.sideReactions[index].details = text;
        },

        // Compound
        ADD_REACTANT(state, action) {
            state.compound.numReactants += 1;
            state.compound.reactants.push(action.payload);
        },
        REMOVE_REACTANT(state, action) {
            if(state.compound.numReactants > 0) {
                state.compound.numReactants -= 1;
            }

            state.compound.reactants.splice(action.payload, 1);
        },
        CHANGE_REACTANT(state, action) {
            const { index, update } = action.payload;
            state.compound.reactants[index] = update;
        },

    }
});

/** Store to be passed to provider. */
export const store = createStore(
    rheactSlice.reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export const {
    SET_NAME_OF_RESEARCHER,
    SET_PROJECT_TITLE,
    SET_LAB_LOCATION,
    SET_PRINCIPAL_INVESTIGATOR,
    SET_ORGANIZATION,
    SET_CHEMICAL_SCHEME,
    SET_DESCRIPTION,

    SET_TEMPERATURE,
    SET_PRESSURE,
    SET_HEAT_OF_REACTION,
    SET_CP,
    SET_PHYSICAL_STATE,
    SET_REACTION_CLASS,
    SET_REACTION_SCALE,
    SET_KEY_REAGENT_QUANTITY,

    ADD_SIDE_REACTION,
    REMOVE_SIDE_REACTION,
    SET_SR_TEMPERATURE,
    SET_SR_PRESSURE,
    SET_SR_DETAILS,

    ADD_REACTANT,
    CHANGE_REACTANT,
    REMOVE_REACTANT,
} = rheactSlice.actions;
