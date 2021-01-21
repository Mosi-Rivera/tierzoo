import {createReducer,createAction} from '@reduxjs/toolkit';
export const set_hero = createAction('set_hero');
export const remove_hero = createAction('remove_hero');
const store = new Array(5);

export default createReducer(store,{
    [set_hero.type]: (state,data) => {
        const {index,hero} = data.payload;
        state[index] = hero;
        return state;
    },
    [remove_hero.type]: (state,data) => {
        state[data.payload] = null;
        return state;
    }
})