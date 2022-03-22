/*
 * RHEACT JSON v2 STANDARD
 * Drafted by: Vikrant Gajria
 */

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
    molWtFraction?: string,
    ppe_pages?: string[],
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
 * OperatingParams represent data used in calulation.
 */

export type OperatingParams = {
    temperature?: string,
    temperatureUnit?: string,
    pressure?: string,
    pressureUnit?: string,
    heatOfReaction?: string,
    heatOfReactionUnit?: string,
    cp?: string,
    cpUnit?: string,
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

/**
 * Results returned by server
 */
export type Results = {
 adiabaticPressure?: string,
 adiabaticTemp?: string,
 finalTemp?: string,
 cameoMatrix?: string,
 hazardMatrix?: HazardRow[],
 hNums?: any,
};

/**
 * RheactState is the root state of Rheact's user input.
 */
export type RheactState = {
 type?: string,
 nameOfResearcher?: string,
 projectTitle?: string,
 labLocation?: string,
 principalInvestigator?: string,
 organization?: string,
 chemicalScheme?: string,
 description?: string,
 compound: Equation,
 operatingParams: OperatingParams,
 results: Results,
};
