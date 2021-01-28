import React, {
    useEffect,
    useCallback,
    useState
} from 'react';
import { useHistory } from 'react-router-dom';
import { get_heroes } from '../api/routes/user';
import { ascend_hero, hero_info } from '../api/routes/hero';
import { check_logged_in,throttle } from '../helper';
import { remove, set_all, set_tier } from '../redux/reducers/r_heroes';
import { useSelector,useDispatch } from 'react-redux';
import { modal_enum,set } from '../redux/reducers/r_modals';
import { set_info } from '../redux/reducers/r_hero_info';
import config from '../sprites/config';
import image_configs from '../sprites/config';

function AscendCard(props)
{
    return ( 
        props.hero ?  
        <span onClick={props.handle_remove} className={'image-container tier-' + props.hero.tier}>
            <img src={image_configs[props.hero.name]?.src}/>
        </span> :
        <span className={'image-container tier-none'}></span>
    )
}

export default function(props)
{
    const history = useHistory();
    const dispatch = useDispatch();
    const heroes = useSelector(state => state.heroes);
    const [ascend_fodder,set_ascend_fodder] = useState([null,null,null]);
    const [ascend,set_ascend] = useState(false);
    const [filtered,set_filtered] = useState(heroes || []);
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
            reset_filter();
        }
        catch(err)
        {
            console.log(err);
            set_ascend_fodder([null,null,null]);
            reset_filter();
        }
    }
    const handle_remove_fodder = i => {
        if (i == 0)
        {
            reset_filter();
            set_ascend_fodder([null,null,null]);
            return;
        }
        let _tmp = ascend_fodder;
        _tmp[i] = null;
        set_ascend_fodder(_tmp);
        filter_ascend_list(_tmp);
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
        set_ascend_fodder(_tmp);
        filter_ascend_list(_tmp);
        if (
            ascend_fodder[0] &&
            ascend_fodder[1] &&
            ascend_fodder[2]
        )
            handle_ascend_hero();
    }
    const filter_ascend_list = (fodder) => set_filtered(
        heroes?.filter(
            elem => (
                (fodder[0] ? (
                    fodder[0].name === elem.name &&
                    fodder[0]._id !== elem._id &&
                    fodder[0].tier === elem.tier
                ) : true) &&
                (fodder[1] ? fodder[1]._id !== elem._id : true) &&
                (fodder[2] ? fodder[2]._id !== elem._id : true)
            )
        )
    );
    const reset_filter = () => set_filtered(heroes || []);
    useEffect(() => filter_ascend_list(ascend_fodder),[heroes]);
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
        <div className={'heroes-bar ' + (ascend ? 'ascend' : '')}>
            <div className={'c-ascend ' + (ascend ? 'pressed' : '')} onClick={() => set_ascend(!ascend)}>
                <span className='border-light-shadow shadow'>ASCEND</span>
            </div>
            { console.log(ascend_fodder) }
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
                heroes && (ascend ? filtered : heroes).map((hero,i) => {
                    let image_conf = image_configs[hero.name];
                    return <div key={i} onClick={ascend ? () => handle_set_fodder(hero) : () => handle_open_hero_info(hero._id)}>
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