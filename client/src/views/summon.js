import React, {useEffect} from 'react';
import {is_logged_in} from '../api/routes/auth';
import {Col,Row} from 'react-bootstrap';
import {
    summon_multiple_gems,
    summon_multiple_scrolls,
    summon_single_gems,
    summon_single_scrolls
} from '../api/routes/hero';
import { get_inventory } from '../api/routes/user';
import {useHistory} from 'react-router-dom';
export default function(props)
{
    const history = useHistory();
    const handle_single_summon = async () => {
        try
        {
            let result;
            if (props.inventory?.scrolls >= 1)
            {
                result = await summon_single_scrolls();
                let inv = {...props.inventory};
                inv.scrolls -= 1;
                props.set_inventory(inv);
            }
            else
            {
                result = await summon_single_gems();
                let inv = {...props.inventory};
                inv.gems -= 300;
                props.set_inventory(inv);
            }
            props.set_summons(result);
            props.show_summons();
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const handle_multiple_sumon = async () => {
        try
        {
            let result;
            if (props.inventory?.scrolls >= 10)
            {
                result = await summon_multiple_scrolls();
                let inv = {...props.inventory};
                inv.scrolls -= 10;
                props.set_inventory(inv);
            }
            else
            {
                result = await summon_multiple_gems();
                let inv = {...props.inventory};
                inv.gems -= 2700;
                props.set_inventory(inv);
            }
            props.set_summons(result);
            props.show_summons();
        }
        catch(err)
        {
            console.log(err);
        }
    }
    useEffect(props.check_logged_in,[]);
    return <div id='summons' className='pseudo-body'>
        <div style={{
            backgroundImage: 'url("assets/shield_droid/Police Shielder.gif")'
        }} className='summon-banner'>
            <div className='c-message'>
                <h3 className='message'>
                    NEW Epic Hero <span>Shield Droid</span>
                </h3>
            </div>
            <div className='c-summon'>
                <h3>
                    Produces <span>Common</span> and <span>Epic</span> heroes
                </h3>
                <div>
                    <div onClick={handle_single_summon}>
                        <span>summon x1</span>
                        <span>{props.inventory?.scrolls > 1 ? '1 scroll' : '300 gems'}</span>
                    </div>
                    <div onClick={handle_multiple_sumon}>
                        <span>summon x10</span>
                        <span>{props.inventory?.scrolls > 1 ? '10 scroll' : '2700 gems'}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}