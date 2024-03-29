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
    torr = 'torr (mmHg)',
    psia = 'psia',
    psig = 'psig',
};
export const PRESSURE_UNITS_LIST = Object.values(PressureUnit);

export enum HeatUnit {
    cal_g = 'cal/g',
    kcal_g = 'kcal/g',
    J_g = 'J/g',
    kJ_g = 'kJ/g',
    J_mol = 'J/mol',
    kJ_mol = 'kJ/mol',
    cal_mol = 'cal/mol',
    kcal_mol = 'kcal/mol',
    // btu_lb = 'btu/lb',
};
export const HEAT_UNITS_LIST = Object.values(HeatUnit);

export enum CpUnit {
    cal_g_degC = 'cal/g/°C',
    kcal_g_degC = 'kcal/g/°C',
    J_g_degC = 'J/g/°C',
    kJ_g_degC = 'kJ/g/°C',
    kcal_mol_degC = 'kcal/mol/°C',
    kJ_mol_degC = 'kJ/mol/°C',
};
export const CP_UNITS_LIST = Object.values(CpUnit);

export enum PACPressureUnit {
    atm_abs = 'atm (Absolute)',
    atm_gauge = 'atm (Gauge)',
    torr_abs = 'torr/mmHg (Absolute)',
    torr_gauge = 'torr/mmHg (Gauge)',
    kpa_abs = 'kPa (Absolute)',
    kpa_gauge = 'kPa (Gauge)',
    psi_abs = 'psi (Absolute)',
    psi_gauge = 'psi (Gauge)',
    bar_abs = 'bar (Absolute)',
    bar_gauge = 'bar (Gauge)'
}

export const PAC_PRESSURE_UNITS_LIST = Object.values(PACPressureUnit);
