import { createSlice } from '@reduxjs/toolkit';
import { setStateThunk } from './helpers';
import { ProjectInfo } from 'model';

const rheactSlice = createSlice({
    name: 'projectInfo',
    initialState: {
        projectTitle: 'Untitled',
    } as ProjectInfo,
    reducers: {
        SET_NAME_OF_RESEARCHER: setStateThunk('nameOfResearcher'),
        SET_PROJECT_TITLE: setStateThunk('projectTitle'),
        SET_LAB_LOCATION: setStateThunk('labLocation'),
        SET_PRINCIPAL_INVESTIGATOR: setStateThunk('principalInvestigator'),
        SET_ORGANIZATION: setStateThunk('organization'),
        SET_CHEMICAL_SCHEME: setStateThunk('chemicalScheme'),
        SET_DESCRIPTION: setStateThunk('description'),
    },
});

export const {
    SET_NAME_OF_RESEARCHER,
    SET_PROJECT_TITLE,
    SET_LAB_LOCATION,
    SET_PRINCIPAL_INVESTIGATOR,
    SET_ORGANIZATION,
    SET_CHEMICAL_SCHEME,
    SET_DESCRIPTION,
} = rheactSlice.actions;

export const { reducer: infoReducer } = rheactSlice;
