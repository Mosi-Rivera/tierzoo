import { is_logged_in } from "./api/routes/auth";
import store from './redux/store';
import {set_inventory} from './redux/reducers/r_inventory';
import {set_user} from './redux/reducers/r_user';
import { set_collect_timer } from "./redux/reducers/r_idle";

export function save_user(user,cb)
{
    let team = user.team;
    delete user.team;
    store.dispatch(set_inventory(user.inventory));
    delete user.inventory;
    store.dispatch(set_collect_timer(user.idle?.last_collect));
    delete user.idle;
    store.dispatch(set_user(user));
    if (cb)
        cb(user,team);   
}

export function check_logged_in(history,cb,get_team = false)
{
    is_logged_in(get_team)
    .then(res => save_user(res,cb))
    .catch((err) => history.push('/'))
}

export function string_to_number_formatter(num)
{
    if (!num)
        return 0;
    if (Math.abs(num) > 999999999)
        return (num/1000000000).toFixed(1) + 'b';
    else if (Math.abs(num) > 999999)
        return (num/1000000).toFixed(1) + 'm';
    else if (Math.abs(num) > 999)
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

export const throttle = (func, limit) => {
    let lastFunc
    let lastRan
    return function() {
        const context = this
        const args = arguments
        if (!lastRan) {
        func.apply(context, args)
        lastRan = Date.now()
        } else {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(function() {
            if (Date.now() - lastRan >= limit) {
            func.apply(context, args)
            lastRan = Date.now()
            }
        }, limit - (Date.now() - lastRan))
        }
    }
}

export function debounce(func, wait, pre_func,immediate) {
    var timeout;
	return function() {
        if (pre_func && !pre_func()) return;
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const exponential_growth = (base,growth,power) => base * Math.pow(( 1 + growth),power);

export const gold_cost = level => Math.floor(exponential_growth(23,.15,level));

export const exp_cost = level => Math.floor(exponential_growth(89,.1,level));

export const essence_cost = level => level%20 === 0 ? ((level/20) * 40) * 2.5 : 0; 