/*
 * RHEACT JSON v3 STANDARD
 * Drafted by: Vikrant Gajria
 */

import { CpUnit, HeatUnit, PressureUnit, TemperatureUnit } from "units";

export enum ComponentList {
    reactant = "reactant",
    product = "product",
    diluent = "diluent",
};

/**
 * Chemical represents data extracted from SDS.
 */
export type Chemical = {
    autoIgnitionTemp?: string,
    boilingPt?: string,
    casNo?: string,
    cp?: string,
    decompositionTemp?: string,
    flashPt?: string,
    hNumbers?: string,
    hStatements?: string,
    lowerExplosionLim?: string,
    molWt?: string,
    ph?: string,
    productName?: string,
    relDensity?: string,
    upperExplosionLim?: string,
    vapourDensity?: string,
    vapourPressure?: string,
    viscosity?: string,
    ppe_pages?: string[],
    ppe_pagerange?: any[],
    molWtFraction?: string,
    neglected: boolean,
};

/**
 * Equation represents chemicals involved in a reaction.
 */
export type Equation = {
    numReactants: number;
    numProducts: number;
    numDiluents: number;
    reactants: Chemical[];
    products: Chemical[];
    diluents: Chemical[];
};

/**
 * SideReactions are additional data in the report.
 */
export type SideReaction = {
    tempOnset: string,
    pressureOnset: string,
    details: string,
};

/**
 * Basis of reaction is used for calculations.
 */
export type BasisChemical = {
    list: 'reactants' | 'products' | 'diluents',
    index: number,
};

/**
 * OperatingParams represent data used in calulation.
 */
export type OperatingParams = {
    temperature: string,
    temperatureUnit: TemperatureUnit,
    pressure: string,
    pressureUnit: PressureUnit,
    heatOfReaction: string,
    heatOfReactionUnit: HeatUnit,
    cp: string,
    cpUnit: CpUnit,
    basis?: BasisChemical,
    physicalState?: string,
    reactionClass?: string,
    reactionScale?: string,
    keyReactantQuantity?: string,
    numSideReactions: number,
    sideReactions: SideReaction[],
};

/**
 * Hazard Matrix
 */
export type HazardRow = {
    carcinogen: string,
    eyeContact: string,
    flammability: string,
    ingestion: string,
    other: string,
    reactivity: string,
    reproductiveHazard: string,
    respiratory: string,
    sensitizer: string,
    skinAbsorption: string,
    skinContact: string,
}

export type Calculations = {
    adiabaticPressure: string,
    adiabaticTemp: string,
    finalTemp: string,
    adiabaticPressureDisplay: string,
    adiabaticTempDisplay: string,
    finalTempDisplay: string,
};

/**
 * Results returned by server
 */
export type Report = {
    cameoMatrix?: string,
    calculations?: Calculations,
    hazardMatrix?: HazardRow[],
    hNums?: any,
};

/**
 * Optional information by the user
 */
export type ProjectInfo = {
    type?: string,
    nameOfResearcher?: string,
    projectTitle?: string,
    labLocation?: string,
    principalInvestigator?: string,
    organization?: string,
    chemicalScheme?: string,
    description?: string,
}

/**
 * PPE Questionnaire map
 * From question ID to response
 */
export type QuestionnaireResponse = {
    [key: string]: boolean,
}

/**
 * RheactState is the root state of Rheact's user input.
 */
export type RheactState = {
    info: ProjectInfo,
    compound: Equation,
    operatingParams: OperatingParams,
    ppe_questionnaire: QuestionnaireResponse,
    results: Report,
};
