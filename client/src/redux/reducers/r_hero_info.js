import {createReducer,createAction} from '@reduxjs/toolkit';
import { gold_cost, exp_cost, essence_cost } from '../../helper';
export const set_info = createAction('set_info');
export const inc_level = createAction('inc_level');
const state = null;
export default createReducer(state,{
    [set_info.type]: (state,data) => {
        if (state && state._id === data.payload._id)
        {
            let level = state.level;
            state = data.payload;
            state.level = level;
        }
        else
            state = data.payload;
        state.level_gold    = gold_cost(state.level);
        state.level_exp     = exp_cost(state.level);
        state.level_essence = essence_cost(state.level);
        return state;
    },
    [inc_level.type]: (state,data) => {
        if (!state)
            return state;
        state.level += data.payload;
        state.level_gold    = gold_cost(state.level);
        state.level_exp     = exp_cost(state.level);
        state.level_essence = essence_cost(state.level);
        return state;
    }
})