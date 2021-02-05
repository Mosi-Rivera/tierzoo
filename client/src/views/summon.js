import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Carousel} from 'react-bootstrap';
import {
    summon_multiple_gems,
    summon_multiple_scrolls,
    summon_single_gems,
    summon_single_scrolls
} from '../api/routes/hero';
import {useHistory} from 'react-router-dom';
import { check_logged_in } from '../helper';
import { modal_enum, set, set_summons } from '../redux/reducers/r_modals';
import { inc_item } from '../redux/reducers/r_inventory';
export default function(props)
{
    const history = useHistory();
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory);
    const handle_single_summon = async () => {
        try
        {
            let result;
            if (inventory?.scrolls >= 1)
            {
                result = await summon_single_scrolls();
                dispatch(inc_item({key: 'scrolls', value: -1}));
            }
            else if (inventory?.gems >= 300)
            {
                result = await summon_single_gems();
                dispatch(inc_item({key: 'gems', value: -300}));
            }
            else
                return;
            dispatch(set_summons(result));
            dispatch(set(modal_enum.summons));
        }
        catch(err){}
    }
    const handle_multiple_sumon = async () => {
        try
        {
            let result;
            if (inventory?.scrolls >= 10)
            {
                result = await summon_multiple_scrolls();
                dispatch(inc_item({key: 'scrolls', value: -10}));
            }
            else if (inventory?.gems >= 2700)
            {
                result = await summon_multiple_gems();
                dispatch(inc_item({key: 'gems', value: -2700}));
            }
            else
                return;
            dispatch(set_summons(result));
            dispatch(set(modal_enum.summons));
        }
        catch(err){}
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
                alt="First Summon Banner"
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
                            <span>
                                {
                                    inventory?.scrolls >= 1 ? 
                                    [<span className='icon scroll-icon' key={0}></span>,'1'] : 
                                    [<span className='icon gems-icon' key={0}></span>,'300']
                                }
                            </span>
                        </div>
                        <div className='summon-button'>
                            <div onClick={handle_multiple_sumon}>
                                <span>multi-summon</span>
                            </div>
                            <span>
                                {
                                    inventory?.scrolls >= 10 ? 
                                    [<span className='icon scroll-icon' key={0}></span>, '10'] : 
                                    [<span className='icon gems-icon' key={0}></span>,'2700']
                                }
                            </span>
                        </div>
                    </div>
                    <div className='summon-info'>
                        Produces <span className='common'>Common</span> and <span className='epic'>Epic</span> heroes
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
}