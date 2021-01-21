import {createReducer,createAction} from '@reduxjs/toolkit';
const set_opponents = createAction('set_opponents');
const ste_elo = createAction('set_elo');
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