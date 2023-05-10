/*
 * RHEACT JSON v3 STANDARD
 * Drafted by: Vikrant Gajria
 */

import { CpUnit, HeatUnit, PressureUnit, TemperatureUnit } from "units";

/**
 * Chemical represents data extracted from SDS.
 */
export type Chemical = {
    phase?: string,
    heatOfFormation?: string,
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
    // THOR Stoichiometric Coefficient
    thor_sc?: string,
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
    generationTime?: string
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
 * MOC Project Details
 */
export type MOCProjectDetails = {
    projectTitle?: string
    nameOfResearcher?: string,
    principalInvestigator?: string,
    labLocation?: string,
    organization?: string,
    description?: string
}

/**
 * MOC Components
 */
export type MOCComponents = {
    numChemicals: number,
    chemicals: Chemical[]
};

/**
 * MOC Operating Parameters
 */
export type MOCOperatingParameters = {
    operatingTemp: string,
    operatingPressure: string,
    quantityOfKeyReagent: string,
    totalReactionScale: string
}

/**
 * MOC Questionnaire map
 * From question ID to response
 */
export type MOCQuestionnaireResponse = {
    [key: string]: string[] | {
        yes: string;
        no: string;
    } | {
        yes: string;
        no: {
            personnelChange: string;
            noPersonnelChange: string;
        };
    }
}

/**
 * MOC H matrix mapping
 * Level1: [hazard classes that are all green (Safe) and/or all yellow (Caution)]
 * Level2: [hazard classes that has at least one orange (Warning)]
 * Level3: [hazard classes that has at least one red (Danger)]
 */
export type MOCHMatrix = {
    level1: string[],
    level2: string[],
    level3: string[]
}

/**
 * PAC Params
 */
export type PACParams = {
    chemical?: Chemical,
    chemicalCasNo?: string,
    AQ?: string,
    AQKnown?: boolean,
    typeOfRelease?: string,
    diameter?: string,
    toxityRating?: string,
    pressure?: string,
    pressureUnit?: string,
    operatingTemp?: string,
    operatingTempUnit?: string,
    liquidHeight?: string,
    density?: string,
    vaporPressure?: string,
    vaporPressureUnit?: string,
    HOV?: string,
    heatCapacity?: string,
    boilingPoint?: string,
    molecularWeight?: string,
    dikedArea?: string,
    isDikedArea?: boolean,
    useTotalAmount?: boolean,
    totalAmount?: string,
    openTank?: boolean,
    showHOV?: boolean,
    showHC?: boolean,
    showBP?: boolean,
    showMW?: boolean,
    showCutOff?: boolean
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
    mocProjectDetails: MOCProjectDetails,
    mocComponents: MOCComponents,
    mocOperatingParameters: MOCOperatingParameters,
    mocQuestionnaireResponse: MOCQuestionnaireResponse,
    mocHMatrix: MOCHMatrix,
    pacParams: PACParams
};