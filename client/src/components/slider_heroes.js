import {useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import modal_enum from '../redux/other/modal_enum';

export default function SliderHeroes(props)
{
    const dispatch = useDispatch();
    const team = useSelector(state => state.team);
    const heroes = useSelector(state => state.heroes);
    const active = useSelector(state => state.modals.active);
    const [filtered_heroes,set_filtered_heroes] = useState(heroes);
    const handle_close = () => import('../redux/reducers/r_modals').then(res => dispatch(res.close()));
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
        onClick={handle_close}
        ></div>
        <div 
        className={'slider-bottom slider-heroes ' + (active === modal_enum.heroes ? 'show' : '')}
        >
            <div>
                {
                    filtered_heroes?.map(hero => <div key={hero._id} onClick={() => props.on_select(hero)}>
                        <span className={'image-container tier-' + hero.tier}>
                            <img src={`assets/${hero.name}/icon.png`} alt={hero.name + " hero icon."}/>
                        </span>
                        <span>Lv. {hero.level}</span>
                    </div>)
                }
            </div>
    </div>
    </div> 
}