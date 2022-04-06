import { CP_UNITS_LIST, HEAT_UNITS_LIST, PRESSURE_UNITS_LIST, TEMPERATURE_UNITS_LIST } from "units";
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
        temperature: '',
        temperatureUnit: TEMPERATURE_UNITS_LIST[0],
        pressure: '',
        pressureUnit: PRESSURE_UNITS_LIST[0],
        heatOfReaction: '',
        heatOfReactionUnit: HEAT_UNITS_LIST[0],
        cp: '',
        cpUnit: CP_UNITS_LIST[0],
    },
    ppe_questionnaire: {},
    results: {},
};
