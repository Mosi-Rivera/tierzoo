import {createReducer,createAction} from '@reduxjs/toolkit';
export const set_opponents = createAction('set_opponents');
export const set_elo = createAction('set_elo');
export const set_enemy = createAction('set_enemy_team');
const state = {
    opponents: [],
    elo: [],
    enemy_view: [null,null,null,null,null],
}
export default createReducer(state,{
    [set_opponents.type]: (state,data) => {
        state.opponents = data.payload;
        return state;
    },
    [set_elo]: (state,data) => {
        state.elo = data.payload;
        return state;
    },
    [set_enemy]: (state,data) => {
        state.enemy_view = data.payload;
        return state;
    }
}) 