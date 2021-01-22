import React, {useEffect} from 'react';
import {is_logged_in} from '../api/routes/auth';
import {Carousel, Col,Row} from 'react-bootstrap';
import {
    summon_multiple_gems,
    summon_multiple_scrolls,
    summon_single_gems,
    summon_single_scrolls
} from '../api/routes/hero';
import {useHistory} from 'react-router-dom';
import { check_logged_in } from '../helper';
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
    useEffect(() => {
        check_logged_in(history);
    },[]);
    return <div id='summons' className='pseudo-body'>
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="assets/shield_droid/Police Shielder.gif"
                alt="First slide"
                />
                <Carousel.Caption className='header'>
                    <h3 className='message'>
                        NEW epic hero <span className='epic'>Shield Droid</span>
                    </h3>
                </Carousel.Caption>
                <Carousel.Caption>
                    <div className='c-summon-button'>
                        <div>
                            <div onClick={handle_single_summon}>
                                <span>single-summon</span>
                            </div>
                            <span>{props.inventory?.scrolls > 1 ? '1' : '300'}</span>
                        </div>
                        <div className='summon-button'>
                            <div onClick={handle_multiple_sumon}>
                                <span>multi-summon</span>
                            </div>
                            <span>{props.inventory?.scrolls > 1 ? '10' : '2700'}</span>
                        </div>
                    </div>
                    <h5>
                        Produces <span className='common'>Common</span> and <span className='epic'>Epic</span> heroes
                    </h5>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
}