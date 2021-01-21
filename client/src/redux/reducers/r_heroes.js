import {createReducer,createAction} from '@reduxjs/toolkit';
export const set_all = createAction('set_all');
export const inc_level = createAction('inv_level');
export const remove = createAction('inv_level');
const state = null;

export default createReducer(state, {
    [set_all.type]: (state,data) => {
        state = data.payload;
        return state;
    },
    [inc_level.type]: (state,data) => {
        if (!state)
            return state;
        const {index,value} = data.payload;
        if (state[index])
            state[index] += value;
        return state;
    },
    [remove.type]: (state,data) => {
        if (!state)
            return state;
        const payload = data.payload;
        if (typeof payload === 'string')
        {
            for (let i = state.length; i--;)
            {
                if (state[i]._id == payload)
                {
                    state.splice(i,1);
                    break
                }
            }

        }
        else if (typeof payload === 'number')
            state.splice(payload,1);
        return state;
    }
});