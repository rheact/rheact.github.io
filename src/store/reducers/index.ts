import { combineReducers } from '@reduxjs/toolkit';
import { RheactState } from 'model';
import { equationReducer } from './equation';
import { infoReducer } from './info';
import { operationReducer } from './operation';
import { ppeReducer } from './ppe';
import { reportReducer } from './report';
import { mocProjectDetailsReducer } from './mocProjectDetails';
import { mocComponentsReducer } from './mocComponents';
import { mocOperatingParametersReducer } from './mocOperatingParameters';
import { mocQuestionaireReducer } from './mocQuestionaire';
import { mocHMatrixReducer } from './mocHmatrix'

const reducer = combineReducers<RheactState>({
    compound: equationReducer,
    operatingParams: operationReducer,
    info: infoReducer,
    ppe_questionnaire: ppeReducer,
    results: reportReducer,
    mocProjectDetails: mocProjectDetailsReducer,
    mocComponents: mocComponentsReducer,
    mocOperatingParameters: mocOperatingParametersReducer,
    mocQuestionnaireResponse: mocQuestionaireReducer,
    mocHMatrix: mocHMatrixReducer
});

export default reducer;
export * from './equation';
export * from './info';
export * from './operation';
export * from './ppe';
export * from './report';
export * from './mocProjectDetails';
export * from './mocComponents';
export * from './mocOperatingParameters';
export * from './mocQuestionaire';
export * from './mocHmatrix';
