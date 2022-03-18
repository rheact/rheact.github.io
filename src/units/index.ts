import { OperatingParams } from '../pages/store/state';
import {
    CP_STANDARDIZATION,
    HEAT_STANDARDIZATION,
    PRESSURE_STANDARDIZATION,
    TEMPERATURE_STANDARDIZATION,
    UnitStandardizationMap,
} from './constants';

const standardizeThunk = (sMap: UnitStandardizationMap) => (unit: string, x: number) => {
    const unitConversionFunction = sMap[unit];
    return unitConversionFunction(x);
};

export const standardizeTemperature = standardizeThunk(TEMPERATURE_STANDARDIZATION);
export const standardizePressure = standardizeThunk(PRESSURE_STANDARDIZATION);
export const standardizeHeat = standardizeThunk(HEAT_STANDARDIZATION);
export const standardizeCp = standardizeThunk(CP_STANDARDIZATION);

export const standardizeOperatingParams = (ops: OperatingParams) => {
    const {
        temperature,
        temperatureUnit,
        pressure,
        pressureUnit,
        heatOfReaction,
        heatOfReactionUnit,
        cp,
        cpUnit,
    } = ops;

    const retval: OperatingParams = {};

    if (temperatureUnit && temperature) {
        retval.temperature = standardizeTemperature(temperatureUnit, parseInt(temperature, 10))
            .toString();
    }
    if (pressureUnit && pressure) {
        retval.pressure = standardizePressure(pressureUnit, parseInt(pressure, 10))
            .toString();
    }
    if (heatOfReactionUnit && heatOfReaction) {
        retval.heatOfReaction = standardizeHeat(heatOfReactionUnit, parseInt(heatOfReaction, 10))
            .toString();
    }
    if (cpUnit && cp) {
        retval.cp = standardizeCp(cpUnit, parseInt(cp, 10))
            .toString();
    }

    return retval;
};

export * from './constants';
