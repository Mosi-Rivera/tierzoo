import React, {
    useEffect,
    useCallback,
    useState,
    useMemo
} from 'react';
import { useHistory } from 'react-router-dom';
import { get_heroes } from '../api/routes/user';
import { ascend_hero, hero_info } from '../api/routes/hero';
import { check_logged_in,throttle } from '../helper';
import { remove, set_all, set_tier } from '../redux/reducers/r_heroes';
import { useSelector,useDispatch } from 'react-redux';
import { modal_enum,set } from '../redux/reducers/r_modals';
import { set_info } from '../redux/reducers/r_hero_info';
import image_configs from '../sprites/config';
import HeroInfo from '../components/hero_info';

function AscendCard(props)
{
    return ( 
        props.hero ?  
        <span onClick={props.handle_remove} className={'image-container tier-' + props.hero.tier}>
            <img src={image_configs[props.hero.name]?.src} alt={props.hero.name + "hero icon."}/>
        </span> :
        <span className={'image-container tier-none'}></span>
    )
}

function ViewHeroes()
{
    const history = useHistory();
    const dispatch = useDispatch();
    const heroes = useSelector(state => state.heroes);
    const [ascend_fodder,set_ascend_fodder] = useState([null,null,null]);
    const [ascend,set_ascend] = useState(false);
    const filtered = useMemo(() => heroes?.filter(
            elem => (
                elem.tier !== 3 &&
                (ascend_fodder[0] ? (
                    ascend_fodder[0].name === elem.name &&
                    ascend_fodder[0]._id !== elem._id &&
                    ascend_fodder[0].tier === elem.tier
                ) : true) &&
                (ascend_fodder[1] ? ascend_fodder[1]._id !== elem._id : true) &&
                (ascend_fodder[2] ? ascend_fodder[2]._id !== elem._id : true)
            )
        ) || [],
        [heroes,ascend_fodder]
    );
    const handle_open_hero_info = useCallback(throttle(async (id) => {
        try
        {
            dispatch(set_info(await hero_info(id)));
            dispatch(set(modal_enum.info));
        }
        catch(err){}
    },1000),[]);
    const handle_ascend_hero = async () => {
        try
        {
            let id = ascend_fodder[0]._id;
            let fodder = [ascend_fodder[1]._id,ascend_fodder[2]._id];
            set_ascend_fodder([null,null,null]);
            let tier = (await ascend_hero({id,fodder})).tier;
            dispatch(set_tier({index: id, value: tier}));
            dispatch(remove(fodder[0]));
            dispatch(remove(fodder[1]));
        }
        catch(err)
        {
            set_ascend_fodder([null,null,null]);
        }
    }
    const handle_remove_fodder = i => {
        if (i === 0)
        {
            set_ascend_fodder([null,null,null]);
            return;
        }
        let _tmp = ascend_fodder;
        _tmp[i] = null;
        set_ascend_fodder([..._tmp]);
    }
    const handle_set_fodder = hero => {
        if (hero.tier > 2 || (
                ascend_fodder[0] &&
                ascend_fodder[1] &&
                ascend_fodder[2]
            )
        ) return;
        let index;
        if (!ascend_fodder[0])
            index = 0;
        else if (!ascend_fodder[1])
            index = 1;
        else if (!ascend_fodder[2])
            index = 2;
        let _tmp = ascend_fodder;
        _tmp[index] = hero;
        set_ascend_fodder([..._tmp]);
        if (
            ascend_fodder[0] &&
            ascend_fodder[1] &&
            ascend_fodder[2]
        )
            handle_ascend_hero();
    }
    useEffect(function()
    {
        check_logged_in(history, async () => {
            try
            {
                dispatch(set_all(await get_heroes()));
            }
            catch(err){}
        });
    },[]);
    return <div id='heroes' className='pseudo-body'>
        <HeroInfo/>
        <div className={'heroes-bar ' + (ascend ? 'ascend' : '')}>
            <div className={'c-ascend ' + (ascend ? 'pressed' : '')} onClick={() => set_ascend(!ascend)}>
                <span className='border-light-shadow shadow'>ASCEND</span>
            </div>
            {
                ascend && <div className='c-ascend-hero'>
                    <div className='ascend-hero'>
                        <AscendCard handle_remove={() => handle_remove_fodder(0)} hero={ascend_fodder[0]}/>
                    </div>
                    <div className='c-ascend-fodder'>
                        <div>
                            <AscendCard handle_remove={() => handle_remove_fodder(1)} hero={ascend_fodder[1]}/>
                        </div>
                        <div>
                            <AscendCard handle_remove={() => handle_remove_fodder(2)} hero={ascend_fodder[2]}/>
                        </div>
                    </div>
                </div>
            }
        </div>
        <div className={'c-heroes ' + (ascend ? 'ascend' : '')}>
            {
                heroes && (ascend ? filtered : heroes).map(hero => {
                    let image_conf = image_configs[hero.name];
                    return <div key={hero._id} onClick={ascend ? () => handle_set_fodder(hero) : () => handle_open_hero_info(hero._id)}>
                        <span className={'image-container tier-' + hero.tier}>
                            <span className='level'>{hero.level}</span>
                            <img src={image_conf?.src} alt={image_conf.src + "hero icon."}/>
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


export default ViewHeroes;