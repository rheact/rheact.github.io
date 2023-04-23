import { createSlice } from '@reduxjs/toolkit';
import { MOCQuestionnaireResponse } from 'model';

const rheactSlice = createSlice({
    name: 'mocQuestionnaire',
    initialState: {} as MOCQuestionnaireResponse,
    reducers: {
        SET_MOC_QUESTION(state, action) {
            // Delete if re-click
            if(action.payload.response === state[action.payload.uid]) {
                delete state[action.payload.uid];
                return;   
            }
            // or Set
            state[action.payload.uid] = action.payload.response;
        }
    },
});

export const {
    SET_MOC_QUESTION,
} = rheactSlice.actions;

export const { reducer: mocQuestionaireReducer } = rheactSlice;
