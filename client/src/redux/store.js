import {configureStore,combineReducers} from '@reduxjs/toolkit';
import user         from './reducers/r_user';
import inventory    from './reducers/r_inventory';
import team         from './reducers/r_team';
import heroes       from './reducers/r_heroes';
import hero_info    from './reducers/r_hero_info';
import modals       from './reducers/r_modals';
import arena        from './reducers/r_arena';

export default configureStore({
    reducer: combineReducers({
        user,
        inventory,
        team,
        heroes,
        arena,
        hero_info,
        modals
    })
});