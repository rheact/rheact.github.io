import { createSlice } from '@reduxjs/toolkit';
import { PRESSURE_UNITS_LIST, PAC_PRESSURE_UNITS_LIST, TEMPERATURE_UNITS_LIST } from "units";
import { PACParams } from 'model';
import { setStateThunk } from './helpers';

const rheactSlice = createSlice({
    name: 'rheact',
    initialState: {
        chemical: undefined,
        chemicalCasNo: '',
        AQ: '',
        AQKnown: undefined,
        typeOfRelease: '',
        diameter: '',
        toxicityRating: '',
        pressure: '',
        pressureUnit: PAC_PRESSURE_UNITS_LIST[0],
        operatingTemp: '',
        operatingTempUnit: TEMPERATURE_UNITS_LIST[0],
        liquidHeight: '',
        density: '',
        vaporPressure: '',
        vaporPressureUnit: PRESSURE_UNITS_LIST[0],
        HOV: '',
        heatCapacity: '',
        boilingPoint: '',
        molecularWeight: '',
        dikedArea: '',
        isDikedArea: undefined,
        useTotalAmount: undefined,
        totalAmount: '',
        openTank: undefined,
        showHOV: undefined,
        showHC: undefined,
        showBP: undefined,
        showMW: undefined,
        showCutOff: undefined
    } as PACParams,
    reducers: {
        // PAC Params
        SET_PAC_CHEMICAL: setStateThunk('chemical'),
        SET_PAC_CHAMICAL_CASNO: setStateThunk('chemicalCasNo'),
        SET_PAC_AQ: setStateThunk('AQ'),
        SET_PAC_AQKNOWN: setStateThunk('AQKnown'),
        SET_PAC_TYPE_OF_RELEASE: setStateThunk('typeOfRelease'),
        SET_PAC_DIAMETER: setStateThunk('diameter'),
        SET_PAC_Toxicity_RATING: setStateThunk('toxicityRating'),
        SET_PAC_PRESSURE: setStateThunk('pressure'),
        SET_PAC_PRESSURE_UNIT: setStateThunk('pressureUnit'),
        SET_PAC_OPERATING_TEMP: setStateThunk('operatingTemp'),
        SET_PAC_OPERATING_TEMP_UNIT: setStateThunk('operatingTempUnit'),
        SET_PAC_LIQUID_HEIGHT: setStateThunk('liquidHeight'),
        SET_PAC_DENSITY: setStateThunk('density'),
        SET_PAC_VAPOR_PRESSURE: setStateThunk('vaporPressure'),
        SET_PAC_VAPOR_PRESSURE_UNIT: setStateThunk('vaporPressureUnit'),
        SET_PAC_HOV: setStateThunk('HOV'),
        SET_PAC_HEAT_CAPACITY: setStateThunk('heatCapacity'),
        SET_PAC_BOILING_POINT: setStateThunk('boilingPoint'),
        SET_PAC_MW: setStateThunk('molecularWeight'),
        SET_PAC_DIKED_AREA: setStateThunk('dikedArea'),
        SET_PAC_IS_DA: setStateThunk('isDikedArea'),
        SET_PAC_USE_TA: setStateThunk('useTotalAmount'),
        SET_PAC_TOTAL_AMOUNT: setStateThunk('totalAmount'),
        SET_PAC_OPEN_TANK: setStateThunk('openTank'),
        SET_PAC_SHOW_HOV: setStateThunk('showHOV'),
        SET_PAC_SHOW_HC: setStateThunk('showHC'),
        SET_PAC_SHOW_BP: setStateThunk('showBP'),
        SET_PAC_SHOW_MW: setStateThunk('showMW'),
        SET_PAC_SHOW_CUT_OFF: setStateThunk('showCutOff')
    },
});

export const {
    SET_PAC_CHEMICAL,
    SET_PAC_CHAMICAL_CASNO,
    SET_PAC_AQ,
    SET_PAC_AQKNOWN,
    SET_PAC_TYPE_OF_RELEASE,
    SET_PAC_DIAMETER,
    SET_PAC_Toxicity_RATING,
    SET_PAC_PRESSURE,
    SET_PAC_PRESSURE_UNIT,
    SET_PAC_OPERATING_TEMP,
    SET_PAC_OPERATING_TEMP_UNIT,
    SET_PAC_LIQUID_HEIGHT,
    SET_PAC_DENSITY,
    SET_PAC_VAPOR_PRESSURE,
    SET_PAC_VAPOR_PRESSURE_UNIT,
    SET_PAC_HOV,
    SET_PAC_HEAT_CAPACITY,
    SET_PAC_BOILING_POINT,
    SET_PAC_MW,
    SET_PAC_DIKED_AREA,
    SET_PAC_IS_DA,
    SET_PAC_USE_TA,
    SET_PAC_TOTAL_AMOUNT,
    SET_PAC_OPEN_TANK,
    SET_PAC_SHOW_HOV,
    SET_PAC_SHOW_HC,
    SET_PAC_SHOW_BP,
    SET_PAC_SHOW_MW,
    SET_PAC_SHOW_CUT_OFF
} = rheactSlice.actions;

export const { reducer: pacReducer } = rheactSlice;
