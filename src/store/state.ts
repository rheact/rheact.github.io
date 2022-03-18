import { RheactState } from "./type";

export const initialState: RheactState = {
    type: 'CISTAR_REACTIONv2',
    compound: {
        numReactants: 0,
        numProducts: 0,
        numDiluents: 0,
        reactants: [],
        products: [],
        diluents: [],
    },
    operatingParams: {
        numSideReactions: 0,
        sideReactions: [],
    },
    results: {},
};
