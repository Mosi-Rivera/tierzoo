import {
    configureStore,
    combineReducers,
    createAction
} from '@reduxjs/toolkit';
import user         from './reducers/r_user';
import inventory    from './reducers/r_inventory';
import team         from './reducers/r_team';
import heroes       from './reducers/r_heroes';
import hero_info    from './reducers/r_hero_info';
import modals       from './reducers/r_modals';
import arena        from './reducers/r_arena';
import idle         from './reducers/r_idle';

export const USER_LOGOUT = createAction('USER_LOGOUT');

const app_reducers = combineReducers({
    user,
    inventory,
    team,
    heroes,
    arena,
    hero_info,
    modals,
    idle
})

const root_reducer = (state,action) => {
    if (action.type === USER_LOGOUT.type) {
        state = undefined;
    }

    return app_reducers(state,action);
}

export default configureStore({
    reducer: root_reducer
});