import { is_logged_in } from "./api/routes/auth";

export function create_check_logged_in(history,set_inventory,set_user)
{
    console.log('creating this shiet');
    return function(cb = null)
    {
        is_logged_in()
        .then(res => {
            set_inventory(res.inventory);
            delete res.inventory;
            set_user(res);
            if (cb)
                cb();
        })
        .catch(() => history.push('/'))
    }
}