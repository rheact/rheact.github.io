export enum TemperatureUnit {
    degC = '°C',
    degF = '°F',
    K = 'K',
};
export const TEMPERATURE_UNITS_LIST = Object.values(TemperatureUnit);

export enum PressureUnit {
    bar = 'bar',
    kPa = 'kPa',
    atm = 'atm',
    torr = 'torr',
    psia = 'psia',
    psig = 'psig',
};
export const PRESSURE_UNITS_LIST = Object.values(PressureUnit);

export enum HeatUnit {
    cal_g = 'cal/g',
    kcal_g = 'kcal/g',
    cal_mol = 'cal/mol',
    kJ_mol = 'kJ/mol',
    J_g = 'J/g',
    btu_lb = 'btu/lb',
};
export const HEAT_UNITS_LIST = Object.values(HeatUnit);

export enum CpUnit {
    cal_g_degC = 'cal/g/°C',
    kJ_mol_degC = 'kJ/mol/°C',
    kcal_mol_degC = 'kcal/mol/°C',
};
export const CP_UNITS_LIST = Object.values(CpUnit);
