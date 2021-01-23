import { is_logged_in } from "./api/routes/auth";
import store from './redux/store';
import {set_inventory} from './redux/reducers/r_inventory';
import {set_user} from './redux/reducers/r_user';
import { set_collect_timer } from "./redux/reducers/r_idle";

export function check_logged_in(history,cb,get_team = false)
{
    is_logged_in(get_team)
    .then(res => {
        let team = res.team;
        delete res.team;
        store.dispatch(set_inventory(res.inventory));
        delete res.inventory;
        store.dispatch(set_collect_timer(res.idle?.last_collect));
        delete res.idle;
        store.dispatch(set_user(res));
        if (cb)
            cb(res,team);
    })
    .catch((err) => {console.log(err);  history.push('/')})
}

export function string_to_number_formatter(num)
{
    if (!num)
        return 0;
    if (num > 999999999)
        return (num/1000000000).toFixed(1) + 'b';
    else if (num > 999999)
        return (num/1000000).toFixed(1) + 'm';
    else if (num > 999)
        return (num/1000).toFixed(1) + 'k';
    return num;
}

export function collect_secs_to_str(mins)
{
    let hours = Math.floor(mins / 60);
    if (hours > 12)
        return 'max';
    let minutes = Math.floor(mins - (hours * 60));
    return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes); 
}