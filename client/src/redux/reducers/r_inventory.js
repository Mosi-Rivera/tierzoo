import {createReducer,createAction} from '@reduxjs/toolkit';
export const set_inventory = createAction('set_inventory');
export const inc_item = createAction('inc_item');
const state = null;

export default createReducer(state,{
    [set_inventory.type]: (state,data) => {
        return data.payload;
    },
    [inc_item.type]: (state,data) => {
        let {key,value} = data.payload;
        if (state[key])
        {
            state[key] += value;
        if (state[key] <= 0)
            delete state[key];
        }
        else
            state[key] = value;
        return state;
    }
});