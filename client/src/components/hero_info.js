import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { level_up } from '../api/routes/hero';
import image_configs from '../sprites/config';
import {close, modal_enum,set} from '../redux/reducers/r_modals';
import {inc_level, set_info} from '../redux/reducers/r_hero_info';
import {useSelector,useDispatch} from 'react-redux'
import { string_to_number_formatter } from '../helper';
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

export default function (props)
{
    const dispatch = useDispatch();
    const info = useSelector(state => state.hero_info);
    const active = useSelector(state => state.modals.active);
    const handle_close = () => dispatch(close());
    const inventory = useSelector(state => state.inventory);
    const handle_level_up = async () => {
        dispatch(inc_level(1));
        try
        {
            let _info = await level_up(info?._id);
            console.log(_info);
            dispatch(set_info(_info));
        }
        catch(err)
        {
            console.log(err);
            dispatch(inc_level(-1));
        }
    }
    return <div>
        <div className={'backdrop ' + (active === modal_enum.info ? 'show' : '')} onClick={handle_close}></div>
        <div  id='hero-info' className={'slider-right ' + (active === modal_enum.info ? 'show' : '')}>
            <div onClick={handle_close} className="close-button"></div>
            <Row>
                <Col sm={12}>
                    <div className='hero-left'>
                        <h3>{info?.name} Lv. {info?.level}</h3>
                        <h4 className='power secondary-color'><span>power:</span> <span>{info?.power.toLocaleString()}</span></h4>
                        {/* <h4>{info?.level}</h4> */}
                        {/* <h4>{info?.tier}</h4> */}
                        <span className='image-container info-image'>
                            {info && <img src={image_configs[info?.name]?.src}/>}
                        </span>
                    </div>
                </Col>
                <Col>
                    <Row>
                        {
                            stat_keys.map((key,i) => <div className='c-stat'>
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
        </div>
    </div>
    return 
}