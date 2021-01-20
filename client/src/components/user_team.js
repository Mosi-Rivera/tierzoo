import React, { useState } from 'react';
import { set_team_position } from '../api/routes/arena';
import SliderHeroes from '../components/slider_heroes';
import image_configs from '../sprites/config';
export default function(props)
{
    const [selected_index,set_selected_index] = useState(0);
    const [show,set_show] = useState(false);
    const handle_close = () => set_show(false);
    const on_select = async data => {
        let index = selected_index;
        set_show(false);
        try
        {
            let _team = props.team;
            if (_team)
            {
                _team[selected_index] = data;
                props.set_team(_team);
            }
            await set_team_position(selected_index,data._id);
        }
        catch(err)
        {
            let _team = props.team;
            if (_team)
            {
                _team[index] = null;
                console.log(_team,index);
                props.set_team(_team);
                set_show(show);
            }
            console.log(err);
        }
    }
    const slider_props = {
        show,
        handle_close,
        heroes: props.heroes,
        on_select
    };
    return <div>
        <SliderHeroes {...slider_props}/>
        <ul className='c-team'>
            {
                props.team.map((hero,i) => {
                    if (!hero)
                        return <li onClick={() => {
                            set_selected_index(i);
                            set_show(true);
                        }} key={i} className='empty'>
                            <div>{i + 1}</div>
                        </li>
                    return <li key={i} className={'tier-' + hero.tier}>
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