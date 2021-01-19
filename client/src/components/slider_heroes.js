import React from 'react';
import image_configs from '../sprites/config'; 
export default function (props)
{
    console.log(props);
    return <div>
        <div className={'backdrop ' + (props.show ? 'show' : '')} onClick={props.handle_close}></div>
        <div className={'slider-bottom slider-heroes ' + (props.show ? 'show' : '')}>
        {
            props.heroes?.map((hero,i) => <div key={i} onClick={() =>  props.on_select(hero)}>
                <span className='image-container'>
                    <img src={image_configs[hero.name]?.src}/>
                </span>
            </div>)
        }
    </div>
    </div> 
}