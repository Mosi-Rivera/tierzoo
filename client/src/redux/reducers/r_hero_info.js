import {createReducer,createAction} from '@reduxjs/toolkit';
export const set_info = createAction('set_info');
const state = null;
export default createReducer(state,{
    [set_info.type]: (state,data) => {
        state = data.payload;
        return state;
    }
})