import {createReducer,createAction} from '@reduxjs/toolkit';
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
        return state;
    },
    [inc_level.type]: (state,data) => {
        if (!state)
            return state;
        state.level += data.payload;
        return state;
    }
})