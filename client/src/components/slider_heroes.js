import React from 'react';
import image_configs from '../sprites/config';
import {useSelector,useDispatch} from 'react-redux';
import {close,modal_enum} from '../redux/reducers/r_modals';
export default function (props)
{
    const dispatch = useDispatch();
    const heroes = useSelector(state => state.heroes);
    const active = useSelector(state => state.modals.active);
    return <div>
        <div 
        className={'backdrop ' + (active === modal_enum.heroes ? 'show' : '')} 
        onClick={() => dispatch(close())}
        ></div>
        <div 
        className={'slider-bottom slider-heroes ' + (active === modal_enum.heroes ? 'show' : '')}
        >
        {
            heroes?.map((hero,i) => <div key={i} onClick={() => props.on_select(hero)}>
                <span className='image-container'>
                    <img src={image_configs[hero.name]?.src}/>
                </span>
            </div>)
        }
    </div>
    </div> 
}