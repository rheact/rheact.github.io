import { createSlice } from '@reduxjs/toolkit';
import { setStateThunk } from './helpers';
import { MOCProjectDetails } from 'model';

const rheactSlice = createSlice({
    name: 'mocProjectDetails',
    initialState: {} as MOCProjectDetails,
    reducers: {
        SET_MOC_PROJECT_TITLE: setStateThunk('projectTitle'),
        SET_MOC_NAME_OF_RESEARCHER: setStateThunk('nameOfResearcher'),
        SET_MOC_PRINCIPAL_INVESTIGATOR: setStateThunk('principalInvestigator'),
        SET_MOC_LAB_LOCATION: setStateThunk('labLocation'),
        SET_MOC_ORGANIZATION: setStateThunk('organization'),
        SET_MOC_DESCRIPTION: setStateThunk('description')
    },
});

export const {
    SET_MOC_PROJECT_TITLE,
    SET_MOC_NAME_OF_RESEARCHER,
    SET_MOC_PRINCIPAL_INVESTIGATOR,
    SET_MOC_LAB_LOCATION,
    SET_MOC_ORGANIZATION,
    SET_MOC_DESCRIPTION
} = rheactSlice.actions;

export const { reducer: mocProjectDetailsReducer } = rheactSlice;
