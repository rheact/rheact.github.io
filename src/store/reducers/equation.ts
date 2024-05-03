import { createSlice } from '@reduxjs/toolkit';
import { Equation } from 'model';

const rheactSlice = createSlice({
    name: 'equation',
    initialState: {
        numReactants: 0,
        numProducts: 0,
        numDiluents: 0,
        reactants: [],
        products: [],
        diluents: [],
    } as Equation,
    reducers: {
        ADD_REACTANT(state, action) {
            state.numReactants += 1;
            state.reactants.push(action.payload);
        },
        REMOVE_REACTANT(state, action) {
            if (state.numReactants > 0) {
                state.numReactants -= 1;
            }
            
            // state.reactants = state.reactants.filter(reactant => reactant.casNo !== action.payload)
            state.reactants.splice(action.payload, 1);
        },
        CHANGE_REACTANT(state, action) {
            const { index, update } = action.payload;
            state.reactants[index] = update;

        },

        ADD_PRODUCT(state, action) {
            state.numProducts += 1;
            state.products.push(action.payload);
        },
        REMOVE_PRODUCT(state, action) {
            if (state.numProducts > 0) {
                state.numProducts -= 1;
            }

            state.products.splice(action.payload, 1);
            // state.products = state.products.filter(product => product.casNo !== action.payload)
        },
        CHANGE_PRODUCT(state, action) {
            const { index, update } = action.payload;
            state.products[index] = update;
        },

        ADD_DILUENT(state, action) {
            state.numDiluents += 1;
            state.diluents.push(action.payload);
        },
        REMOVE_DILUENT(state, action) {
            if (state.numDiluents > 0) {
                state.numDiluents -= 1;
            }

            state.diluents.splice(action.payload, 1);
            // state.diluents = state.diluents.filter(diluent => diluent.casNo !== action.payload)
        },
        CHANGE_DILUENT(state, action) {
            const { index, update } = action.payload;
            state.diluents[index] = update;
        },

        CHANGE_CHEMICAL_PHASE(state, action) {
            const { section, index, newPhase } = action.payload;
            if(section === 'Reactant') {
                state.reactants[index].phase = newPhase
            } else if (section === 'Product') {
                state.products[index].phase = newPhase
            } else {
                state.diluents[index].phase = newPhase
            }
        },

        SET_HEAT_OF_FORMATION(state, action) {
            const { section, index, heatOfFormation} = action.payload
            if(section === 'Reactant') {
                state.reactants[index].heatOfFormation = heatOfFormation
            } else {
                state.products[index].heatOfFormation = heatOfFormation
            }
        }
    },
});

export const {
    ADD_REACTANT,
    CHANGE_REACTANT,
    REMOVE_REACTANT,

    ADD_PRODUCT,
    CHANGE_PRODUCT,
    REMOVE_PRODUCT,

    ADD_DILUENT,
    CHANGE_DILUENT,
    REMOVE_DILUENT,

    CHANGE_CHEMICAL_PHASE,
    SET_HEAT_OF_FORMATION
} = rheactSlice.actions;
export const { reducer: equationReducer } = rheactSlice;
