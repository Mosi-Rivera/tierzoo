export const BASE_URL = 'http://localhost:4200';
export function error_handler(res)
{
    if (!res.ok)
        throw new Error(res.statusText);
    else
        return res;
}