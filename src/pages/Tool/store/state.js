/**
 * RHEACT JSON v2 STANDARD
 * Drafted by: Vikrant Gajria
 *****************************************
 *
 * Chemical represents data extracted from SDS.
 *
 * @typedef {Object} Chemical
 * @property {string=} autoIgnitionTemp
 * @property {string=} boilingPt
 * @property {string=} casNo
 * @property {string=} cp
 * @property {string=} decompositionTemp
 * @property {string=} flashPt
 * @property {string=} hNumbers
 * @property {string=} hStatements
 * @property {string=} lowerExplosionLim
 * @property {string=} molWt
 * @property {string=} ph
 * @property {string=} productName
 * @property {string=} relDensity
 * @property {string=} upperExplosionLim
 * @property {string=} vapourDensity
 * @property {string=} vapourPressure
 * @property {string=} viscosity
 * @property {string=} molWtFraction
 *
 * Compound represents chemicals involved in a reaction.
 *
 * @typedef {Object} Compound
 * @property {number} numReactants
 * @property {number} numProducts
 * @property {number} numDiluents
 * @property {Chemical[]} reactants
 * @property {Chemical[]} products
 * @property {Chemical[]} diluents
 *
 * SideReactions are additional data in the report.
 *
 * @typedef {Object} SideReaction
 * @property {string} tempOnset
 * @property {string} pressureOnset
 * @property {string} details
 *
 * OperatingParams represent data used in calulation.
 *
 * @typedef {Object} OperatingParams
 * @property {string} temperature
 * @property {string} pressure
 * @property {string} heatOfReaction
 * @property {string} cp
 * @property {string=} physicalState
 * @property {string=} reactionClass
 * @property {string=} reactionScale
 * @property {string=} keyReactantQuantity
 * @property {number} numSideReactions
 * @property {SideReaction[]} sideReactions
 * 
 * Hazard Matrix
 *
 * @typedef {Object} hazardRow
 * @property {string} carcinogen
 * @property {string} eyeContact
 * @property {string} flammability
 * @property {string} ingestion
 * @property {string} other
 * @property {string} reactivity
 * @property {string} reproductiveHazard
 * @property {string} respiratory
 * @property {string} sensitizer
 * @property {string} skinAbsorption
 * @property {string} skinContact
 * 
 * Results
 * 
 * @typedef {Object} Results
 * @property {string} adiabaticPressure
 * @property {string} adiabaticTemp
 * @property {string} finalTemp
 * @property {string} cameoMatrix
 * @property {hazardRow[]} hazardMatrix
 * @property {any} hNums
 *
 * RheactState is the root state of Rheact's user input.
 *
 * @typedef {Object} RheactState
 * @property {string=} type
 * @property {string=} nameOfResearcher
 * @property {string=} projectTitle
 * @property {string=} labLocation
 * @property {string=} principalInvestigator
 * @property {string=} organization
 * @property {string=} chemicalScheme
 * @property {string=} description
 * @property {Compound} compound
 * @property {OperatingParams} operatingParams
 * @property {Results} results
 *
 *****************************************
 */

/**
 * @type {RheactState}
 * */
const initialState = {
    type: "CISTAR_REACTIONv2",
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
    },
    results: {},
};

export default initialState;