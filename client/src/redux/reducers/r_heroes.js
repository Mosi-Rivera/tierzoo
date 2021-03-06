import {createReducer,createAction} from '@reduxjs/toolkit';
export const set_all    = createAction('set_all');
export const set_level  = createAction('set_level');
export const inc_level  = createAction('inv_level');
export const remove     = createAction('inv_level');
export const set_tier   = createAction('set_tier');
const state = null;

const sort = (a,b) => a.level < b.level ? 1 : -1;

export default createReducer(state, {
    [set_all.type]: (state,data) => {
        state = data.payload.sort(sort);
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
    [set_tier.type]: (state,data) => {
        let {index,value} = data.payload;
        if (typeof index === 'number')
            state[index].tier = value;
        else if (typeof index === 'string')
        {
            for (let i = state.length; i--;)
            {
                if (state[i]._id === index)
                {
                    state[i].tier = value;
                    break;
                }
            }
        }
        return state;
    },
    [set_level.type]: (state,data) => {
        if (!state)
            return state;
        let {index,value} = data.payload;
        if (typeof index === 'number')
        {
            let hero = state[index];
            if (hero)
                hero.level = value;
        }
        else if (typeof index === 'string')
            for (let i = state.length; i--;)
                if (state[i]._id === index)
                    state[i].level = value;
        state = state.sort(sort);
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
                if (state[i]._id === payload)
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