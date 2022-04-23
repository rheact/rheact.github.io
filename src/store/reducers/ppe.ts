import { createSlice } from '@reduxjs/toolkit';
import { QuestionnaireResponse } from 'model';

const rheactSlice = createSlice({
    name: 'ppe',
    initialState: {} as QuestionnaireResponse,
    reducers: {
        SET_PPE_QUESTION(state, action) {
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
    SET_PPE_QUESTION,
} = rheactSlice.actions;

export const { reducer: ppeReducer } = rheactSlice;
