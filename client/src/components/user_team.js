import React, { useState } from 'react';
import { set_team_position,remove_team_position } from '../api/routes/arena';
import SliderHeroes from '../components/slider_heroes';
import image_configs from '../sprites/config';
import {useSelector,useDispatch} from 'react-redux';
import {set,modal_enum, close} from '../redux/reducers/r_modals';
import {set_hero,remove_hero} from '../redux/reducers/r_team';

export default function UserTeam(props)
{
    const dispatch = useDispatch();
    const [selected_index,set_selected_index] = useState(0);
    const team = useSelector(state => state.team);
    const on_select = async data => {
        let index = selected_index;
        try
        {
            dispatch(set_hero({
                index,
                hero: data
            }));
            dispatch(close());
            await set_team_position(selected_index,data._id);
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
            await remove_team_position(i);
        }
        catch(err)
        {
            console.log(err);
            dispatch(set_hero({index: i, data}));
        }
    }
    return <div>
        <SliderHeroes on_select={on_select}/>
        <div className='c-c-team'>
            <ul className='c-team'>
                {
                    team.map((hero,i) => {
                        if (!hero)
                            return <li onClick={() => {
                                set_selected_index(i);
                                dispatch(set(modal_enum.heroes));
                            }} key={i} className='empty'>
                                <span className='image-container empty tier-none'>
                                    <span className='question-none'>?</span>
                                </span>
                                <span className='level border-light-shadow'>none</span>
                            </li>
                        return <li 
                                onClick={() => handle_remove(i,hero)}
                                key={i}
                                >
                            <div>
                                <span className={'image-container tier-' + hero.tier}>
                                    <img src={image_configs[hero.name]?.src} alt={hero.name + " hero icon."}/>
                                </span>
                                <span className='level border-light-shadow'>Lv. {hero.level}</span>
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    </div> 
}