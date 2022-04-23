import { combineReducers } from '@reduxjs/toolkit';
import { RheactState } from 'model';
import { equationReducer } from './equation';
import { infoReducer } from './info';
import { operationReducer } from './operation';
import { ppeReducer } from './ppe';
import { reportReducer } from './report';

const reducer = combineReducers<RheactState>({
    compound: equationReducer,
    operatingParams: operationReducer,
    info: infoReducer,
    ppe_questionnaire: ppeReducer,
    results: reportReducer,
});

export default reducer;
export * from './equation';
export * from './info';
export * from './operation';
export * from './ppe';
export * from './report';
