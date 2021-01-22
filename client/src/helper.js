import { is_logged_in } from "./api/routes/auth";
import store from './redux/store';
import {set_inventory} from './redux/reducers/r_inventory';
import {set_user} from './redux/reducers/r_user';

export function check_logged_in(history,cb,get_team = false)
{
    is_logged_in(get_team)
    .then(res => {
        let team = res.team;
        delete res.team;
        store.dispatch(set_inventory(res.inventory));
        delete res.inventory;
        store.dispatch(set_user(res));
        if (cb)
            cb(res,team);
    })
    .catch(() => history.push('/'))
}