import React, {useEffect,useState} from 'react';
import image_configs from '../sprites/config';
import {useSelector,useDispatch} from 'react-redux';
import {close,modal_enum} from '../redux/reducers/r_modals';
export default function (props)
{
    const dispatch = useDispatch();
    const team = useSelector(state => state.team);
    const heroes = useSelector(state => state.heroes);
    const active = useSelector(state => state.modals.active);
    const [filtered_heroes,set_filtered_heroes] = useState(heroes);
    useEffect(function(){
        heroes ? set_filtered_heroes(heroes.filter(hero => {
            let id = hero._id;
            if (
                id !== team[0]?._id &&
                id !== team[1]?._id &&
                id !== team[2]?._id &&
                id !== team[3]?._id &&
                id !== team[4]?._id
            ) return true;
            return false;
        })) : set_filtered_heroes(null);
    },[heroes,team]);
    return <div>
        <div 
        className={'backdrop ' + (active === modal_enum.heroes ? 'show' : '')} 
        onClick={() => dispatch(close())}
        ></div>
        <div 
        className={'slider-bottom slider-heroes ' + (active === modal_enum.heroes ? 'show' : '')}
        >
            <div>
                {
                    filtered_heroes?.map((hero,i) => <div key={i} onClick={() => props.on_select(hero)}>
                        <span className={'image-container tier-' + hero.tier}>
                            <img src={image_configs[hero.name]?.src}/>
                        </span>
                        <span>Lv. {hero.level}</span>
                    </div>)
                }
            </div>
    </div>
    </div> 
}