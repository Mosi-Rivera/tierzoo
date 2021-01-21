import {createReducer,createAction} from '@reduxjs/toolkit';
export const set_user = createAction('set_user');
const state = null;

export default createReducer(state, {
    [set_user.type]: (state,data) =>
    {
        return data.payload;
    }
});