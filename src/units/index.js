import { CP_STANDARDIZATION, HEAT_STANDARDIZATION, PRESSURE_STANDARDIZATION, TEMPERATURE_STANDARDIZATION } from './constants';

const standardizeThunk = (sMap) => (unit, x) => {
    const unitConversionFunction = sMap[unit];
    return unitConversionFunction(x);
}

export const standardizeTemperature = standardizeThunk(TEMPERATURE_STANDARDIZATION);
export const standardizePressure = standardizeThunk(PRESSURE_STANDARDIZATION);
export const standardizeHeat = standardizeThunk(HEAT_STANDARDIZATION);
export const standardizeCp = standardizeThunk(CP_STANDARDIZATION);

/**
 * @param {import("../pages/Tool/store/state").OperatingParams} ops 
 */
export const standardizeOperatingParams = (ops) => {
    const { temperature, temperatureUnit, pressure, pressureUnit, heatOfReaction, heatOfReactionUnit, cp, cpUnit } = ops;
    const retval = {
        temperature,
        pressure,
        heatOfReaction,
        cp,
    };

    if (temperatureUnit)
        retval.temperature = standardizeTemperature(temperatureUnit, temperature);
    if (pressureUnit)
        retval.pressure = standardizePressure(pressureUnit, pressure);
    if (heatOfReactionUnit)
        retval.heatOfReaction = standardizeHeat(heatOfReactionUnit, heatOfReaction);
    if (cpUnit)
        retval.cp = standardizeCp(cpUnit, cp);

    return retval;
};

export * from './constants';