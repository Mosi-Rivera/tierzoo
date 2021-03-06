import { memo,useEffect } from 'react';
import modal_enum from '../redux/other/modal_enum';
import { useSelector,useDispatch } from 'react-redux';
import string_to_number_formatter  from '../string_number_formatter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import store from '../redux/store';
import {debounce} from '../debounce_throttle';

const stat_keys = [
    'hp',
    'atk',
    'def',
    'crit',
    'dodge',
    'acc',
    'haste',
    'hp_recovery',
    'pr',
    'll',
];
let level_sum = 0;
const handle_level_up = debounce(async () => {
    let {hero_info} = store.getState();
    if (!hero_info)
        return;
    if (!level_sum)
        return;
    let levels = level_sum;
    try
    {
        const store = (await import('../redux/store')).default;
        let _info = await (await import('../api/routes/hero')).level_up(hero_info?._id,levels);
        import('../redux/reducers/r_hero_info').then(res => store.dispatch(res.set_info(_info)));
        import('../redux/reducers/r_heroes').then(res => store.dispatch(res.set_level({index: _info._id, value: _info.level})));
        level_sum = 0;
    }
    catch(err)
    {
        import('../redux/reducers/r_hero_info').then(res => store.dispatch(res.inc_level(-levels)));
        level_sum = 0;
    }
},
400,
() => {
    import('../redux/store').then(res => {
        const store = res.default;
        let {inventory,hero_info} = store.getState();
        if (!inventory || !hero_info) return false;
        if (
            inventory.gold >= hero_info.level_gold &&
            inventory.exp >= hero_info.level_exp &&
            inventory.essence >= hero_info.level_essence
            )
        {
            import('../redux/reducers/r_inventory').then(res => {
                const inc_item = res.inc_item;
                store.dispatch(inc_item({ key: 'gold',     value: -hero_info.level_gold      }));
                store.dispatch(inc_item({ key: 'exp',      value: -hero_info.level_exp       }));
                store.dispatch(inc_item({ key: 'essence',  value: -hero_info.level_essence   }));
            })
            import('../redux/reducers/r_hero_info').then(res => store.dispatch(res.inc_level(1)));
            level_sum++;
            return true;
        }
        return false;
    })
});

function HeroInfo()
{
    const dispatch = useDispatch();
    const info = useSelector(state => state.hero_info);
    const active = useSelector(state => state.modals.active);
    const handle_close = () => import('../redux/reducers/r_modals').then(res => dispatch(res.close()));
    const inventory = useSelector(state => state.inventory);
    useEffect(() => level_sum = 0,[]);
    return <div id='c-hero-info'>
        <div className={'backdrop ' + (active === modal_enum.info ? 'show' : '')} onClick={handle_close}></div>
        <div  id='hero-info' className={'slider-right ' + (active === modal_enum.info ? 'show' : '')}>
                <Tabs defaultActiveKey="info">
                    <Tab eventKey="info" title="info">
                        <div onClick={handle_close} className="close-button"></div>
                        <Row>
                            <Col sm={12}>
                                <div className='hero-left'>
                                    <h3>{info?.name} Lv. {info?.level}</h3>
                                    <h4 className='power secondary-color'><span>power:</span> <span>{info?.power.toLocaleString()}</span></h4>
                                    <span className='image-container info-image'>
                                        {info && <img src={`assets/${info?.name}/icon.png`} alt={info?.name + ' hero icon.'}/>}
                                    </span>
                                </div>
                            </Col>
                            <Col>
                                <Row>
                                    {
                                        stat_keys.map(key => <div className='c-stat' key={key}>
                                            <div className='stat'>
                                                <span>{key}</span> <span>{info?.[key].toLocaleString()}</span>
                                            </div>
                                        </div>
                                        )
                                    }
                                </Row>
                            </Col>
                            <Col sm={12}>
                                <div className='level-costs'>
                                    <span><span className='icon gold-icon'></span>{string_to_number_formatter(inventory?.gold)}/{string_to_number_formatter(info?.level_gold)}</span>
                                    <span><span className='icon exp-icon'></span>{string_to_number_formatter(inventory?.exp)}/{string_to_number_formatter(info?.level_exp)}</span>
                                    { info?.level_essence !== 0 && <span><span className='icon essence-icon'></span>{string_to_number_formatter(inventory?.essence)}/{info?.level_essence}</span> }
                                </div>
                                <div className='level-up-button' onClick={handle_level_up}><span>Level Up!</span></div>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="abilities" title="abilities">
                        <div>
                            <p>
                                {info?.ability}
                            </p>
                        </div>
                    </Tab>
                </Tabs>
        </div>
    </div>
}

export default memo(HeroInfo);