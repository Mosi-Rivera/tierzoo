import {createReducer,createAction} from '@reduxjs/toolkit';
export const set            = createAction('set');
export const close          = createAction('close');
export const set_rewards    = createAction('set_rewards');
export const set_summons    = createAction('set_summons');
export const set_recap      = createAction('set_recap');
export const set_arena_loot = createAction('set_arena_loot');
const state = {
    active: 0,
    rewards: null,
    summons: null,
    battle_recap: null,
    arena_loot: null,
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
        },
        [set_recap.type]: (state,data) => {
            state.battle_recap = data.payload;
            return state;
        },
        [set_arena_loot.type]: (state,data) => {
            state.arena_loot = data.payload;
            return state;
        }
    }
);