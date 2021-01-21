import {configureStore,combineReducers} from '@reduxjs/toolkit';
import user         from './reducers/r_user';
import inventory    from './reducers/r_inventory';
import team         from './reducers/r_team';
import heroes       from './reducers/r_heroes';

export default configureStore({
    reducer: combineReducers({
        user,
        inventory,
        team,
        heroes,
    })
})