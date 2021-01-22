import React, { useState } from 'react';
import { set_team_position,remove_team_position } from '../api/routes/arena';
import SliderHeroes from '../components/slider_heroes';
import image_configs from '../sprites/config';
import {useSelector,useDispatch} from 'react-redux';
import {set,modal_enum, close} from '../redux/reducers/r_modals';
import {set_hero,remove_hero} from '../redux/reducers/r_team';

export default function(props)
{
    const dispatch = useDispatch();
    const [selected_index,set_selected_index] = useState(0);
    const team = useSelector(state => state.team);
    const on_select = async data => {
        let index = selected_index;
        try
        {
            dispatch(set_hero({index, hero: data}));
            await set_team_position(selected_index,data._id);
            dispatch(close());
        }
        catch(err)
        {
            dispatch(remove_hero(index));
            console.log(err);
        }
    }
    const handle_remove = async (i,data) => {
        try
        {
            dispatch(remove_hero(i));
            dispatch(await remove_team_position(i));
        }
        catch(err)
        {
            console.log(err);
            dispatch(set_hero({index: i, data}));
        }
    }
    return <div>
        <SliderHeroes on_select={on_select}/>
        <ul className='c-team'>
            {
                team.map((hero,i) => {
                    if (!hero)
                        return <li onClick={() => {
                            set_selected_index(i);
                            dispatch(set(modal_enum.heroes));
                        }} key={i} className='empty'>
                            <div>{i + 1}</div>
                        </li>
                    return <li 
                            onClick={() => handle_remove(i,hero)}
                            key={i}
                            className={'tier-' + hero.tier}
                            >
                        <div>
                            <span className='level'>Lvl {hero.level}</span>
                            <img src={image_configs[hero.name]?.src}/>
                            <span className='power'>{hero.power}</span>
                        </div>
                    </li>
                })
            }
        </ul>
    </div> 
}