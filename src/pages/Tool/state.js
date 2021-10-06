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
 * @property {Chemical[]} dilutents
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
 *
 *****************************************
 */

/**
 * @type {RheactState}
 * */
const initialState = {
  type: "CISTAR_REACTIONv2",
  operatingParams: {
    numSideReactions: 0,
    sideReactions: [],
  },
};

export default initialState;
