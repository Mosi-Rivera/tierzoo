import {createReducer,createAction} from '@reduxjs/toolkit';
export const set_opponents = createAction('set_opponents');
export const set_elo = createAction('set_elo');
const state = {
    opponents: [],
    elo: [],
}
export default createReducer(state,{
    [set_opponents.type]: (state,data) => {
        state.opponents = data.payload;
        return state;
    },
    [set_elo]: (state,data) => {
        state.elo = data.payload;
        return state;
    }
}) 