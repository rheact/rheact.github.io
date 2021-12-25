export type UnitStandardizationMap = Record<string, (x: number) => number>;

export const TEMPERATURE_STANDARDIZATION: UnitStandardizationMap = {
    '°C': (x) => x,
    '°F': (x) => (x - 32) * (5 / 9),
    K: (x) => x - 273,
};

export const PRESSURE_STANDARDIZATION: UnitStandardizationMap = {
    bar: (x) => x,
    kPa: (x) => x,
    atm: (x) => x,
    'Torr (mmHg)': (x) => x,
    'psi (absolute)': (x) => x,
};

export const HEAT_STANDARDIZATION: UnitStandardizationMap = {
    'cal/g': (x) => x,
    'kcal/g': (x) => x,
    'cal/mol': (x) => x,
    'kJ/mol': (x) => x,
    'J/g': (x) => x,
    'btu/lb': (x) => x,
};

export const CP_STANDARDIZATION: UnitStandardizationMap = {
    'cal/g/*C': (x) => x,
    'kJ/mol/°C = kJ/mol/K': (x) => x,
    'kcal/mol/°C = kJ/mol/K': (x) => x,
};

export const TEMPERATURE_UNITS_LIST = Object.keys(TEMPERATURE_STANDARDIZATION);
export const PRESSURE_UNITS_LIST = Object.keys(PRESSURE_STANDARDIZATION);
export const HEAT_UNITS_LIST = Object.keys(HEAT_STANDARDIZATION);
export const CP_UNITS_LIST = Object.keys(CP_STANDARDIZATION);
