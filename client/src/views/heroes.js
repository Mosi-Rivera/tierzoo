import React, {useEffect,useCallback, useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import {get_heroes} from '../api/routes/user';
import image_configs from '../sprites/config';
import { hero_info } from '../api/routes/hero';
import {check_logged_in,throttle} from '../helper';
import { set_all } from '../redux/reducers/r_heroes';
import { useSelector,useDispatch } from 'react-redux';
import { modal_enum,set } from '../redux/reducers/r_modals';
import { set_info } from '../redux/reducers/r_hero_info';

export default function(props)
{
    const history = useHistory();
    const dispatch = useDispatch();
    const heroes = useSelector(state => state.heroes);
    const [ascend,set_ascend] = useState(false);
    const handle_open_hero_info = useCallback(throttle(async (id) => {
        try
        {
            dispatch(set_info(await hero_info(id)));
            dispatch(set(modal_enum.info));
        }
        catch(err)
        {
            console.log(err);
        }
    },1000),[]);
    useEffect(function()
    {
        check_logged_in(history, async () => {
            try
            {
                dispatch(set_all(await get_heroes()));
            }
            catch(err)
            {
                console.log(err);
            }
        });
    },[]);
    return <div id='heroes' className='pseudo-body'>
        <div>
            <div onClick={() => set_ascend(!ascend)}>
                <span>ASCEND</span>
            </div>
            {
                ascend && <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
        </div>
        <div className='c-heroes'>
            {
                heroes?.map((hero,i) => {
                    let image_conf = image_configs[hero.name];
                    return <div key={i} onClick={() => handle_open_hero_info(hero._id)}>
                        <span className={'image-container tier-' + hero.tier}>
                            <span className='level'>{hero.level}</span>
                            <img src={image_conf?.src}/>
                        </span>
                        <span className='name'>
                            <span>{hero.name}</span>
                        </span>
                    </div>
                })
            }
        </div>
    </div>
}