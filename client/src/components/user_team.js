import { lazy, Suspense, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import modal_enum from '../redux/other/modal_enum';

const SliderHeroes = lazy(() => import("../components/slider_heroes"));

export default function UserTeam(props)
{
    const dispatch = useDispatch();
    const [selected_index,set_selected_index] = useState(0);
    const team = useSelector(state => state.team);
    const on_select = async data => {
        let index = selected_index;
        try
        {
            const {close} = await import('../redux/reducers/r_modals');
            const {set_team_position} = await import('../api/routes/arena');
            const {set_hero} = await import('../redux/reducers/r_team');
            dispatch(set_hero({
                index,
                hero: data
            }));
            dispatch(close());
            await set_team_position(selected_index,data._id);
        }
        catch(err)
        {
            import('../redux/reducers/r_team')
            .then(res => dispatch(res.remove_hero(index)));
        }
    }
    const handle_remove = async (i,data) => {
        try
        {
            const {remove_hero} = await import('../redux/reducers/r_team');
            const {remove_team_position} = await import('../api/routes/arena');
            dispatch(remove_hero(i));
            await remove_team_position(i);
        }
        catch(err)
        {
            import('../redux/reducers/r_team')
            .then(res => dispatch(res.set_hero({index: i, data})));
        }
    }
    return <div>
        <Suspense fallback={<div>loading</div>}>
            <SliderHeroes on_select={on_select}/>
        </Suspense>
        <div className='c-c-team'>
            <ul className='c-team'>
                {
                    team.map((hero,i) => {
                        if (!hero)
                            return <li onClick={() => {
                                set_selected_index(i);
                                import('../redux/reducers/r_modals')
                                .then(res => dispatch(res.set(modal_enum.heroes)));
                            }} key={i} className='empty'>
                                <span className='image-container empty tier-none'>
                                    <span className='question-none'>?</span>
                                </span>
                                <span className='level border-light-shadow'>none</span>
                            </li>
                        return <li 
                                onClick={() => handle_remove(i,hero)}
                                key={hero._id}
                                >
                            <div>
                                <span className={'image-container tier-' + hero.tier}>
                                    <img src={`assets/${hero.name}/icon.png`} alt={hero.name + " hero icon."}/>
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