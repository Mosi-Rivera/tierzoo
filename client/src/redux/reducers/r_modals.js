import {createReducer,createAction} from '@reduxjs/toolkit';
export const set = createAction('set');
export const close = createAction('close');
export const set_rewards = createAction('set_rewards');
export const set_summons = createAction('set_summons');
export const modal_enum = {
    info: 1,
    inventory: 2,
    reward: 3,
    summons: 4,
    profile: 5,
    heroes: 6
}
const state = {
    active: 0,
    rewards: null,
    summons: null,
};

export default createReducer(state,
    {
        [set.type]: (state,data) => {
            state.active = data.payload;
            return state;
        },
        [close.type]: state => {
            state.active = 0;
            return state;
        },
        [set_rewards.type]: (state,data) => {
            state.rewards = data.payload;
            return state;
        },
        [set_summons.type]: (state,data) =>{
            state.summons = data.payload;
            return state;
        }
    }
);