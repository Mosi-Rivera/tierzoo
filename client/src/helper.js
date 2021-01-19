import { is_logged_in } from "./api/routes/auth";

export function create_check_logged_in(history,set_inventory,set_user)
{
    console.log('creating this shiet',history);
    return function(cb = null,getTeam = false)
    {
        is_logged_in(getTeam)
        .then(res => {
            set_inventory(res.inventory);
            delete res.inventory;
            set_user(res);
            if (cb)
                cb(res);
        })
        .catch(() => history.push('/'))
    }
}