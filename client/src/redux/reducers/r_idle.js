import {createAction,createReducer} from '@reduxjs/toolkit';
export const tick = createAction('tick');
export const set_collect_timer = createAction('set_collect_timer');
const state = { timer: 0 };

export default createReducer(state,{
    [set_collect_timer]: (state,data) => {
        state.timer = data.payload / 60000;
        return state;
    },
    [tick.type]: (state) => {
        state.timer += 1;
        return state;
    }
});